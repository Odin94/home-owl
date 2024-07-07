#!/bin/bash
set -e

echo "Starting database..."
docker compose up -d

echo "Starting backend..."
cd backend
npm start &

echo "Starting frontend..."
cd ../frontend
npm start