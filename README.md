# 🛡️ Ethical Hacking for Village Cybercafés - Project Manual

## 📌 Project Overview
**Title**: AI-Driven Cyber Risk Detection & Marathi Awareness System
**Goal**: To prevent cyber fraud in rural India by detecting risky WiFi networks and alerting users in their local language (Marathi).

---

## 🛠️ Prerequisites (Must Install)

Before running the project, ensure you have:

1.  **Python 3.x**: [Download Here](https://www.python.org/downloads/)
2.  **Node.js & npm** (Required for the App): [Download Here](https://nodejs.org/en/download/)
    *   **IMPORTANT**: If you see `npm : The term 'npm' is not recognized`, it means you haven't installed this yet!
    *   **Action**: Download "LTS" version, install it, and **RESTART your Terminal** (or VS Code) for it to work.
3.  **Expo Go App**: Install on your Android phone from Play Store to test the mobile app.

---

## 🚀 How to Run the Project

### Step 1: Backend Setup (The Brain)
The backend runs the AI logic and Database.

1.  Open Terminal/Command Prompt.
2.  Navigate to `backend` folder:
    ```powershell
    cd "c:\Users\vaish\OneDrive\Desktop\Ethical Hacking\backend"
    ```
3.  Install Python libraries:
    ```powershell
    pip install -r requirements.txt
    ```
4.  Initialize the Database:
    ```powershell
    python init_db.py
    ```
5.  Start the Server:
    ```powershell
    python app.py
    ```
    *You should see: `Running on http://0.0.0.0:5000`*

### Step 2: Frontend Setup (The Mobile App)
The app runs on your phone/emulator.

1.  Open a **New Terminal** (Keep backend running).
2.  Navigate to `frontend` folder:
    ```powershell
    cd "c:\Users\vaish\OneDrive\Desktop\Ethical Hacking\frontend"
    ```
3.  Install Dependencies (**Do this AFTER installing Node.js**):
    ```powershell
    npm install
    ```
4.  Start the App:
    ```powershell
    npx expo start
    ```
5.  Scan the QR Code with the **Expo Go** app on your phone.

---

## 📂 Project Structure

*   **/backend**
    *   `app.py`: Main API Server.
    *   `risk_engine.py`: Logic to detect Open/WEP networks.
    *   `safety_engine.py`: Logic to calculate long-term Safety Score.
    *   `models.py`: Database tables (WiFiScan, RiskLog).
    *   `data/`: Synthetic training data.
*   **/frontend**
    *   `App.js`: Main mobile screen.
    *   `components/AlertBox.js`: Marathi alert UI.
    *   `services/api.js`: Connection to the backend.

---

## 🧪 Testing the Logic (Demo Mode)

Since you might not be at a real Cybercafé, the app uses **Simulated Data** by default or you can run the test scripts:

*   **Test Detection**: `python backend/test_api.py`
    *   *Effect*: Sends a fake "Open WiFi" signal.
    *   *Result*: Backend responds with "Risk Score: 60" and Marathi Warning.

*   **Test Safety Score**: `python backend/test_safety.py`
    *   *Effect*: Simulates a history of scans (Bad -> Good).
    *   *Result*: Shows "Trend: IMPROVING 📈".

---

## 🏆 Avishkar Presentation Tips
1.  **Show the Marathi Alerts**: Judges love localization.
2.  **Explain the "Passive" Scan**: Emphasize you are NOT hacking, just "listening" (Ethical).
3.  **Show the Safety Score**: Explain how this encourages owners to improve over time.


git add .
git commit -m "ui updated"
git push -u origin main