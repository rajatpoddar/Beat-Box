#!/bin/bash
# Beat Box - Start Both Servers

echo "🎵 Starting Beat Box..."
echo ""

# Start Backend
echo "▶ Starting FastAPI backend on http://localhost:8000"
cd backend
source venv/bin/activate
python -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Give backend a moment to initialize
sleep 2

# Start Frontend
echo "▶ Starting Vite frontend on http://localhost:5173"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers running!"
echo "   🌐 Public Website : http://localhost:5173"
echo "   🔐 Admin Panel    : http://localhost:5173/admin"
echo "   📡 API Docs       : http://localhost:8000/docs"
echo "   📌 Admin Login    : admin / admin123"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; echo ''; echo '⏹ Servers stopped.'; exit 0" INT
wait
