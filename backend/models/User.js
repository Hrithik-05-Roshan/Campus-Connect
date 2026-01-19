import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["Student", "Teacher", "Admin"],
      default: "Student"
    },

    institute: {
      type: String
    },

    course: {
      type: String
    },

    branch: {
      type: String
    },

    year: {
      type: String
    },

    semester: {
      type: String
    },

    profileImage: {
      type: String,
      default: ""
    },

    points: {
      type: Number,
      default: 0
    },

    issuesSolved: {
      type: Number,
      default: 0
    },

    issuesRaised: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
