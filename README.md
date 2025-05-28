# 📅 WhereGotTime

A collaborative web-based scheduling platform designed for SMU users (students and staff alike) to efficiently manage group calendars, detect time clashes, and streamline scheduling with a tiered priority system — without the need for roles like "professor" or "TA". Users can either be **Admins** (who manage group calendars) or **Members**.

---

## 👥 Team Members

- **Que Clarice Lim Hie**
- **Lim Jia Le**
- **Joey Chik Lixuan**
- **Ng Yong Soon**

---

## 🧠 Problem Statement

Coordinating schedules between different individuals at SMU is challenging due to conflicting calendars, irregular classes, and ad-hoc events. **WhereGotTime** solves this by:

- Allowing users to create and manage **calendar groups**
- Providing **priority-based clash detection**
- Sending **email notifications** for critical overlaps
- Supporting **recurring events** with custom frequency

---

## 🎯 Main Target Audience

- Everyone
- No role-based hierarchy — only **Admins** and **Group Members**
- Anyone can create or join a group to share and manage timetables collaboratively

---

## 🔧 Tech Stack

| Category      | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | React.js, Tailwind CSS              |
| Backend       | Node.js, Express.js                 |
| Auth & DB     | Supabase (PostgreSQL + Auth)        |
| Notifications | Nodemailer, Telegram Bot (optional) |
| DevOps        | Docker, Docker Compose              |

---

## 🧩 Core Features

### 🔐 Authentication

- ✅ **Sign up** with email and password
  - Validates email format
  - Hashes password (e.g., bcrypt)
  - Generates email verification token (JWT-style)
  - Optionally uses OTP fallback
- ✅ **Login**
  - Checks for email + password match
  - Only verified users allowed to log in

---

### 📅 Calendar & Event Management

- ✅ Weekly default view
- ✅ Create **recurring events** (daily, weekly, monthly, yearly)
- ✅ Event attributes:
  - Title, description, location
  - Start & end datetime
  - Recurrence (Yes/No + pattern)
  - Priority: High or Low
  - Privacy (private low-priority events visible only to creator)
- ✅ 15-minute buffer clash detection (if time allows)

---

### 👥 Group System

- ✅ Users can:
  - Create groups (personal group auto-created at signup)
  - Join via **Group ID** and request access
  - Approve/deny requests as Admins
- ✅ Admin permissions:
  - Add/remove users
  - Delete group
  - Create Events
- ✅ Group limits:
  - Max 50 members
  - Must have at least 1 Admin (creator)
  - A user can be in **multiple groups**

---

### ⚠️ Clash & Notification System

- ✅ **Clash Detection**:
  - High-priority events compared across group members
  - Notification sent to all affected users
- ✅ Notification Methods:
  - Email (via Nodemailer)
  - (Optional) Telegram alerts via bot API
- ✅ Personal events are stored in 1-person groups

---

## 🛠 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/wheregottime.git
cd wheregottime
```

### 2. Starting FE

```bash
npm run start-fe
```
