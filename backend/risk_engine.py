class RiskEngine:
    def __init__(self):
        pass

    def analyze_wifi_network(self, wifi_data):
        """
        Analyzes a single WiFi network dictionary.
        Input: {'ssid': '...', 'encryption': '...', 'signal_dbm': -50}
        Output: {'risk_score': 0-100, 'is_safe': bool, 'alerts': []}
        """
        score = 100 # Start with perfect score
        alerts = []
        
        ssid = wifi_data.get('ssid', 'Unknown')
        encryption = wifi_data.get('encryption', 'WPA2')
        
        # Rule 1: Open Networks (Critical)
        if encryption == 'OPEN' or encryption == 'NONE':
            score -= 40
            alerts.append({
                "level": "CRITICAL",
                "msg_en": "Open WiFi Network - Your data can be stolen.",
                "msg_mr": "ही WiFi उघडी आहे – तुमची माहिती चोरी होऊ शकते."
            })
            
        # Rule 2: WEP Encryption (High)
        elif encryption == 'WEP':
            score -= 25
            alerts.append({
                "level": "HIGH",
                "msg_en": "Old Security (WEP) - Easy to hack.",
                "msg_mr": "जुन्या पद्धतीचे सुरक्षा लॉक (WEP) – हॅक करणे सोपे आहे."
            })
            
        # Rule 3: Suspicious Names (Medium)
        if "Free" in ssid or "Guest" in ssid:
            score -= 10
            alerts.append({
                "level": "MEDIUM",
                "msg_en": "Public/Guest Network - Use with caution.",
                "msg_mr": "सार्वजनिक नेटवर्क – सावधगिरीने वापरा."
            })

        # Determine overall safety
        # Score > 80 is SAFE
        # Score 50-80 is WARN
        # Score < 50 is DANGER
        
        status = "SAFE"
        if score < 50:
            status = "DANGER"
        elif score < 80:
            status = "WARNING"
            
        return {
            "ssid": ssid,
            "risk_score": max(0, score),
            "status": status,
            "alerts": alerts
        }
