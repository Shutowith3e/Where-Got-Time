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

| Category      | Technology                   |
| ------------- | ---------------------------- |
| Frontend      | React.js, Tailwind CSS       |
| Backend       | Node.js, Express.js          |
| Auth & DB     | Supabase (PostgreSQL + Auth) |
| Notifications | In App                       |

---

## 🧩 Core Features

### 🔐 Authentication

- ✅ **Sign up** with email and password
  - Validates email format
  - Generates email verification token (JWT-style)
- ✅ **Login**
  - Checks for email + password match
  - Only verified users allowed to log in

---

### 📅 Calendar & Event Management

- ✅ Weekly default view
- ✅ Create **recurring events** (weekly, monthly, yearly)
- ✅ Event attributes:
  - Title, description
  - Start & end datetime
  - Recurrence (Yes/No + pattern, rrule)
  - Priority: High or Low
  - Privacy (private low-priority events visible only to creator)

---

### 👥 Group System

- ✅ Users can:
  - Create groups (personal group auto-created at signup)
  - Join via **invites** under pending invites
  - Invite members as Admins
  - Ciew group events
- ✅ Admin permissions:
  - Add/remove users
  - Delete group
  - Create Events
  - Update Events
  - Delete Events
  - Remove Admins
- ✅ Group limits:
  - Max 50 members
  - Must have at least 1 Admin (creator)
  - A user can be in **multiple groups**

---

### ⚠️ Clash & Notification System

- ✅ **Clash Detection**:
  - High-priority events compared across group members
  - Notification sent to all affected users
- ✅ Notification Methods(future expansions):
  - Email (via Nodemailer)
  - (Optional) Telegram alerts via bot API
- ✅ Personal events are stored in 1-person groups
  - Not allowed to leave personal group

---

## 🚀 Inspiration

It started with a learning journey we had to attend for one of our mods. Both our prof and TAs struggled to find time when the trip had to be shifted at the last minute. Numerous phone calls had to be made to each and every classmate to find new time. So we thought, what if we had something to do that for us?

## 💡 What it does

WhereGotTime is a next-gen scheduling app which simplifies group coordination with powerful admin tools and intelligent time management. Users can create groups and invite their friends to join them!

With such user-based access, admins can push high-priority events that group members can’t remove, which they can find time for by using our unique gradient view calendar. It scales dynamically with the group's size, visually highlighting busy slots of each member across all their groups.

To prevent foul play and protect user privacy, invited members have to accept the invite from their main drawer page before they can be successfully added into the group.

Additionally, users can label events as high or low priority. This allows clear visual representation through colour coding. Recurring events are also supported with highly customizable options. Real-time clash detection keeps all stakeholders updated instantly.

## 🛠 How we built it

We made use of Node.js and Express.js as the backend to handle business logic, as well as React.js for the frontend. To ensure a safe authentication process, we utilised Supabase Auth's JWTs for user authentication and authorization. Users verify emails after signing up before first login. Backend middleware checks JWTs for protected routes.

We wrote some of our backend functions directly on Supabase using Remote Procedure Calls (RPC) to leverage PostgreSQL’s built-in transaction capabilities for complex operations involving multiple CRUD steps.

We deployed on Huawei Cloud to utilize its robust infrastructure, while also exploring other options such as Netlify for testing and demo purposes.

## 🧗‍♂️ Challenges we ran into and takeaways

### 🔁 RRULE (recurring events) Nightmare

Both frontend and backend struggled with `RRULE`, a JS library for recurring events. On the FE, we had to design UI that could output properly formatted RRULE strings. On the BE, we had to parse these strings and implement recurrence-aware clash detection. It took late nights, multiple debugging sessions, and lots of sacrifice to the coding gods — but we made it.

### 💻 Backend

We initially faced issues with JWT authentication. After mentorship and research, we resolved this through proper middleware verification and role-based access logic. Writing RPCs on Supabase allowed us to bundle complex business logic into secure, atomic operations.

### 🖥️ Frontend

We struggled with prop-drilling and overly coupled components. Initially, we passed props through many unnecessary layers. We solved this by using React Context to simplify state access while maintaining readability. We also learned to balance between reusability and component specificity.

### 🔄 Overall Team Flow

It was our first time building a full-stack project. At first, the FE asked for too much or too little data, and the BE created too many endpoints. The pacing also varied—sometimes FE was ahead, sometimes BE. We solved this with regular communication and by testing with dummy data while waiting for the other side to catch up.

## 🧠 What we learned

Learning isn’t always additive. Sometimes you have to unlearn and redo. We had to restructure components, redesign backend logic, and throw away hours of work — but we grew immensely from it. Seeing the final product work as intended made everything worth it.

## 🏆 Accomplishments we're proud of

We built something genuinely useful. A full-featured group scheduler that we (dare say) is better than Google Calendar and Microsoft Outlook for our specific use case.

But even more, we learned how to work with one another. We adapted, compromised, and improved as a team. And that’s the true win.

## 🔮 What’s next

1. Make the platform fully responsive for mobile users
2. Enable out-of-app notifications via Telegram bot or SMTP email

## 🛠 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/wheregottime.git
cd wheregottime
```

### 2. Starting FE

```bash
cd frontend
npm run install-all
npm run dev
```

### 3. Starting BE

```bash
cd backend
npm i
nodemon app.js
```

### Deployment Steps (Onto Netlify)

1. Fork the repository
2. Sign up on netlify
3. Click "Add a new Project"
4. Link netlify to your github
5. Select "Where-Got-Time" to deploy
6. Configure the project settings, ensure that the branch deployed is main (main is the default, unless you have switched it)
7. Configure the environment variables of the project

```bash
SUPABASE_JWT_SECRET
SUPABASE_KEY
SUPABASE_URL
VITE_BACKEND_URL
VITE_SUPABASE_REDIRECT_URL
```

## Checkout our deployed version here

https://where-got-time.netlify.app/
