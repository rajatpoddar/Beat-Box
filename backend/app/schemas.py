from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Auth
class Token(BaseModel):
    access_token: str
    token_type: str

# Booking
class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    event_date: str
    event_type: str
    guests: Optional[str] = None
    venue: Optional[str] = None
    message: Optional[str] = None

class BookingStatusUpdate(BaseModel):
    status: str

class BookingOut(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[str] = None
    event_date: str
    event_type: str
    guests: Optional[str] = None
    venue: Optional[str] = None
    message: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Inventory
class InventoryCreate(BaseModel):
    name: str
    category: str
    quantity: int = 1
    available_quantity: int = 1
    condition: str = "Good"
    purchase_date: Optional[str] = None
    notes: Optional[str] = None

class InventoryOut(InventoryCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Staff
class StaffCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    role: str
    status: str = "available"
    assignment: Optional[str] = None
    joined_date: Optional[str] = None

class StaffOut(StaffCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Dashboard
class DashboardStats(BaseModel):
    total_bookings: int
    pending_bookings: int
    confirmed_bookings: int
    total_staff: int
    total_inventory: int
    recent_bookings: list[BookingOut]
