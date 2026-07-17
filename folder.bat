@echo off
title Gangguan System Project Generator
color 0A

echo ============================================
echo      GANGGUAN SYSTEM PROJECT GENERATOR
echo ============================================
echo.

set PROJECT=gangguan-system

echo Creating Project...

mkdir %PROJECT%
cd %PROJECT%

:: ===========================
:: ROOT
:: ===========================

mkdir backend
mkdir frontend
mkdir database
mkdir docs
mkdir assets

type nul > README.md
type nul > .gitignore

:: ===========================
:: BACKEND
:: ===========================

cd backend

mkdir src
mkdir uploads
mkdir logs

type nul > .env
type nul > package.json
type nul > tsconfig.json

cd src

mkdir config
mkdir controllers
mkdir services
mkdir repositories
mkdir routes
mkdir middlewares
mkdir validators
mkdir dto
mkdir interfaces
mkdir models
mkdir utils
mkdir constants
mkdir types

type nul > app.ts
type nul > server.ts

cd ..

:: Upload Folder

cd uploads

mkdir damage
mkdir before
mkdir after
mkdir avatars
mkdir documents

cd ..

:: Logs

cd logs

type nul > .gitkeep

cd ..

:: ===========================
:: FRONTEND
:: ===========================

cd ..

cd frontend

mkdir public
mkdir src

type nul > package.json
type nul > vite.config.ts
type nul > tsconfig.json

cd src

mkdir api
mkdir assets
mkdir components
mkdir hooks
mkdir layouts
mkdir pages
mkdir routes
mkdir services
mkdir store
mkdir styles
mkdir types
mkdir utils
mkdir context

:: Feature Modules

mkdir features

cd features

mkdir auth
mkdir dashboard
mkdir users
mkdir companies
mkdir branches
mkdir tickets
mkdir categories
mkdir reports
mkdir settings
mkdir notifications

cd ..

type nul > App.tsx
type nul > main.tsx

cd ..

:: ===========================
:: DATABASE
:: ===========================

cd ..

cd database

type nul > database.sql
type nul > migration.sql
type nul > seed.sql

cd ..

:: ===========================
:: DOCS
:: ===========================

cd docs

type nul > api.md
type nul > database.md
type nul > deployment.md
type nul > requirement.md

cd ..

:: ===========================
:: ASSETS
:: ===========================

cd assets

mkdir images
mkdir icons
mkdir logo

cd ..

echo.
echo ============================================
echo Project Successfully Created!
echo ============================================
echo.

tree /F

pause