import axios from 'axios';

// NOTE: Use your PC's local IP address if testing on a real device (e.g., http://192.168.1.5:5000)
// Use http://10.0.2.2:5000 if using Android Emulator
const API_URL = 'http://127.0.0.1:5000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

export const checkHealth = async () => {
    try {
        const response = await api.get('/health'); // Corrected endpoint from / to /health if needed, but app.py has /health
        return response.data;
    } catch (error) {
        console.error("Health Check Error:", error);
        return null;
    }
};

export const analyzeNetwork = async (wifiData) => {
    try {
        const response = await api.post('/analyze', wifiData);
        return response.data;
    } catch (error) {
        console.error("Analysis Error:", error);
        throw error;
    }
};

export default api;
