import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

/* =====================
   REGISTER USER
===================== */
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      role,
      institute,
      course,
      branch,
      year,
      semester
    } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    /* =====================
       PROFILE IMAGE UPLOAD
    ===================== */
    let profileImage = "";

    if (req.file) {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "campusconnect/profiles" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.file.buffer);
        });
      };

      const result = await uploadToCloudinary();
      profileImage = result.secure_url;
    }

    /* =====================
       CREATE USER
    ===================== */
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      institute,
      course,
      branch,
      year,
      semester,
      profileImage
    });

    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
};

/* =====================
   LOGIN USER
===================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    generateToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};
