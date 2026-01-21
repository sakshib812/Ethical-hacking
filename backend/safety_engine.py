from database import db_session
from models import WiFiScan
from sqlalchemy import desc

class SafetyEngine:
    def calculate_historical_score(self, bssid):
        """
        Calculates a long-term safety score based on scan history.
        Input: BSSID (MAC address of router)
        Output: {'score': 0-100, 'trend': 'STABLE'|'IMPROVING'|'DEGRADING'}
        """
        # Get last 10 scans for this router
        scans = db_session.query(WiFiScan).filter_by(bssid=bssid).order_by(desc(WiFiScan.timestamp)).limit(10).all()
        
        if not scans:
            return {"score": 0, "trend": "UNKNOWN", "history_count": 0}
        
        # Calculate score for each past scan (re-using simplistic logic for now)
        # Ideally we'd store the risk score in the DB with the scan, but we can re-compute or fetch from RiskLogs if linked.
        # For this Phase, simple re-eval:
        
        scores = []
        for scan in scans:
            s_score = 100
            if scan.encryption == 'OPEN' or scan.encryption == 'NONE':
                s_score -= 40
            elif scan.encryption == 'WEP':
                s_score -= 25
            scores.append(s_score)
            
        # Weighted Average: Recent scans count more
        # Weights: [1.0, 0.9, 0.8, ...]
        total_weight = 0
        weighted_sum = 0
        
        for i, score in enumerate(scores):
            weight = max(0.1, 1.0 - (i * 0.1)) # Decrease weight by 10% for each older scan
            weighted_sum += score * weight
            total_weight += weight
            
        final_score = int(weighted_sum / total_weight)
        
        # Determine Trend
        trend = "STABLE"
        if len(scores) >= 2:
            recent = scores[0]
            older = sum(scores[1:]) / len(scores[1:])
            if recent > older + 5:
                trend = "IMPROVING 📈"
            elif recent < older - 5:
                trend = "DEGRADING 📉"
                
        return {
            "score": final_score,
            "trend": trend,
            "history_count": len(scans)
        }
