import difflib

class PhishingGuard:
    def __init__(self):
        self.official_sites = [
            "mahadbt.gov.in",
            "uidai.gov.in",
            "sbi.co.in",
            "onlinesbi.sbi",
            "incometax.gov.in",
            "cybercrime.gov.in",
            "facebook.com",
            "google.com"
        ]

    def check_url(self, url):
        """
        Checks if a URL is a typo-squatted version of a known official site.
        Returns: {'is_phishing': bool, 'target': str, 'similarity': float}
        """
        # Clean URL (remove http/https/www)
        clean_url = url.replace("https://", "").replace("http://", "").replace("www.", "").split('/')[0]
        
        # Exact match = Safe (if it's in our list)
        if clean_url in self.official_sites:
            return {"is_phishing": False, "status": "OFFICIAL"}
            
        # Check similarity
        for official in self.official_sites:
            ratio = difflib.SequenceMatcher(None, clean_url, official).ratio()
            
            # If similarity is High (e.g. > 0.8) but NOT exact -> Phishing!
            # e.g., "mahadbt.org.in" vs "mahadbt.gov.in"
            if 0.8 < ratio < 1.0:
                return {
                    "is_phishing": True,
                    "status": "PHISHING_DETECTED",
                    "target": official,
                    "similarity": round(ratio, 2),
                    "msg_mr": f"Savadha! '{clean_url}' he '{official}' sarkhe disat ahe (Fake Site)."
                }
                
        return {"is_phishing": False, "status": "SAFE_OR_UNKNOWN"}
