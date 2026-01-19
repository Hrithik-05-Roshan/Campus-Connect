import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* =====================
   AUTH ROUTES
===================== */

// Register (with profile image)
router.post(
  "/register",
  upload.single("profileImage"),
  registerUser
);

// Login
router.post("/login", loginUser);

export default router;
