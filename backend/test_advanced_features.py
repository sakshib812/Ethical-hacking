import json
from risk_engine import RiskEngine

def test_risk_logic():
    engine = RiskEngine()
    
    test_cases = [
        {
            "name": "Physical Layer Threat",
            "data": {
                "ssid": "Test_Net",
                "encryption": "WPA2",
                "snr_db": 10,
                "congestion_pct": 80
            }
        },
        {
            "name": "Evil Twin Threat",
            "data": {
                "ssid": "Test_Net",
                "encryption": "WPA2",
                "bssid": "00:11:22:AA:BB:CC",
                "latency_ms": 150
            }
        },
        {
            "name": "MITM Threat",
            "data": {
                "ssid": "Test_Net",
                "encryption": "WPA2",
                "gateway_mac": "FF:EE:DD:CC:BB:AA"
            }
        },
        {
            "name": "DNS Hijack Threat",
            "data": {
                "ssid": "Test_Net",
                "encryption": "WPA2",
                "target_url": "https://uidai.gov.in",
                "dns_verified": False
            }
        },
        {
            "name": "Safe Government Portal",
            "data": {
                "ssid": "Test_Net",
                "encryption": "WPA3",
                "target_url": "https://pmkisan.gov.in",
                "dns_verified": True
            }
        }
    ]

    for case in test_cases:
        print(f"\n--- Testing: {case['name']} ---")
        result = engine.analyze_wifi_network(case['data'])
        print(f"Risk Score: {result['risk_score']}")
        print(f"Status: {result['status']}")
        for alert in result['alerts']:
            print(f"Alert: {alert['msg_en']} | Marathi: {alert['msg_mr']}")

if __name__ == "__main__":
    test_risk_logic()
