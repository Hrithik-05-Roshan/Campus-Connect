import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    console.log('🔐 Auth middleware called');
    console.log('📝 Cookies received:', req.cookies);
    const token = req.cookies.token;

    if (!token) {
      console.log('❌ No token found in cookies');
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    console.log('✅ Token found, verifying...');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized"
    });
  }
};

export default protect;
