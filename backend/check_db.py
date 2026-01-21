from database import db_session
from models import WiFiScan, RiskLog

print("Checking Database Entries...")

count_scans = db_session.query(WiFiScan).count()
count_logs = db_session.query(RiskLog).count()

print(f"Total WiFi Scans: {count_scans}")
print(f"Total Risk Logs: {count_logs}")

if count_scans > 0:
    last_scan = db_session.query(WiFiScan).order_by(WiFiScan.id.desc()).first()
    print(f"Last Scan: Check '{last_scan.ssid}' ({last_scan.encryption})")

if count_logs > 0:
    last_log = db_session.query(RiskLog).order_by(RiskLog.id.desc()).first()
    print(f"Last Log: Risk Score {last_log.risk_score} - {last_log.status}")

db_session.remove()
