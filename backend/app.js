import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */

app.use(
  cors({
    origin: true, // frontend origin will be auto-detected
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =======================
   HEALTH CHECK
======================= */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusConnect backend is healthy"
  });
});

/* =======================
   ROUTES (PLACEHOLDERS)
======================= */

// Auth routes
app.use("/api/auth", (req, res) => {
  res.status(501).json({ message: "Auth routes not initialized yet" });
});

// User routes
app.use("/api/user", (req, res) => {
  res.status(501).json({ message: "User routes not initialized yet" });
});

// Event routes
app.use("/api/events", (req, res) => {
  res.status(501).json({ message: "Event routes not initialized yet" });
});

// Issue routes
app.use("/api/issues", (req, res) => {
  res.status(501).json({ message: "Issue routes not initialized yet" });
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});


export default app;
