from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Booking
from app.schemas import BookingCreate, BookingOut, BookingStatusUpdate
from app.auth import get_current_user

router = APIRouter()

# Public: Create booking
@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    db_booking = Booking(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

# Admin: List all bookings
@router.get("/", response_model=List[BookingOut])
def list_bookings(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(Booking).order_by(Booking.created_at.desc()).all()

# Admin: Get single booking
@router.get("/{booking_id}", response_model=BookingOut)
def get_booking(booking_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

# Admin: Update status
@router.patch("/{booking_id}/status", response_model=BookingOut)
def update_booking_status(booking_id: int, update: BookingStatusUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    valid = {"pending", "confirmed", "rejected", "completed"}
    if update.status not in valid:
        raise HTTPException(status_code=400, detail=f"Status must be one of: {valid}")
    booking.status = update.status
    db.commit()
    db.refresh(booking)
    return booking

# Admin: Delete booking
@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return {"message": "Deleted"}
