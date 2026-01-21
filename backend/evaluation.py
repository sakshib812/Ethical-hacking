import pandas as pd
from risk_engine import RiskEngine
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix
import sys

def run_evaluation():
    print("🔬 Starting Technical Evaluation...")
    
    # 1. Load Ground Truth Data
    try:
        df = pd.read_csv("data/raw/synthetic_wifi.csv")
    except FileNotFoundError:
        print("Error: synthetic_wifi.csv not found. Run detailed Phase 3 first.")
        return

    engine = RiskEngine()
    
    y_true = [] # 1 for Risky, 0 for Safe
    y_pred = [] 
    
    print(f"DTO Loading {len(df)} records...")
    
    # 2. Run Inference
    for _, row in df.iterrows():
        # Ground Truth
        y_true.append(row['is_risky'])
        
        # Prediction
        scan_data = {
            "ssid": row['ssid'],
            "encryption": row['encryption'],
            "signal_dbm": row['signal_dbm']
        }
        result = engine.analyze_wifi_network(scan_data)
        
        # Convert Score to Binary Class (Risky if Status != SAFE)
        # Our Engine: < 80 score is Warning/Danger (Risky)
        is_pred_risky = 1 if result['risk_score'] < 80 else 0
        y_pred.append(is_pred_risky)

    # 3. Calculate Metrics
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred)
    rec = recall_score(y_true, y_pred)
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    
    # 4. Generate Report
    report = f"""
    =========================================
    🛡️ ETHICAL HACKING APP - EVALUATION REPORT
    =========================================
    Dataset Size: {len(df)} records
    
    CONFUSION MATRIX:
    [ TN (Safe->Safe) : {tn} ]  [ FP (Safe->Risky) : {fp} ]
    [ FN (Risky->Safe): {fn} ]  [ TP (Risky->Risky): {tp} ]
    
    METRICS:
    ✅ Accuracy : {acc:.4f} ({acc*100:.2f}%)
    🎯 Precision: {prec:.4f} (Of all flagged risky, how many were actually risky?)
    🔍 Recall   : {rec:.4f} (Of all real risks, how many did we catch?)
    
    ANALYSIS:
    - False Positives: {fp} (Cases where we scared the user unnecessarily)
    - False Negatives: {fn} (Dangerous cases we missed - critical!)
    =========================================
    """
    
    print(report)
    
    with open("evaluation_results.txt", "w", encoding="utf-8") as f:
        f.write(report)
        
if __name__ == "__main__":
    run_evaluation()
