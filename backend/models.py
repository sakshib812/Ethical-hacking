from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from database import Base
import datetime

class WiFiScan(Base):
    __tablename__ = 'wifi_scans'
    
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    ssid = Column(String(100))
    bssid = Column(String(50))
    encryption = Column(String(20))
    signal_dbm = Column(Integer)
    
    def __init__(self, ssid, bssid, encryption, signal_dbm):
        self.ssid = ssid
        self.bssid = bssid
        self.encryption = encryption
        self.signal_dbm = signal_dbm

class RiskLog(Base):
    __tablename__ = 'risk_logs'
    
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    ssid_analyzed = Column(String(100))
    risk_score = Column(Integer)
    status = Column(String(20)) # SAFE, WARNING, DANGER
    alerts_json = Column(Text) # JSON string of alerts
    
    def __init__(self, ssid, score, status, alerts):
        self.ssid_analyzed = ssid
        self.risk_score = score
        self.status = status
        self.alerts_json = alerts
