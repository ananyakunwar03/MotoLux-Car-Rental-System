# MotoLux Car Rental System

MotoLux is a premium, modern self-drive car rental web application where users can browse, search, and book various cars (2-seater, 5-seater, and 7-seater models) for specific dates and times. It features a complete Node.js/Express backend, MongoDB database connection, and a responsive frontend client.

---

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

1. **Node.js** (v16.0.0 or higher) - [Download Node.js](https://nodejs.org/)
2. **MongoDB Community Server** - [Download MongoDB](https://www.mongodb.com/try/download/community) (Make sure the MongoDB service is running locally on the default port `27017`)
3. **Git** - [Download Git](https://git-scm.com/)

---

## Step-by-Step Setup Guide

Follow these steps to download and run the project locally on your machine:

### 1. Clone the Repository
Clone the repository using Git and navigate to the project directory:
```bash
git clone https://github.com/ananyakunwar03/MotoLux-Car-Rental-System.git
cd MotoLux-Car-Rental-System
```

### 2. Install Dependencies
Navigate into the `backend` directory and install the required npm packages:
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a file named `.env` in the `backend/` directory:
- **On Windows (PowerShell)**:
  ```powershell
  New-Item .env -ItemType File
  ```
- **On Mac/Linux**:
  ```bash
  touch .env
  ```

Open `.env` in a text editor and add the following configuration:
```env
MONGO_URI=mongodb://127.0.0.1:27017/car_rental
PORT=5000
```

### 4. Seed the Database
Before running the server for the first time, populate the MongoDB database with the default cars data by running the seed script:
```bash
node seed.js
```
*(You should see a message saying `Cars seeded successfully`)*

### 5. Start the Application
Start the backend Express server:
```bash
npm start
```
The server will start and log:
```text
Server running at http://localhost:5000
MongoDB Connected
```

### 6. Access the Application
Open your web browser and navigate to the entry page:
👉 **[http://localhost:5000/frontend/index.html](http://localhost:5000/frontend/index.html)**

---

## Project Structure

```text
MotoLux-Car-Rental-System/
├── backend/                  # Express backend application
│   ├── config/               # Database connection configs
│   ├── models/               # Mongoose schemas (Car, User, Booking, etc.)
│   ├── routes/               # API endpoints (auth, cars, bookings, etc.)
│   ├── .env                  # Environment configurations (local only)
│   ├── cars.json             # Seed data file for cars
│   ├── seed.js               # Database seeding script
│   └── server.js             # Main server entrypoint
│
└── frontend/                 # Frontend client-side assets
    ├── admin/                # Admin Panel HTML/CSS/JS files
    ├── assests/              # Images, favicon, and icons
    ├── index.html            # Main home page
    └── style.css             # Main styling stylesheet
```
