# Gamification logic for Digital Guard
from models import User, UserBadge, WiFiScan, RiskLog
from database import db_session
from sqlalchemy import func, desc

class GamificationEngine:
    """Handles points, levels, badges, and rankings"""
    
    # Badge definitions
    BADGES = {
        'guardian': {
            'name': 'Cyber Guardian',
            'name_marathi': 'सायबर रक्षक',
            'description': 'Scan 50 networks',
            'requirement': 50,
            'type': 'scans'
        },
        'scout': {
            'name': 'Network Scout',
            'name_marathi': 'नेटवर्क स्काउट',
            'description': 'Discover 20 new networks',
            'requirement': 20,
            'type': 'unique_networks'
        },
        'expert': {
            'name': 'Security Expert',
            'name_marathi': 'सुरक्षा तज्ञ',
            'description': 'Find 10 security threats',
            'requirement': 10,
            'type': 'threats'
        },
        'helper': {
            'name': 'Community Helper',
            'name_marathi': 'समुदाय मदतनीस',
            'description': 'Share 5 safety reports',
            'requirement': 5,
            'type': 'shares'
        },
        'champion': {
            'name': 'Safety Champion',
            'name_marathi': 'सुरक्षा विजेता',
            'description': 'Reach top 10 on leaderboard',
            'requirement': 10,
            'type': 'rank'
        },
        'educator': {
            'name': 'Cyber Educator',
            'name_marathi': 'सायबर शिक्षक',
            'description': 'Help 25 people stay safe',
            'requirement': 25,
            'type': 'helps'
        }
    }
    
    @staticmethod
    def calculate_level(points):
        """Calculate user level based on points"""
        # Level progression: 0-100 = L1, 101-300 = L2, 301-600 = L3, etc.
        if points < 100:
            return 1
        elif points < 300:
            return 2
        elif points < 600:
            return 3
        elif points < 1000:
            return 4
        elif points < 1500:
            return 5
        elif points < 2100:
            return 6
        elif points < 2800:
            return 7
        elif points < 3600:
            return 8
        elif points < 4500:
            return 9
        else:
            return 10
    
    @staticmethod
    def update_user_rank(user_id):
        """Update user's rank based on points"""
        # Get all users ordered by points
        users = db_session.query(User).order_by(desc(User.points)).all()
        
        for rank, user in enumerate(users, 1):
            user.rank = rank
        
        db_session.commit()
        
        # Return the specific user's rank
        user = db_session.query(User).filter(User.id == user_id).first()
        return user.rank if user else None
    
    @staticmethod
    def check_and_award_badges(user_id):
        """Check if user has earned any new badges"""
        user = db_session.query(User).filter(User.id == user_id).first()
        if not user:
            return []
        
        newly_earned = []
        
        # Get user's badge progress
        user_badges = db_session.query(UserBadge).filter(
            UserBadge.user_id == user_id
        ).all()
        
        badge_dict = {b.badge_id: b for b in user_badges}
        
        # Calculate progress for each badge type
        stats = GamificationEngine.get_user_stats(user_id)
        
        for badge_id, badge_def in GamificationEngine.BADGES.items():
            user_badge = badge_dict.get(badge_id)
            
            if not user_badge:
                continue
            
            # Get current progress based on badge type
            if badge_def['type'] == 'scans':
                progress = stats['scans_count']
            elif badge_def['type'] == 'unique_networks':
                progress = stats['unique_networks']
            elif badge_def['type'] == 'threats':
                progress = stats['threats_found']
            elif badge_def['type'] == 'shares':
                progress = stats['shares_count']
            elif badge_def['type'] == 'rank':
                progress = 11 - user.rank if user.rank and user.rank <= 10 else 0
            elif badge_def['type'] == 'helps':
                progress = stats['helps_count']
            else:
                progress = 0
            
            # Update progress
            user_badge.progress = progress
            
            # Check if earned
            if progress >= badge_def['requirement'] and not user_badge.is_earned:
                user_badge.is_earned = True
                newly_earned.append(badge_id)
        
        db_session.commit()
        
        return newly_earned
    
    @staticmethod
    def get_user_stats(user_id):
        """Get user statistics for badge calculation"""
        # Count total scans
        scans_count = db_session.query(WiFiScan).filter(
            WiFiScan.user_id == user_id
        ).count()
        
        # Count unique networks (distinct BSSIDs)
        unique_networks = db_session.query(
            func.count(func.distinct(WiFiScan.bssid))
        ).filter(WiFiScan.user_id == user_id).scalar() or 0
        
        # Count threats found
        threats_found = db_session.query(RiskLog).join(WiFiScan).filter(
            WiFiScan.user_id == user_id,
            RiskLog.status.in_(['WARNING', 'DANGER'])
        ).count()
        
        # Placeholder for shares and helps (would come from other tables)
        shares_count = 0
        helps_count = 0
        
        return {
            'scans_count': scans_count,
            'unique_networks': unique_networks,
            'threats_found': threats_found,
            'shares_count': shares_count,
            'helps_count': helps_count
        }
    
    @staticmethod
    def award_points(user_id, points, reason=''):
        """Award points to a user and update level/rank"""
        user = db_session.query(User).filter(User.id == user_id).first()
        if not user:
            return False
        
        # Add points
        user.points += points
        
        # Update level
        user.level = GamificationEngine.calculate_level(user.points)
        
        db_session.commit()
        
        # Update rank
        GamificationEngine.update_user_rank(user_id)
        
        # Check for new badges
        newly_earned = GamificationEngine.check_and_award_badges(user_id)
        
        return {
            'points_awarded': points,
            'total_points': user.points,
            'level': user.level,
            'rank': user.rank,
            'newly_earned_badges': newly_earned
        }
