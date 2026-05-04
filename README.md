# Beat Box - Event Management System

Beat Box is a comprehensive Event Management application designed for an event management company based in Dumka, Jharkhand. It offers a beautiful, public-facing landing page for clients to explore services and book events, alongside a secure, feature-rich Admin Panel for managing bookings, staff, and inventory.

## 🚀 Features

### Public Landing Page
*   **Hero Section**: Stunning visual introduction with scroll animations.
*   **Services**: Details of offerings like DJ & Sound, Stage Decoration, Lighting, Stage Programs, Corporate Meetings, etc.
*   **Reels/Gallery Section**: Showcase of past events and setups.
*   **Contact/Booking**: Direct inquiry and booking form for clients.
*   **Responsive Design**: Built carefully for mobile, tablet, and desktop viewing.

### Admin Dashboard (Protected Route)
*   **Overview/Dashboard**: High-level metrics for quick insights.
*   **Bookings Management**: Accept, reject, and monitor customer booking requests.
*   **Inventory Tracking**: Manage event equipment (speakers, lights, etc.), monitor conditions, and track low-stock items.
*   **Staff Management**: Track employee roles, contact information, and current assignment status.

## 🛠️ Tech Stack

**Frontend:**
*   React 19
*   TypeScript
*   Vite
*   Tailwind CSS (v4)
*   Framer Motion (for complex animations & transitions)
*   Lucide React (Icons)
*   React Router DOM (Routing)

**Backend:**
*   FastAPI (Python framework for high-performance APIs)
*   SQLite (Database)
*   SQLAlchemy (ORM)
*   Pydantic (Data validation)
*   Uvicorn (ASGI server)

**Deployment:**
*   Docker & Docker Compose

## ⚙️ Local Development Setup

You can run the full stack locally using the provided bash scripts.

### Prerequisite
*   Node.js (v18+)
*   Python (3.9+)

### Running without Docker
We have provided a unified script to start both the frontend and backend servers simultaneously.
```bash
# Make the script executable
chmod +x start.sh

# Run the local development servers
./start.sh
```
*   **Frontend**: Usually available at `http://localhost:5173`
*   **Backend**: Available at `http://localhost:8000` (API documentation at `http://localhost:8000/docs`)

## 🐳 Docker Deployment

The application is fully containerized for easy production deployment.

```bash
# Make the docker script executable
chmod +x run-docker.sh

# Build and start the containers in detached mode
./run-docker.sh
```

**Docker Port Mapping:**
*   **Frontend**: `http://localhost:9080`
*   **Backend API**: `http://localhost:9081`

The `docker-compose.yml` mounts the `beatbox.db` as a volume so your database data persists across container restarts.

## 📝 License
This project is proprietary and built specifically for Beat Box Event Management.
