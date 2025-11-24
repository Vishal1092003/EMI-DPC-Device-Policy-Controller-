# 📱 EMI Blocking System
 

A complete **Device Control & EMI Lock System** that allows sellers (admins) to register sold devices, remotely lock/unlock them, and manage customer verification — built using **React Native (Expo)** frontend and a **Node.js + Express + MongoDB** backend.

<img width="8301" height="1361" alt="Untitled diagram-2025-11-24-015038" src="https://github.com/user-attachments/assets/7b016a61-bae3-44b5-938a-1b61c5d6afbe" />

---
      ┌──────────────────────────────┐
      │        👨‍💼 Admin App         │
      │ (React Native / Expo Router) │
      └─────────────┬────────────────┘
                    │
 ┌──────────────────┴────────────────────┐
 │                                       │
 ▼                                       ▼
┌──────────────┐ ┌───────────────────────┐
│ Login Screen │ │ Dashboard Screen │
│ (JWT Auth) │ │ • Register Device │
│ │ │ • View Sold Devices │
└──────┬────────┘ └─────────┬────────────┘
│ POST /api/admin/login │
│ │
▼ ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│ ☁️ Backend (API) │ │ MongoDB Database │
│ Express + Node.js + Helmet │ │ Stores all device records, │
│ Routes: │ │ status, OTP & commands │
│ • /api/devices/register │ │ │
│ • /api/devices/lock/:imei │ └──────────────┬───────────────┘
│ • /api/devices/unlock/:imei │ │
│ • /api/devices/pollCommand │ │
└──────────┬───────────────────┘ │
│ │
│ │
▼ ▼
┌──────────────────────┐ ┌──────────────────────────────┐
│ 🔒 Customer Device │ │ pendingCommand Example: │
│ (DPC Provisioned App)│ │ { │
│ │ │ "type": "LOCK", │
│ - Polls backend │ │ "payload": { "otp": 654321 }│
│ - Executes Lock/Unlock│ │ } │
└──────────┬───────────┘ └──────────────────────────────┘
│
│ GET /api/devices/pollCommand?imei=xxxx
▼
┌───────────────────────────────────────────┐
│ Backend sends next queued command │
│ → LOCK → Device locks + shows OTP │
│ → UNLOCK → Device restores normal state │
└───────────────────────────────────────────┘

## 🚀 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend (Mobile)** | React Native (Expo), Expo Router, AsyncStorage, Fetch API |
| **Backend (API Server)** | Node.js, Express.js, MongoDB (Mongoose), Helmet, CORS |
| **Deployment** | Backend → Vercel / Render <br> Frontend → Expo (Android / iOS build) |
| **Security / Auth** | JWT-based Admin Authentication |
| **Device Provisioning** | Android DPC (Device Policy Controller) + QR-based onboarding |
| **Optional Push** | FCM integration for remote commands (future scope) |

---
![device ownership](https://github.com/user-attachments/assets/951c838b-6df5-4eee-903b-da0cbc9535e3)

## 🏗️ System Architecture

┌─────────────────────────────┐
│ Admin App (Expo) │
│ • Admin Login / Register │
│ • Register Sold Devices │
│ • View Devices List │
│ • Lock / Unlock Device │
└──────────────┬──────────────┘
│ REST API
▼
┌─────────────────────────────┐
│ Backend (Express + DB) │
│ • /api/admin/login │
│ • /api/devices/register │
│ • /api/devices/lock/:imei │
│ • /api/devices/unlock/:imei│
│ • /api/provision/qr │
│ • /api/devices/pollCommand │
└──────────────┬──────────────┘
│
▼
┌─────────────────────────────┐
│ Customer Device (DPC APK) │
│ • Scans QR → auto-installs │
│ • Registers IMEI to server │
│ • Polls /api/devices/poll │
│ • Executes LOCK/UNLOCK cmd │
└─────────────────────────────┘

---

## ⚙️ Folder Structure

emi-blocking-system/
├── backend/
│ ├── controllers/
│ │ ├── adminController.js
│ │ ├── deviceController.js
│ │ └── provisionController.js
│ ├── models/
│ │ └── Device.js
│ ├── routes/
│ │ ├── adminRoutes.js
│ │ ├── deviceRoutes.js
│ │ └── provisionRoutes.js
│ ├── db.js
│ ├── index.js
│ └── .env
│
└── app/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ └── pages/
│ ├── AdminDashboard.jsx
│ ├── SoldDevices.jsx
│ ├── Home.jsx
│ └── UnlockPage.jsx
├── index.js (initial screen)
└── app.json / package.json

---

## 🧠 Backend Workflows

### 🔐 Admin Authentication
| Method | Route | Description |
|---------|--------|-------------|
| `POST` | `/api/admin/signup` | Register a new admin (stores hashed password) |
| `POST` | `/api/admin/login` | Login → returns JWT token |
| `GET` | `/api/admin/me` | Validate admin session (requires token) |

> JWT tokens are stored in AsyncStorage on frontend for auto-login.

---

### 📱 Device Management Routes
| Method | Route | Description |
|---------|--------|-------------|
| `POST` | `/api/devices/register` | Register a new device (IMEI + owner) |
| `GET` | `/api/devices` | Get all registered devices |
| `PATCH` | `/api/devices/lock/:imei` | Locks device & generates OTP |
| `PATCH` | `/api/devices/unlock/:imei` | Unlocks a locked device |
| `POST` | `/api/devices/verify` | Customer verifies OTP to unlock |

---

### 🤖 Device ↔ Server Communication (DPC or Mobile Client)
| Method | Route | Description |
|---------|--------|-------------|
| `POST` | `/api/devices/register` | DPC calls after provisioning to register |
| `GET` | `/api/devices/pollCommand?imei=xxxx` | DPC polls every few seconds for pending commands |
| `PATCH` | `/api/devices/lock/:imei` | Admin triggers LOCK — command queued for DPC |
| `PATCH` | `/api/devices/unlock/:imei` | Admin triggers UNLOCK — queued for DPC |
| `POST` | `/api/devices/verify` | Customer enters OTP to unlock manually |

---

### 🧩 QR Provisioning (Android DPC Setup)
| Method | Route | Description |
|---------|--------|-------------|
| `GET` | `/api/provision/qr` | Returns base64 QR for Android provisioning |

The QR encodes:

{
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.vishal1092003.emiBlocker/.MyDeviceAdminReceiver",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://your-domain.com/static/emi-dpc-release.apk",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "<sha256_base64_checksum>",
  "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true
}
💡 EMI Lock System — Frontend (React Native / Expo)

This is the **mobile frontend** for the EMI Blocking System.  
It allows the **Admin/Seller** to manage sold devices, lock/unlock them remotely, and handle customer device control using a secure backend API.

---
![screen 1](https://github.com/user-attachments/assets/2067d2c9-b488-4f67-a17e-3e63377c8866)
![screen 2](https://github.com/user-attachments/assets/53de99ac-0734-4b3f-acdc-01f9aa685f90)
![screen 3](https://github.com/user-attachments/assets/72e70a9e-c2a3-4eed-9e88-50713658599c)
## 🚀 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Framework** | React Native (Expo) |
| **Routing** | Expo Router |
| **State / Storage** | React Hooks, AsyncStorage |
| **Network** | Fetch API |
| **Styling** | React Native StyleSheet |
| **Authentication** | JWT-based Login / Token Persistence |
| **Device ID** | Expo Application / SecureStore (future use) |

---

## 💡 Frontend Flow

### 🧍 Admin Login / Signup
- Admin can **sign up** or **login** with credentials.
- On successful login, the server returns a **JWT token**.
- The JWT token is saved in `AsyncStorage` for session persistence.
- If a valid token is found at app startup → user is redirected automatically to the dashboard.

**Key Screens**
- `AdminLogin.jsx`
- `AdminSignup.jsx`

---

### 🧾 Admin Dashboard
- Once logged in, admin sees their info:
  - Admin name
  - Shop name
- Can **register new customers** with IMEI and Owner Name.
- Can navigate to the **Sold Devices** screen to manage existing devices.

**Features**
- Add new customer device → `POST /api/devices/register`
- Logout → clears JWT + redirects to login
- Navigation → `/src/pages/SoldDevices`

---

### 📱 Sold Devices Screen
- Displays all registered devices belonging to the admin.
- Devices are fetched from the backend via:

###GET /api/devices
- Each card shows:
- IMEI
- Owner Name
- Status (🔒 Locked / ✅ Active)
- Optional OTP (if locked)

**Extra Features**
- Search bar to filter devices by **IMEI** or **Owner name**
- Smooth scroll-down (no horizontal sliding)
- Lock/Unlock buttons trigger backend routes:
- `PATCH /api/devices/lock/:imei`
- `PATCH /api/devices/unlock/:imei`
- Beautiful gradient UI with fixed footer buttons.

---

### 📲 Device Registration (Customer Side)
- Each customer’s phone runs a **DPC (Device Policy Controller)** app.
- DPC app auto-registers itself via:

###POST /api/devices/register
with its unique IMEI or Android ID.
- DPC polls the backend:

###GET /api/devices/pollCommand?imei=xxxx
every few seconds to check if there’s a **LOCK** or **UNLOCK** command.

When a lock command is received:
- The DPC app restricts access and shows a lock screen.
- Unlock command restores device functionality.

---

## ⚙️ API Endpoints Used in Frontend

| Feature | Method | Endpoint | Description |
|----------|--------|-----------|--------------|
| **Login** | POST | `/api/admin/login` | Authenticates admin & returns JWT |
| **Signup** | POST | `/api/admin/signup` | Registers a new admin |
| **Register Device** | POST | `/api/devices/register` | Adds a new customer device |
| **Fetch Devices** | GET | `/api/devices` | Retrieves all registered devices |
| **Lock Device** | PATCH | `/api/devices/lock/:imei` | Locks a customer device |
| **Unlock Device** | PATCH | `/api/devices/unlock/:imei` | Unlocks a customer device |
| **Verify OTP** | POST | `/api/devices/verify` | Customer-side OTP verification |

---

## 🧰 Environment Variables

Create a `.env` file in the **backend** root (not frontend) with these values:

### PORT=3000
### MONGO_URI=your_mongodb_connection_string
### JWT_SECRET=your_secret_key
### DPC_APK_URL=https://yourdomain.com/static/emi-dpc-release.apk

### DPC_APK_FILE=./static/emi-dpc-release.apk
### DPC_COMPONENT=com.vishal1092003.emiBlocker/.MyDeviceAdminReceiver



---

## 🔗 API Base URLs (Frontend Config)

In your frontend React Native code:

```js
// backend API endpoints
export const ADMIN_URL = "https://emidpc-five.vercel.app/api/admin";
export const DEVICE_URL = "https://emidpc-five.vercel.app/api/devices";

🌐 Deployment Guide
⚙️ Backend (Vercel)

Push backend folder to GitHub.

Import it on Vercel Dashboard
.

Add Environment Variables (.env values above).

Deploy → you’ll get a public HTTPS domain like:

Test endpoints in browser/Postman:

/ → 📱 EMI Lock System Backend Running

/api/devices →  Returns device list

/api/provision/qr →  Returns QR data URL JSON


