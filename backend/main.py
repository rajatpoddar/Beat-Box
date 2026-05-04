from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import engine, Base
from app.routers import auth, bookings, inventory, staff, dashboard

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    Base.metadata.create_all(bind=engine)
    # Seed admin user
    from app.database import SessionLocal
    from app.models import User
    from app.auth import get_password_hash
    db = SessionLocal()
    try:
        if not db.query(User).filter(User.username == "admin").first():
            admin = User(username="admin", hashed_password=get_password_hash("admin123"), is_admin=True)
            db.add(admin)
            db.commit()
            print("✅ Admin user created: admin / admin123")
    finally:
        db.close()
    yield

app = FastAPI(title="Beat Box API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(staff.router, prefix="/api/staff", tags=["Staff"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])

@app.get("/")
def root():
    return {"message": "Beat Box API v1.0", "status": "running"}
