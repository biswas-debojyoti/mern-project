import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    user: req.user,
  });
});

export default app;
