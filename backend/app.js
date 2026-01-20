import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow localhost and 127.0.0.1 on any port
      if (origin.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) {
        return callback(null, true);
      }

      // Reject other origins
      callback(new Error('Not allowed by CORS'));
    },
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
app.use("/api/auth", authRoutes);


// User routes
app.use("/api/user", userRoutes);


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
