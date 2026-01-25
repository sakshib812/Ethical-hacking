# Test script for backend Phase 1
import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    """Test health endpoint"""
    print("Testing /health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_register():
    """Test user registration"""
    print("Testing user registration...")
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123",
        "display_name": "Test User"
    }
    response = requests.post(f"{BASE_URL}/api/auth/register", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    return response.json().get('token')

def test_login():
    """Test user login"""
    print("Testing user login...")
    data = {
        "email": "test@example.com",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/api/auth/login", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    return response.json().get('token')

def test_profile(token):
    """Test get user profile"""
    print("Testing get profile...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/user/profile", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_scan_analyze(token=None):
    """Test network scan analysis"""
    print("Testing network scan analysis...")
    data = {
        "ssid": "Test_Network",
        "bssid": "AA:BB:CC:DD:EE:FF",
        "encryption": "WPA2",
        "signal_dbm": -65,
        "snr_db": 25.5,
        "congestion_pct": 45.0,
        "latency_ms": 120
    }
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    response = requests.post(f"{BASE_URL}/api/scan/analyze", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_scan_history(token):
    """Test scan history"""
    print("Testing scan history...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/scan/history", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

if __name__ == "__main__":
    print("=" * 50)
    print("Backend Phase 1 Test Suite")
    print("=" * 50 + "\n")
    
    # Test health
    test_health()
    
    # Test registration
    token = test_register()
    
    # Test login
    if not token:
        token = test_login()
    
    # Test protected endpoints
    if token:
        test_profile(token)
        test_scan_analyze(token)
        test_scan_history(token)
    
    # Test anonymous scan
    print("Testing anonymous scan (no auth)...")
    test_scan_analyze()
    
    print("=" * 50)
    print("Tests Complete!")
    print("=" * 50)
