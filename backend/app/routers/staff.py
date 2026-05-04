from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import StaffMember
from app.schemas import StaffCreate, StaffOut
from app.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[StaffOut])
def list_staff(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(StaffMember).order_by(StaffMember.name).all()

@router.post("/", response_model=StaffOut)
def create_staff(staff: StaffCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    db_staff = StaffMember(**staff.model_dump())
    db.add(db_staff)
    db.commit()
    db.refresh(db_staff)
    return db_staff

@router.put("/{staff_id}", response_model=StaffOut)
def update_staff(staff_id: int, staff: StaffCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    db_staff = db.query(StaffMember).filter(StaffMember.id == staff_id).first()
    if not db_staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    for k, v in staff.model_dump().items():
        setattr(db_staff, k, v)
    db.commit()
    db.refresh(db_staff)
    return db_staff

@router.delete("/{staff_id}")
def delete_staff(staff_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    db_staff = db.query(StaffMember).filter(StaffMember.id == staff_id).first()
    if not db_staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    db.delete(db_staff)
    db.commit()
    return {"message": "Deleted"}
