from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, ForeignKey, Index
from sqlalchemy.orm import relationship
from database import Base
import datetime

# ============================================
# User Management & Authentication
# ============================================

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_login = Column(DateTime)
    
    # Gamification
    points = Column(Integer, default=0)
    level = Column(Integer, default=1)
    rank = Column(Integer)
    
    # Profile
    display_name = Column(String(100))
    avatar_url = Column(String(255))
    location = Column(String(100))
    
    # Relationships
    scans = relationship('WiFiScan', back_populates='user', cascade='all, delete-orphan')
    badges = relationship('UserBadge', back_populates='user', cascade='all, delete-orphan')
    ratings = relationship('NetworkRating', back_populates='user', cascade='all, delete-orphan')
    trusted_networks = relationship('TrustedNetwork', back_populates='user', cascade='all, delete-orphan')
    settings = relationship('UserSettings', back_populates='user', uselist=False, cascade='all, delete-orphan')
    
    def __init__(self, username, email, password_hash, display_name=None):
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.display_name = display_name or username


# ============================================
# Network Scanning & Analysis
# ============================================

class WiFiScan(Base):
    __tablename__ = 'wifi_scans'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)  # Nullable for anonymous scans
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    
    # Basic Network Info
    ssid = Column(String(100), nullable=False)
    bssid = Column(String(20), nullable=False, index=True)
    encryption = Column(String(20))
    
    # Signal Metrics
    signal_dbm = Column(Integer)
    snr_db = Column(Float)
    frequency = Column(Float)  # 2.4 or 5 GHz
    channel = Column(Integer)
    bandwidth = Column(Integer)  # 20, 40, 80 MHz
    
    # Advanced Telemetry
    congestion_pct = Column(Float)
    latency_ms = Column(Integer)
    gateway_mac = Column(String(20))
    broadcast_density = Column(Float)
    
    # Location (for mapping)
    latitude = Column(Float)
    longitude = Column(Float)
    
    # Relationships
    user = relationship('User', back_populates='scans')
    risk_log = relationship('RiskLog', back_populates='scan', uselist=False, cascade='all, delete-orphan')
    devices = relationship('NetworkDevice', back_populates='scan', cascade='all, delete-orphan')
    security_tests = relationship('SecurityTest', back_populates='scan', cascade='all, delete-orphan')
    
    # Indexes for common queries
    __table_args__ = (
        Index('idx_user_timestamp', 'user_id', 'timestamp'),
        Index('idx_bssid_timestamp', 'bssid', 'timestamp'),
    )
    
    def __init__(self, ssid, bssid, encryption, signal_dbm, user_id=None):
        self.ssid = ssid
        self.bssid = bssid
        self.encryption = encryption
        self.signal_dbm = signal_dbm
        self.user_id = user_id


class RiskLog(Base):
    __tablename__ = 'risk_logs'
    
    id = Column(Integer, primary_key=True)
    scan_id = Column(Integer, ForeignKey('wifi_scans.id'), unique=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Risk Assessment
    risk_score = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)  # SAFE, WARNING, DANGER
    
    # Threat Detection Flags
    has_evil_twin = Column(Boolean, default=False)
    has_mitm = Column(Boolean, default=False)
    has_dns_hijack = Column(Boolean, default=False)
    has_ssl_strip = Column(Boolean, default=False)
    has_arp_spoof = Column(Boolean, default=False)
    
    # Detailed Results (JSON)
    alerts_json = Column(Text)  # JSON array of alerts
    telemetry_json = Column(Text)  # JSON object of metrics
    
    # Legacy field for compatibility
    ssid_analyzed = Column(String(100))
    
    # Relationships
    scan = relationship('WiFiScan', back_populates='risk_log')
    
    def __init__(self, scan_id, risk_score, status, alerts_json, ssid=None):
        self.scan_id = scan_id
        self.risk_score = risk_score
        self.status = status
        self.alerts_json = alerts_json
        self.ssid_analyzed = ssid


# ============================================
# Device Management
# ============================================

class NetworkDevice(Base):
    __tablename__ = 'network_devices'
    
    id = Column(Integer, primary_key=True)
    scan_id = Column(Integer, ForeignKey('wifi_scans.id'), nullable=False)
    
    # Device Identity
    mac_address = Column(String(20), nullable=False, index=True)
    ip_address = Column(String(15))
    hostname = Column(String(100))
    
    # Device Classification
    device_type = Column(String(50))  # phone, laptop, router, etc.
    manufacturer = Column(String(100))  # From OUI lookup
    
    # Status
    is_online = Column(Boolean, default=True)
    is_intruder = Column(Boolean, default=False)
    first_seen = Column(DateTime, default=datetime.datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Custom
    custom_name = Column(String(100))
    
    # Relationships
    scan = relationship('WiFiScan', back_populates='devices')


# ============================================
# Security Tests
# ============================================

class SecurityTest(Base):
    __tablename__ = 'security_tests'
    
    id = Column(Integer, primary_key=True)
    scan_id = Column(Integer, ForeignKey('wifi_scans.id'), nullable=False)
    test_type = Column(String(50), nullable=False, index=True)  # DNS_LEAK, SSL_STRIP, etc.
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Results
    passed = Column(Boolean, nullable=False)
    severity = Column(String(20))  # LOW, MEDIUM, HIGH, CRITICAL
    details_json = Column(Text)  # Test-specific details
    
    # Metrics
    execution_time_ms = Column(Integer)
    
    # Relationships
    scan = relationship('WiFiScan', back_populates='security_tests')


# ============================================
# Community Features
# ============================================

class NetworkRating(Base):
    __tablename__ = 'network_ratings'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    bssid = Column(String(20), nullable=False, index=True)
    
    # Ratings (1-5 stars)
    safety_rating = Column(Integer)
    speed_rating = Column(Integer)
    reliability_rating = Column(Integer)
    
    # Review
    comment = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    user = relationship('User', back_populates='ratings')
    
    __table_args__ = (
        Index('idx_bssid_timestamp', 'bssid', 'timestamp'),
    )


class UserBadge(Base):
    __tablename__ = 'user_badges'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    badge_id = Column(String(50), nullable=False)  # guardian, scout, expert, etc.
    
    earned_at = Column(DateTime, default=datetime.datetime.utcnow)
    progress = Column(Integer, default=0)
    total_required = Column(Integer)
    is_earned = Column(Boolean, default=False)
    
    # Relationships
    user = relationship('User', back_populates='badges')
    
    __table_args__ = (
        Index('idx_user_badge', 'user_id', 'badge_id', unique=True),
    )


class TrustedNetwork(Base):
    __tablename__ = 'trusted_networks'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    ssid = Column(String(100), nullable=False)
    bssid = Column(String(20))
    added_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    user = relationship('User', back_populates='trusted_networks')


# ============================================
# Settings & Preferences
# ============================================

class UserSettings(Base):
    __tablename__ = 'user_settings'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    
    # Alert Preferences
    voice_alerts_enabled = Column(Boolean, default=True)
    push_notifications_enabled = Column(Boolean, default=True)
    
    # Language & Display
    language = Column(String(10), default='en')  # en, mr
    dark_mode = Column(Boolean, default=False)
    
    # Scanning
    auto_scan_enabled = Column(Boolean, default=False)
    scan_interval_minutes = Column(Integer, default=10)
    
    # Relationships
    user = relationship('User', back_populates='settings')
