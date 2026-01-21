import requests
import json

url = "http://127.0.0.1:5000/api/analyze"
payload = {
    "ssid": "Test_Open_WiFi", 
    "encryption": "OPEN", 
    "signal_dbm": -50
}

try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:", json.dumps(response.json(), indent=2, ensure_ascii=False))
except Exception as e:
    print("Error:", e)
