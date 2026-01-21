import xgboost as xgb
import shap
import numpy as np
import pandas as pd
import json

class XGBoostDetector:
    def __init__(self):
        self.model = None
        self.explainer = None
        self.feature_names = ['ip_count', 'mac_redundancy', 'packet_rate', 'is_gateway_changed', 'time_delta']
        
        # Marathi Explanations for features
        self.marathi_reasons = {
            'ip_count': "Network var khup jaast devices ahet (Suspicious Activity).",
            'mac_redundancy': "Router chi olakh nakli asu shakate (Duplicate MAC Detected).",
            'packet_rate': "Data chori karnyacha prayatna chalu ahe (High Packet Rate).",
            'is_gateway_changed': "Tumcha traffic divert kele jaat ahe (Gateway Changed).",
            'time_delta': "Connection madhe unnatural lag ahe (MITM Latency)."
        }
        
        print("🧠 Training AI Model (XGBoost)...")
        self._train_dummy_model()
        
    def _train_dummy_model(self):
        """Train a model on synthetic data so it works immediately."""
        # Generate 1000 synthetic samples
        np.random.seed(42)
        X = np.random.rand(1000, 5)
        # Logic: If mac_redundancy (col 1) > 0.8 OR gateway_changed (col 3) == 1, then Risk (1)
        y = (X[:, 1] > 0.8) | (X[:, 3] > 0.5)
        y = y.astype(int)
        
        self.model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
        self.model.fit(X, y)
        
        # Initialize SHAP explainer
        self.explainer = shap.TreeExplainer(self.model)
        print("✅ AI Model Trained Successfully.")

    def predict_risk(self, features_dict):
        """
        Input: {'ip_count': 5, 'mac_redundancy': 0, ...}
        Output: Risk Score (0-100)
        """
        data = [features_dict.get(f, 0) for f in self.feature_names]
        prob = self.model.predict_proba([data])[0][1] # Probability of Class 1 (Attack)
        return int(prob * 100)

    def explain_risk(self, features_dict):
        """
        Returns the top contributing feature and its Marathi explanation.
        """
        data = [features_dict.get(f, 0) for f in self.feature_names]
        shap_values = self.explainer.shap_values(np.array([data]))
        
        # Get index of feature with highest impact
        # shap_values is a list of arrays ? checking structure
        # typically [samples, features]
        # For classifier, it might be output [class 0, class 1]
        
        if isinstance(shap_values, list):
             vals = shap_values[1][0] # Class 1 (Attack)
        else:
             vals = shap_values[0]

        top_feature_idx = np.argmax(np.abs(vals))
        top_feature_name = self.feature_names[top_feature_idx]
        
        return {
            "top_factor": top_feature_name,
            "explanation_mr": self.marathi_reasons.get(top_feature_name, "Unknown Risk"),
            "shap_value": float(vals[top_feature_idx])
        }
