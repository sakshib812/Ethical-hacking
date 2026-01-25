# Test script for backend Phase 2
import requests
import json

BASE_URL = "http://localhost:5000"

# Use token from Phase 1 test or login
def get_token():
    """Login and get token"""
    data = {"email": "test@example.com", "password": "testpass123"}
    response = requests.post(f"{BASE_URL}/api/auth/login", json=data)
    if response.status_code == 200:
        return response.json().get('token')
    return None

def test_devices():
    """Test device management"""
    print("Testing GET /api/devices...")
    response = requests.get(f"{BASE_URL}/api/devices?scan_id=1")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_dns_leak():
    """Test DNS leak detection"""
    print("Testing POST /api/test/dns-leak...")
    response = requests.post(f"{BASE_URL}/api/test/dns-leak", json={"scan_id": 1})
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_ssl_strip():
    """Test SSL strip detection"""
    print("Testing POST /api/test/ssl-strip...")
    data = {
        "scan_id": 1,
        "test_urls": ["google.com", "facebook.com"]
    }
    response = requests.post(f"{BASE_URL}/api/test/ssl-strip", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_arp_monitor():
    """Test ARP monitoring"""
    print("Testing POST /api/test/arp-monitor...")
    data = {
        "current_gateway_mac": "AA:BB:CC:DD:EE:FF",
        "previous_gateway_mac": "AA:BB:CC:DD:EE:FF"
    }
    response = requests.post(f"{BASE_URL}/api/test/arp-monitor", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_public_ip():
    """Test public IP lookup"""
    print("Testing GET /api/analysis/public-ip...")
    response = requests.get(f"{BASE_URL}/api/analysis/public-ip")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_router_info():
    """Test router info"""
    print("Testing GET /api/analysis/router-info...")
    response = requests.get(f"{BASE_URL}/api/analysis/router-info?bssid=AA:BB:CC:DD:EE:FF&encryption=WPA2")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_settings(token):
    """Test settings endpoints"""
    headers = {"Authorization": f"Bearer {token}"}
    
    print("Testing GET /api/settings...")
    response = requests.get(f"{BASE_URL}/api/settings", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")
    
    print("Testing PUT /api/settings...")
    data = {"voice_alerts_enabled": False, "language": "mr"}
    response = requests.put(f"{BASE_URL}/api/settings", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_trusted_networks(token):
    """Test trusted networks"""
    headers = {"Authorization": f"Bearer {token}"}
    
    print("Testing POST /api/settings/trusted-networks...")
    data = {"ssid": "Home_WiFi", "bssid": "11:22:33:44:55:66"}
    response = requests.post(f"{BASE_URL}/api/settings/trusted-networks", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    print("Testing GET /api/settings/trusted-networks...")
    response = requests.get(f"{BASE_URL}/api/settings/trusted-networks", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

if __name__ == "__main__":
    print("=" * 50)
    print("Backend Phase 2 Test Suite")
    print("=" * 50 + "\n")
    
    # Public endpoints (no auth required)
    test_devices()
    test_dns_leak()
    test_ssl_strip()
    test_arp_monitor()
    test_public_ip()
    test_router_info()
    
    # Protected endpoints (auth required)
    token = get_token()
    if token:
        print("\n" + "=" * 50)
        print("Testing Protected Endpoints")
        print("=" * 50 + "\n")
        test_settings(token)
        test_trusted_networks(token)
    else:
        print("\nSkipping protected endpoint tests (no token)")
    
    print("=" * 50)
    print("Phase 2 Tests Complete!")
    print("=" * 50)
