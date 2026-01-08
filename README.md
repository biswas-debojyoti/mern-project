# mern-project

# MERN Blog Application

A full-stack Blog application built using the **MERN stack** with secure authentication, role-based access control, post and comment management, and an admin dashboard.

---

## 🚀 Features

### Authentication & Security
- User registration & login
- JWT-based authentication
- Password hashing using bcrypt
- Rate limiting on authentication APIs
- Environment-based configuration

### User Roles
- **Admin**
  - Manage all posts and comments
  - View dashboard statistics
- **Regular User**
  - Create, update, and delete own posts
  - Create, update, and delete own comments

### Blog Posts
- Create, read, update, delete posts
- Soft delete functionality
- Ownership & admin-level authorization
- MongoDB relationships using Mongoose

### Comments
- Comment on blog posts
- Owner & admin-based edit/delete permissions
- Post-comment relationship

### Admin Dashboard
- Total users count
- Total posts count
- Total comments count
- Admin-only protected APIs

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT
- bcrypt
- express-rate-limit

**Frontend (Upcoming)**
- React.js
- Context API
- Axios
- React Router

---

## 📁 Project Structure

```txt
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
├── server.js
├── .env
