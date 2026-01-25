# Test script for backend Phase 3
import requests
import json

BASE_URL = "http://localhost:5000"

def get_token():
    """Login and get token"""
    data = {"email": "test@example.com", "password": "testpass123"}
    response = requests.post(f"{BASE_URL}/api/auth/login", json=data)
    if response.status_code == 200:
        return response.json().get('token')
    return None

def test_leaderboard():
    """Test leaderboard endpoint"""
    print("Testing GET /api/community/leaderboard...")
    response = requests.get(f"{BASE_URL}/api/community/leaderboard?timeframe=all&limit=10")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_badges(token):
    """Test badges endpoint"""
    print("Testing GET /api/community/badges...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/community/badges", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_rate_network(token):
    """Test network rating"""
    print("Testing POST /api/community/rate-network...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "bssid": "AA:BB:CC:DD:EE:FF",
        "safety_rating": 4,
        "speed_rating": 5,
        "reliability_rating": 4,
        "comment": "Good network, fast and reliable!"
    }
    response = requests.post(f"{BASE_URL}/api/community/rate-network", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_get_ratings():
    """Test get network ratings"""
    print("Testing GET /api/community/network-ratings...")
    response = requests.get(f"{BASE_URL}/api/community/network-ratings?bssid=AA:BB:CC:DD:EE:FF")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_profile_after_points(token):
    """Check profile to see updated points"""
    print("Testing profile after earning points...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/user/profile", headers=headers)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Points: {data.get('points')}")
    print(f"Level: {data.get('level')}")
    print(f"Rank: {data.get('rank')}\n")

if __name__ == "__main__":
    print("=" * 50)
    print("Backend Phase 3 Test Suite - Community Features")
    print("=" * 50 + "\n")
    
    # Public endpoints
    test_leaderboard()
    test_get_ratings()
    
    # Protected endpoints
    token = get_token()
    if token:
        print("\n" + "=" * 50)
        print("Testing Protected Community Endpoints")
        print("=" * 50 + "\n")
        
        test_badges(token)
        test_rate_network(token)
        test_get_ratings()  # Check ratings again after adding one
        test_profile_after_points(token)
    else:
        print("\nSkipping protected endpoint tests (no token)")
    
    print("=" * 50)
    print("Phase 3 Tests Complete!")
    print("=" * 50)
