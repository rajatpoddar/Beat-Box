from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=True)
    event_date = Column(String(20), nullable=False)
    event_type = Column(String(100), nullable=False)
    guests = Column(String(50), nullable=True)
    venue = Column(String(200), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(20), default="pending")  # pending|confirmed|rejected|completed
    created_at = Column(DateTime, default=datetime.utcnow)

class InventoryItem(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    quantity = Column(Integer, default=1)
    available_quantity = Column(Integer, default=1)
    condition = Column(String(50), default="Good")
    purchase_date = Column(String(20), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class StaffMember(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=True)
    role = Column(String(100), nullable=False)
    status = Column(String(20), default="available")  # available|assigned|on_leave
    assignment = Column(String(200), nullable=True)
    joined_date = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
