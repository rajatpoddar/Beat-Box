from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.database import get_db
from app.models import InventoryItem
from app.schemas import InventoryCreate, InventoryOut
from app.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[InventoryOut])
def list_items(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(InventoryItem).order_by(InventoryItem.name).all()

@router.post("/", response_model=InventoryOut)
def create_item(item: InventoryCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    db_item = InventoryItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=InventoryOut)
def update_item(item_id: int, item: InventoryCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for k, v in item.model_dump().items():
        setattr(db_item, k, v)
    db_item.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Deleted"}
