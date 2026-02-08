# System Architecture

## Overview
The system follows a client-server architecture with a clear separation
between frontend and backend layers.

## Frontend
- Built with React
- Communicates with backend via REST API
- Responsible for UI and user interaction

## Backend
- Built with Node.js and Express
- Handles business logic and data processing
- Exposes RESTful endpoints

## Database
- PostgreSQL
- Stores employees, areas, knowledge, and relationships

## Architecture Diagram (Conceptual)
Frontend (React)
→ REST API
→ Backend (Express)
→ PostgreSQL Database