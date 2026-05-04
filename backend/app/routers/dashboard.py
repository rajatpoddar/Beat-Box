from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Booking, InventoryItem, StaffMember
from app.schemas import DashboardStats
from app.auth import get_current_user

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_stats(db: Session = Depends(get_db), _=Depends(get_current_user)):
    total = db.query(Booking).count()
    pending = db.query(Booking).filter(Booking.status == "pending").count()
    confirmed = db.query(Booking).filter(Booking.status == "confirmed").count()
    staff = db.query(StaffMember).count()
    inventory = db.query(InventoryItem).count()
    recent = db.query(Booking).order_by(Booking.created_at.desc()).limit(10).all()
    return {
        "total_bookings": total,
        "pending_bookings": pending,
        "confirmed_bookings": confirmed,
        "total_staff": staff,
        "total_inventory": inventory,
        "recent_bookings": recent,
    }
