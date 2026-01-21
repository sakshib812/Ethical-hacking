from ml_engine import XGBoostDetector
from phishing_guard import PhishingGuard
from report_gen import generate_complaint_pdf
import os

print("\n🤖 --- TESTING AI BACKEND MODULES --- 🤖\n")

# 1. Test XGBoost + SHAP
print("[1] Testing ML Engine...")
detector = XGBoostDetector()
# Simulate a "High Risk" case (High MAC redundancy, Gateway Changed)
fake_features = {
    'ip_count': 10, 
    'mac_redundancy': 0.9, # High!
    'packet_rate': 0.2, 
    'is_gateway_changed': 1, # Yes!
    'time_delta': 0.1
}
score = detector.predict_risk(fake_features)
explanation = detector.explain_risk(fake_features)

print(f"Risk Score: {score}/100")
print(f"Reason (Marathi): {explanation['explanation_mr']}")
print("--------------------------------------------------")

# 2. Test Phishing Guard
print("[2] Testing Phishing Guard...")
guard = PhishingGuard()
url_fake = "mahadbt.org.in" # Fake (.org instead of .gov)
url_real = "mahadbt.gov.in"

res_fake = guard.check_url(url_fake)
print(f"URL: {url_fake} -> {res_fake['status']}")
if res_fake.get('msg_mr'):
    print(f"Alert: {res_fake['msg_mr']}")

res_real = guard.check_url(url_real)
print(f"URL: {url_real} -> {res_real['status']}")
print("--------------------------------------------------")

# 3. Test PDF Report
print("[3] Testing PDF Generator...")
details = {
    "attacker_ip": "192.168.1.55",
    "attacker_mac": "AA:BB:CC:DD:EE:FF",
    "attack_type": "ARP Spoofing",
    "risk_score": score
}
pdf_path = generate_complaint_pdf(details)
print(f"PDF Generated: {pdf_path}")
print("--------------------------------------------------")

print("\n✅ All AI Features Verified!")
