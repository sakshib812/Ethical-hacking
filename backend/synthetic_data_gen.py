import pandas as pd
import random
import os
from faker import Faker
import json

fake = Faker('en_IN')

# Configuration
OUTPUT_DIR = "data/raw"
WIFI_OUTPUT_FILE = os.path.join(OUTPUT_DIR, "synthetic_wifi.csv")
PHISHING_OUTPUT_DIR = os.path.join(OUTPUT_DIR, "synthetic_phishing")

os.makedirs(PHISHING_OUTPUT_DIR, exist_ok=True)

def generate_wifi_data(num_samples=1000):
    """Generates synthetic WiFi network scan data with risk labels."""
    data = []
    
    wifi_names_prefixes = ["Sai", "Om", "Ganpati", "Shiv", "JioFiber", "Airtel", "TP-Link", "D-Link", "CyberCafe", "Netpluz"]
    wifi_names_suffixes = ["_Home", "_Shop", "_5G", "_Free", "_Guest", "", "123"]

    for _ in range(num_samples):
        ssid = random.choice(wifi_names_prefixes) + random.choice(wifi_names_suffixes)
        if random.random() < 0.1:
            ssid = "Free_Public_WiFi" # Risky honeypot name
            
        signal_strength = random.randint(-90, -30)
        
        # Risk factors
        encryption = random.choice(['WPA2', 'WPA', 'WEP', 'OPEN'])
        auth_type = 'PSK'
        if encryption == 'OPEN':
            auth_type = 'NONE'
        
        is_risky = 0
        risk_reason = "Safe"
        
        if encryption == 'OPEN':
            is_risky = 1
            risk_reason = "Open Network"
        elif encryption == 'WEP':
            is_risky = 1
            risk_reason = "Weak Encryption (WEP)"
        elif "Free" in ssid and encryption == 'OPEN':
            is_risky = 1
            risk_reason = "Suspicious Public WiFi"
            
        data.append({
            "ssid": ssid,
            "bssid": fake.mac_address(),
            "signal_dbm": signal_strength,
            "encryption": encryption,
            "authentication": auth_type,
            "channel": random.randint(1, 11),
            "is_risky": is_risky,
            "risk_reason": risk_reason
        })
        
    df = pd.DataFrame(data)
    df.to_csv(WIFI_OUTPUT_FILE, index=False)
    print(f"Generated {num_samples} WiFi records to {WIFI_OUTPUT_FILE}")
    return df

def generate_phishing_html(num_pages=50):
    """Generates fake HTML pages, some benign, some phishing."""
    print(f"Generating {num_pages} HTML samples...")
    
    for i in range(num_pages):
        is_phishing = random.choice([True, False])
        filename = f"page_{i}_{'phish' if is_phishing else 'safe'}.html"
        filepath = os.path.join(PHISHING_OUTPUT_DIR, filename)
        
        action_url = "https://safe-bank.com/login"
        if is_phishing:
            action_url = "http://hacker-site.xyz/steal_creds"
            
        html_content = f"""
        <html>
        <head><title>{'Bank Login' if is_phishing else 'Welcome'}</title></head>
        <body>
            <h1>{'Update your KYC' if is_phishing else 'Welcome to Digital India'}</h1>
            <form action="{action_url}" method="POST">
                <label>Username:</label> <input type="text" name="user">
                <label>Password:</label> <input type="password" name="pass">
                <button type="submit">Login</button>
            </form>
        </body>
        </html>
        """
        
        with open(filepath, "w") as f:
            f.write(html_content)
    
    print(f"Generated HTML samples in {PHISHING_OUTPUT_DIR}")

if __name__ == "__main__":
    print("🚀 Starting Synthetic Data Generation...")
    generate_wifi_data(500)
    generate_phishing_html(20)
    print("✅ Data Generation Complete.")
