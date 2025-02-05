const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true, // `unique` already creates an index
      match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number"],
      trim: true,
    },
    email: {
      type: String,
      unique: true, // `unique` already creates an index
      lowercase: true,
      trim: true,
      sparse: true, // Allows null values (optional field)
      match: [
        /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email address",
      ],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["passenger", "driver", "admin"],
      default: "passenger",
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// ❌ Removed duplicate index definitions (They were unnecessary)

module.exports = mongoose.model("User", UserSchema);
