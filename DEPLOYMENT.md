# Deployment Guide

This guide will help you deploy the FIFA 2025 Dashboard for free using **Render** (Backend) and **Vercel** (Frontend).

## Prerequisites
- A GitHub account.
- Git installed locally.

## Step 1: Push Code to GitHub
1. Create a new repository on GitHub (e.g., `fifa-dashboard`).
2. Push your code to this repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fifa-dashboard.git
   git push -u origin main
   ```

## Step 2: Deploy Backend (Render)
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `fifa-dashboard-backend`
   - **Root Directory**: `.` (or leave empty)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app`
   - **Free Tier**: Select "Free".
5. Click **Create Web Service**.
6. Wait for the deployment to finish. **Copy the URL** (e.g., `https://fifa-dashboard-backend.onrender.com`).

## Step 3: Deploy Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (Click "Edit" and select the `frontend` folder).
   - **Environment Variables**:
     - Key: `VITE_API_URL`
     - Value: `https://fifa-dashboard-backend.onrender.com/api` (Paste your Render URL here + `/api`).
5. Click **Deploy**.

## Step 4: Final Verification
1. Open your Vercel URL.
2. Verify that the dashboard loads and displays player stats.
   - *Note: The free tier of Render spins down after inactivity. The first request might take 50+ seconds. Be patient!*
