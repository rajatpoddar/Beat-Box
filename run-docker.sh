#!/bin/bash

echo "🚀 Building and starting Beat Box in Docker..."
docker-compose up -d --build

echo "⏳ Waiting for ports to be assigned..."
sleep 2

# Ports defined in docker-compose.yml
FRONTEND_PORT=9080
BACKEND_PORT=9081

echo ""
echo "✅ Beat Box is up and running!"
echo "🌐 Frontend URL: http://localhost:$FRONTEND_PORT"
echo "📡 Backend URL:  http://localhost:$BACKEND_PORT"
echo ""
echo "Note: Since random ports are used, you may need to update your frontend environment variables"
echo "to point to the new backend URL if they are not already dynamic."
echo ""
echo "To stop the app, run: docker-compose down"
