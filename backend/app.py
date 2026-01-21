from flask import Flask, request, jsonify
from flask_cors import CORS
from risk_engine import RiskEngine

app = Flask(__name__)
CORS(app) # Enable CORS for all routes
engine = RiskEngine()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "active", "service": "Ethical Hacking Backend"}), 200

@app.route('/', methods=['GET'])
def home():
    return "<h1>🛡️ Ethical Hacking Backend is Running!</h1><p>Go to the App to scan networks.</p>", 200

@app.route('/api/analyze', methods=['POST'])
def analyze_wifi():
    """
    Input: JSON { "ssid": "...", "encryption": "...", "signal_dbm": ... }
    """
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # 1. Analyze
    result = engine.analyze_wifi_network(data)
    
    # 2. Save to DB
    from database import db_session
    from models import WiFiScan, RiskLog
    import json

    try:
        # Save Scan Raw Data
        scan = WiFiScan(
            ssid=data.get('ssid'),
            bssid=data.get('bssid', '00:00:00:00:00:00'),
            encryption=data.get('encryption'),
            signal_dbm=data.get('signal_dbm')
        )
        db_session.add(scan)
        
        # Save Risk Log
        log = RiskLog(
            ssid=result['ssid'],
            score=result['risk_score'],
            status=result['status'],
            alerts=json.dumps(result['alerts'])
        )
        db_session.add(log)
        
        db_session.commit()
    except Exception as e:
        print(f"DB Error: {e}")
        db_session.rollback()
        
    return jsonify(result), 200

@app.teardown_appcontext
def shutdown_session(exception=None):
    from database import db_session
    db_session.remove()

from safety_engine import SafetyEngine
safety_engine = SafetyEngine()

@app.route('/api/score', methods=['GET'])
def get_safety_score():
    """
    Input: Query Param ?bssid=...
    """
    bssid = request.args.get('bssid')
    if not bssid:
        return jsonify({"error": "BSSID required"}), 400
        
    result = safety_engine.calculate_historical_score(bssid)
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
