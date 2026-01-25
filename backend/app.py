from flask import Flask, request, jsonify
from flask_cors import CORS
from risk_engine import RiskEngine
from auth import hash_password, verify_password, generate_token, token_required, optional_token
from database import db_session, init_db
from models import User, WiFiScan, RiskLog, UserSettings, UserBadge, NetworkDevice, SecurityTest, TrustedNetwork, NetworkRating
from security_tests import SecurityTests
from gamification import GamificationEngine
import json
import os
import random
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
engine = RiskEngine()

# Initialize database
init_db()

# ============================================
# Health & Info Routes
# ============================================

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "active", "service": "Digital Guard Backend API"}), 200

@app.route('/', methods=['GET'])
def home():
    return """
    <h1>🛡️ Digital Guard Backend API</h1>
    <p>Backend service for Digital Guard - Cybersecurity App for Rural India</p>
    <h2>Available Endpoints:</h2>
    <ul>
        <li>POST /api/auth/register - Register new user</li>
        <li>POST /api/auth/login - User login</li>
        <li>GET /api/user/profile - Get user profile (requires auth)</li>
        <li>POST /api/scan/analyze - Analyze WiFi network</li>
        <li>GET /api/scan/history - Get scan history (requires auth)</li>
    </ul>
    """, 200

# ============================================
# Authentication Routes
# ============================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.json
    
    # Validate required fields
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Username, email, and password are required'}), 400
    
    username = data['username']
    email = data['email']
    password = data['password']
    display_name = data.get('display_name', username)
    
    # Check if user already exists
    existing_user = db_session.query(User).filter(
        (User.username == username) | (User.email == email)
    ).first()
    
    if existing_user:
        return jsonify({'error': 'Username or email already exists'}), 409
    
    try:
        # Create new user
        password_hash = hash_password(password)
        user = User(
            username=username,
            email=email,
            password_hash=password_hash,
            display_name=display_name
        )
        db_session.add(user)
        db_session.flush()  # Get user ID
        
        # Create default settings
        settings = UserSettings(user_id=user.id)
        db_session.add(settings)
        
        # Initialize badges
        badge_definitions = [
            {'badge_id': 'guardian', 'total_required': 50},
            {'badge_id': 'scout', 'total_required': 20},
            {'badge_id': 'expert', 'total_required': 10},
            {'badge_id': 'helper', 'total_required': 5},
            {'badge_id': 'champion', 'total_required': 10},
            {'badge_id': 'educator', 'total_required': 25},
        ]
        
        for badge_def in badge_definitions:
            badge = UserBadge(
                user_id=user.id,
                badge_id=badge_def['badge_id'],
                total_required=badge_def['total_required'],
                progress=0,
                is_earned=False
            )
            db_session.add(badge)
        
        db_session.commit()
        
        # Generate token
        token = generate_token(user.id, user.username)
        
        return jsonify({
            'message': 'Registration successful',
            'user_id': user.id,
            'username': user.username,
            'token': token
        }), 201
        
    except Exception as e:
        db_session.rollback()
        print(f"Registration error: {e}")
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login"""
    data = request.json
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    email = data['email']
    password = data['password']
    
    # Find user
    user = db_session.query(User).filter(User.email == email).first()
    
    if not user or not verify_password(password, user.password_hash):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Update last login
    import datetime
    user.last_login = datetime.datetime.utcnow()
    db_session.commit()
    
    # Generate token
    token = generate_token(user.id, user.username)
    
    return jsonify({
        'message': 'Login successful',
        'user_id': user.id,
        'username': user.username,
        'token': token,
        'user': {
            'username': user.username,
            'display_name': user.display_name,
            'points': user.points,
            'level': user.level,
            'rank': user.rank
        }
    }), 200

# ============================================
# User Profile Routes
# ============================================

@app.route('/api/user/profile', methods=['GET'])
@token_required
def get_profile():
    """Get user profile"""
    user_id = request.current_user['user_id']
    
    user = db_session.query(User).filter(User.id == user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Count scans and threats
    scans_count = db_session.query(WiFiScan).filter(WiFiScan.user_id == user_id).count()
    threats_count = db_session.query(RiskLog).join(WiFiScan).filter(
        WiFiScan.user_id == user_id,
        RiskLog.status.in_(['WARNING', 'DANGER'])
    ).count()
    badges_earned = db_session.query(UserBadge).filter(
        UserBadge.user_id == user_id,
        UserBadge.is_earned == True
    ).count()
    
    return jsonify({
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'display_name': user.display_name,
        'points': user.points,
        'level': user.level,
        'rank': user.rank,
        'location': user.location,
        'scans_count': scans_count,
        'threats_found': threats_count,
        'badges_earned': badges_earned,
        'created_at': user.created_at.isoformat() if user.created_at else None
    }), 200

@app.route('/api/user/profile', methods=['PUT'])
@token_required
def update_profile():
    """Update user profile"""
    user_id = request.current_user['user_id']
    data = request.json
    
    user = db_session.query(User).filter(User.id == user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update allowed fields
    if 'display_name' in data:
        user.display_name = data['display_name']
    if 'location' in data:
        user.location = data['location']
    
    db_session.commit()
    
    return jsonify({'message': 'Profile updated successfully'}), 200

# ============================================
# Network Scanning Routes
# ============================================

@app.route('/api/scan/analyze', methods=['POST'])
@optional_token
def analyze_wifi():
    """Analyze WiFi network (works with or without authentication)"""
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Get user_id if authenticated
    user_id = request.current_user['user_id'] if request.current_user else None
    
    # Analyze network
    result = engine.analyze_wifi_network(data)
    
    try:
        # Save scan data
        scan = WiFiScan(
            ssid=data.get('ssid'),
            bssid=data.get('bssid', '00:00:00:00:00:00'),
            encryption=data.get('encryption'),
            signal_dbm=data.get('signal_dbm'),
            user_id=user_id
        )
        
        # Add optional fields
        if 'snr_db' in data:
            scan.snr_db = data['snr_db']
        if 'congestion_pct' in data:
            scan.congestion_pct = data['congestion_pct']
        if 'latency_ms' in data:
            scan.latency_ms = data['latency_ms']
        if 'gateway_mac' in data:
            scan.gateway_mac = data['gateway_mac']
        if 'latitude' in data:
            scan.latitude = data['latitude']
        if 'longitude' in data:
            scan.longitude = data['longitude']
        
        db_session.add(scan)
        db_session.flush()  # Get scan ID
        
        # Save risk log
        risk_log = RiskLog(
            scan_id=scan.id,
            risk_score=result['risk_score'],
            status=result['status'],
            alerts_json=json.dumps(result['alerts']),
            ssid=result['ssid']
        )
        db_session.add(risk_log)
        
        # Award points if user is authenticated
        points_earned = 0
        if user_id:
            user = db_session.query(User).filter(User.id == user_id).first()
            if user:
                points_earned = 10  # Base points for scanning
                if result['status'] == 'DANGER':
                    points_earned += 20  # Bonus for finding threats
                user.points += points_earned
        
        db_session.commit()
        
        # Add scan_id and points to result
        result['scan_id'] = scan.id
        result['points_earned'] = points_earned
        
    except Exception as e:
        print(f"DB Error: {e}")
        db_session.rollback()
    
    return jsonify(result), 200

@app.route('/api/scan/history', methods=['GET'])
@token_required
def get_scan_history():
    """Get user's scan history"""
    user_id = request.current_user['user_id']
    limit = request.args.get('limit', 50, type=int)
    offset = request.args.get('offset', 0, type=int)
    
    scans = db_session.query(WiFiScan, RiskLog).join(RiskLog).filter(
        WiFiScan.user_id == user_id
    ).order_by(WiFiScan.timestamp.desc()).limit(limit).offset(offset).all()
    
    total = db_session.query(WiFiScan).filter(WiFiScan.user_id == user_id).count()
    
    result = {
        'scans': [
            {
                'scan_id': scan.id,
                'timestamp': scan.timestamp.isoformat(),
                'ssid': scan.ssid,
                'bssid': scan.bssid,
                'encryption': scan.encryption,
                'risk_score': risk.risk_score,
                'status': risk.status
            }
            for scan, risk in scans
        ],
        'total': total
    }
    
    return jsonify(result), 200

# ============================================
# Cleanup
# ============================================

# ============================================
# Device Management Routes
# ============================================

@app.route('/api/devices', methods=['GET'])
@optional_token
def get_devices():
    """Get devices for a scan"""
    scan_id = request.args.get('scan_id', type=int)
    
    if not scan_id:
        return jsonify({'error': 'scan_id required'}), 400
    
    # Generate mock devices for demo
    device_types = ['phone', 'laptop', 'desktop', 'tablet', 'router', 'camera', 'tv', 'unknown']
    manufacturers = ['Samsung', 'Apple', 'HP', 'Dell', 'TP-Link', 'Xiaomi', 'Unknown']
    
    devices = []
    for i in range(random.randint(3, 8)):
        device = {
            'device_id': i + 1,
            'mac_address': ':'.join([f'{random.randint(0, 255):02X}' for _ in range(6)]),
            'ip_address': f'192.168.1.{random.randint(100, 200)}',
            'hostname': f'Device-{i+1}',
            'device_type': random.choice(device_types),
            'manufacturer': random.choice(manufacturers),
            'is_online': random.random() > 0.2,
            'is_intruder': random.random() > 0.9,
            'custom_name': None
        }
        devices.append(device)
    
    return jsonify({
        'devices': devices,
        'total': len(devices),
        'online_count': sum(1 for d in devices if d['is_online']),
        'intruder_count': sum(1 for d in devices if d['is_intruder'])
    }), 200

# ============================================
# Security Test Routes
# ============================================

@app.route('/api/test/dns-leak', methods=['POST'])
@optional_token
def test_dns_leak():
    """Run DNS leak test"""
    data = request.json
    scan_id = data.get('scan_id') if data else None
    
    result = SecurityTests.dns_leak_test(data or {})
    
    # Save test result if scan_id provided
    if scan_id:
        try:
            test = SecurityTest(
                scan_id=scan_id,
                test_type=result['test_type'],
                passed=result['passed'],
                severity=result['severity'],
                details_json=json.dumps(result),
                execution_time_ms=result['execution_time_ms']
            )
            db_session.add(test)
            db_session.commit()
            result['test_id'] = test.id
        except Exception as e:
            print(f"Error saving test: {e}")
            db_session.rollback()
    
    return jsonify(result), 200

@app.route('/api/test/ssl-strip', methods=['POST'])
@optional_token
def test_ssl_strip():
    """Run SSL strip test"""
    data = request.json
    scan_id = data.get('scan_id') if data else None
    test_urls = data.get('test_urls') if data else None
    
    result = SecurityTests.ssl_strip_test(data or {}, test_urls)
    
    # Save test result if scan_id provided
    if scan_id:
        try:
            test = SecurityTest(
                scan_id=scan_id,
                test_type=result['test_type'],
                passed=result['passed'],
                severity=result['severity'],
                details_json=json.dumps(result),
                execution_time_ms=result['execution_time_ms']
            )
            db_session.add(test)
            db_session.commit()
            result['test_id'] = test.id
        except Exception as e:
            print(f"Error saving test: {e}")
            db_session.rollback()
    
    return jsonify(result), 200

@app.route('/api/test/arp-monitor', methods=['POST'])
@optional_token
def test_arp_monitor():
    """Run ARP monitoring test"""
    data = request.json
    
    if not data or not data.get('current_gateway_mac'):
        return jsonify({'error': 'current_gateway_mac required'}), 400
    
    result = SecurityTests.arp_monitor_test(
        data['current_gateway_mac'],
        data.get('previous_gateway_mac')
    )
    
    return jsonify(result), 200

# ============================================
# Network Analysis Routes
# ============================================

@app.route('/api/analysis/public-ip', methods=['GET'])
def get_public_ip():
    """Get public IP information"""
    result = SecurityTests.get_public_ip_info()
    return jsonify(result), 200

@app.route('/api/analysis/router-info', methods=['GET'])
def get_router_info():
    """Get router information"""
    bssid = request.args.get('bssid')
    encryption = request.args.get('encryption', 'UNKNOWN')
    
    if not bssid:
        return jsonify({'error': 'bssid required'}), 400
    
    result = SecurityTests.get_router_info(bssid, encryption)
    return jsonify(result), 200

# ============================================
# Settings Routes
# ============================================

@app.route('/api/settings', methods=['GET'])
@token_required
def get_settings():
    """Get user settings"""
    user_id = request.current_user['user_id']
    
    settings = db_session.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    
    if not settings:
        # Create default settings if not exist
        settings = UserSettings(user_id=user_id)
        db_session.add(settings)
        db_session.commit()
    
    return jsonify({
        'voice_alerts_enabled': settings.voice_alerts_enabled,
        'push_notifications_enabled': settings.push_notifications_enabled,
        'language': settings.language,
        'dark_mode': settings.dark_mode,
        'auto_scan_enabled': settings.auto_scan_enabled,
        'scan_interval_minutes': settings.scan_interval_minutes
    }), 200

@app.route('/api/settings', methods=['PUT'])
@token_required
def update_settings():
    """Update user settings"""
    user_id = request.current_user['user_id']
    data = request.json
    
    settings = db_session.query(UserSettings).filter(UserSettings.user_id == user_id).first()
    
    if not settings:
        settings = UserSettings(user_id=user_id)
        db_session.add(settings)
    
    # Update fields
    if 'voice_alerts_enabled' in data:
        settings.voice_alerts_enabled = data['voice_alerts_enabled']
    if 'push_notifications_enabled' in data:
        settings.push_notifications_enabled = data['push_notifications_enabled']
    if 'language' in data:
        settings.language = data['language']
    if 'dark_mode' in data:
        settings.dark_mode = data['dark_mode']
    if 'auto_scan_enabled' in data:
        settings.auto_scan_enabled = data['auto_scan_enabled']
    
    db_session.commit()
    
    return jsonify({'message': 'Settings updated successfully'}), 200

@app.route('/api/settings/trusted-networks', methods=['GET'])
@token_required
def get_trusted_networks():
    """Get user's trusted networks"""
    user_id = request.current_user['user_id']
    
    networks = db_session.query(TrustedNetwork).filter(
        TrustedNetwork.user_id == user_id
    ).order_by(TrustedNetwork.added_at.desc()).all()
    
    return jsonify({
        'networks': [
            {
                'id': net.id,
                'ssid': net.ssid,
                'bssid': net.bssid,
                'added_at': net.added_at.isoformat()
            }
            for net in networks
        ]
    }), 200

@app.route('/api/settings/trusted-networks', methods=['POST'])
@token_required
def add_trusted_network():
    """Add a trusted network"""
    user_id = request.current_user['user_id']
    data = request.json
    
    if not data or not data.get('ssid'):
        return jsonify({'error': 'ssid required'}), 400
    
    network = TrustedNetwork(
        user_id=user_id,
        ssid=data['ssid'],
        bssid=data.get('bssid')
    )
    
    db_session.add(network)
    db_session.commit()
    
    return jsonify({
        'message': 'Network added to trusted list',
        'network_id': network.id
    }), 201

@app.route('/api/settings/trusted-networks/<int:network_id>', methods=['DELETE'])
@token_required
def delete_trusted_network(network_id):
    """Remove a trusted network"""
    user_id = request.current_user['user_id']
    
    network = db_session.query(TrustedNetwork).filter(
        TrustedNetwork.id == network_id,
        TrustedNetwork.user_id == user_id
    ).first()
    
    if not network:
        return jsonify({'error': 'Network not found'}), 404
    
    db_session.delete(network)
    db_session.commit()
    
    return jsonify({'message': 'Network removed from trusted list'}), 200

# ============================================
# Community Features Routes
# ============================================

@app.route('/api/community/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get leaderboard with top users"""
    timeframe = request.args.get('timeframe', 'all')  # week, month, all
    limit = request.args.get('limit', 50, type=int)
    
    # For simplicity, showing all-time leaderboard
    # In production, would filter by timeframe
    
    users = db_session.query(User).order_by(
        User.points.desc()
    ).limit(limit).all()
    
    # Get badge info for each user
    leaders = []
    for rank, user in enumerate(users, 1):
        # Get user's top badge
        earned_badges = db_session.query(UserBadge).filter(
            UserBadge.user_id == user.id,
            UserBadge.is_earned == True
        ).all()
        
        top_badge = 'guardian' if earned_badges else None
        
        # Count scans
        scans_count = db_session.query(WiFiScan).filter(
            WiFiScan.user_id == user.id
        ).count()
        
        leaders.append({
            'user_id': user.id,
            'username': user.username,
            'display_name': user.display_name or user.username,
            'points': user.points,
            'scans_count': scans_count,
            'rank': rank,
            'badge': top_badge,
            'level': user.level
        })
    
    # Get current user's rank if authenticated
    user_rank = None
    user_points = None
    if hasattr(request, 'current_user') and request.current_user:
        user_id = request.current_user['user_id']
        user = db_session.query(User).filter(User.id == user_id).first()
        if user:
            user_rank = user.rank
            user_points = user.points
    
    return jsonify({
        'leaders': leaders,
        'user_rank': user_rank,
        'user_points': user_points
    }), 200

@app.route('/api/community/badges', methods=['GET'])
@token_required
def get_user_badges():
    """Get user's badges with progress"""
    user_id = request.current_user['user_id']
    
    # Get user badges
    user_badges = db_session.query(UserBadge).filter(
        UserBadge.user_id == user_id
    ).all()
    
    badge_dict = {b.badge_id: b for b in user_badges}
    
    # Build response with badge definitions
    badges = []
    for badge_id, badge_def in GamificationEngine.BADGES.items():
        user_badge = badge_dict.get(badge_id)
        
        badges.append({
            'badge_id': badge_id,
            'name': badge_def['name'],
            'name_marathi': badge_def['name_marathi'],
            'description': badge_def['description'],
            'earned': user_badge.is_earned if user_badge else False,
            'progress': user_badge.progress if user_badge else 0,
            'total_required': badge_def['requirement']
        })
    
    earned_count = sum(1 for b in badges if b['earned'])
    
    return jsonify({
        'badges': badges,
        'earned_count': earned_count,
        'total_count': len(badges)
    }), 200

@app.route('/api/community/rate-network', methods=['POST'])
@token_required
def rate_network():
    """Rate a network"""
    user_id = request.current_user['user_id']
    data = request.json
    
    if not data or not data.get('bssid'):
        return jsonify({'error': 'bssid required'}), 400
    
    # Create rating
    rating = NetworkRating(
        user_id=user_id,
        bssid=data['bssid'],
        safety_rating=data.get('safety_rating'),
        speed_rating=data.get('speed_rating'),
        reliability_rating=data.get('reliability_rating'),
        comment=data.get('comment')
    )
    
    db_session.add(rating)
    db_session.commit()
    
    # Award points for rating
    points_result = GamificationEngine.award_points(user_id, 5, 'network_rating')
    
    return jsonify({
        'message': 'Rating submitted successfully',
        'rating_id': rating.id,
        'points_earned': 5,
        'total_points': points_result['total_points']
    }), 201

@app.route('/api/community/network-ratings', methods=['GET'])
def get_network_ratings():
    """Get ratings for a network"""
    bssid = request.args.get('bssid')
    
    if not bssid:
        return jsonify({'error': 'bssid required'}), 400
    
    ratings = db_session.query(NetworkRating, User).join(User).filter(
        NetworkRating.bssid == bssid
    ).order_by(NetworkRating.timestamp.desc()).limit(10).all()
    
    # Calculate averages
    all_ratings = db_session.query(NetworkRating).filter(
        NetworkRating.bssid == bssid
    ).all()
    
    if all_ratings:
        avg_safety = sum(r.safety_rating for r in all_ratings if r.safety_rating) / len([r for r in all_ratings if r.safety_rating]) if any(r.safety_rating for r in all_ratings) else 0
        avg_speed = sum(r.speed_rating for r in all_ratings if r.speed_rating) / len([r for r in all_ratings if r.speed_rating]) if any(r.speed_rating for r in all_ratings) else 0
        avg_reliability = sum(r.reliability_rating for r in all_ratings if r.reliability_rating) / len([r for r in all_ratings if r.reliability_rating]) if any(r.reliability_rating for r in all_ratings) else 0
    else:
        avg_safety = avg_speed = avg_reliability = 0
    
    recent_comments = [
        {
            'username': user.username,
            'safety_rating': rating.safety_rating,
            'speed_rating': rating.speed_rating,
            'reliability_rating': rating.reliability_rating,
            'comment': rating.comment,
            'timestamp': rating.timestamp.isoformat()
        }
        for rating, user in ratings if rating.comment
    ]
    
    return jsonify({
        'bssid': bssid,
        'average_safety': round(avg_safety, 1),
        'average_speed': round(avg_speed, 1),
        'average_reliability': round(avg_reliability, 1),
        'total_ratings': len(all_ratings),
        'recent_comments': recent_comments
    }), 200

# ============================================
# Cleanup
# ============================================

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
