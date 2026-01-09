Tech Stack

Frontend

React (Vite)
Tailwind CSS v4
Zustand – global auth state
SWR – data fetching & caching
Axios
React Router DOM

Backend

Node.js
Express.js
MongoDB (Atlas)
Mongoose
JWT Authentication
Role-Based Access Control (RBAC)

✨ Features
🔐 Authentication

User Register & Login
JWT-based authentication
Role support (user, admin)

📝 Posts

Create, Read, Update, Delete posts
Only post owner or admin can edit/delete
Pagination support (backend + frontend)

💬 Comments

Add comments to posts
Edit/Delete comments (owner or admin)
Real-time UI updates using SWR mutate

🛡️ Authorization

Protected routes (frontend & backend)
Admin-only routes
Role-based UI rendering

📊 Admin Dashboard

Total users
Total posts
Total comments
Accessible only by admin users

📜 Activity Logging (Middleware)

Logs important user actions:
Login
Post creation
Post deletion
Comment actions
Logs stored in MongoDB
Non-blocking middleware

🧱 Clean Architecture

Controller → Service → Model separation
Business logic moved to services
Thin controllers
Scalable folder structure

🔳🔲🔲🔲🔲🔲🔲🔲
🔳
🔲
🔳
🔲🔲🔲🔲🔲🔲🔲🔲

🔲.env for Backend
PORT=5000
MONGO_URI=mongodb+srv://debojyoti:<.......security>@cluster0.ykxbz.mongodb.net/?appName=Cluster0
JWT_SECRET=debusecretkey

🔲.env for Frontend
VITE_API_BASE_URL=http://localhost:5000/api

🔳🔲🔲🔲🔲🔲🔲🔲
🔳
🔲
🔳
🔲🔲🔲🔲🔲🔲🔲🔲

login password

admin--
id- test@test.in
password-123


user(can create user)
id- debu@debu.in
password- 123
