from database import db_session, init_db
from models import WiFiScan
from safety_engine import SafetyEngine
import time

print("🧪 Testing Cyber Safety Score Logic...")

# Initialize DB (ensure it's fresh enough or just append)
# init_db() 

engine = SafetyEngine()
test_bssid = "AA:BB:CC:DD:EE:FF"

# 1. Clear old test data
db_session.query(WiFiScan).filter_by(bssid=test_bssid).delete()
db_session.commit()

# 2. Add 3 "Bad" Scans (History)
print("Adding 3 BAD scans (OPEN)...")
for i in range(3):
    scan = WiFiScan(ssid="Village_WiFi", bssid=test_bssid, encryption="OPEN", signal_dbm=-60)
    db_session.add(scan)
db_session.commit()

# Check Score
result = engine.calculate_historical_score(test_bssid)
print(f"Score after BAD scans: {result['score']} (Should be low ~60)")

# 3. Add 2 "Good" Scans (Fixed to WPA2)
print("Adding 2 GOOD scans (WPA2)...")
for i in range(2):
    # Small sleep to ensure timestamp diff? (Not strictly needed if granularity is high, but good for order)
    scan = WiFiScan(ssid="Village_WiFi_Secure", bssid=test_bssid, encryption="WPA2", signal_dbm=-60)
    db_session.add(scan)
db_session.commit()

# Check Score
result = engine.calculate_historical_score(test_bssid)
print(f"Score after IMPROVEMENT: {result['score']} (Should be higher)")
print(f"Trend: {result['trend']}")

db_session.remove()
