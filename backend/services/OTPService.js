const axios = require("axios"); 
const dotenv = require("dotenv");
dotenv.config();

const otpStore = {}; // Temporary storage for OTPs (use Redis for production)

// 🟢 Generate OTP (4-digit random number)
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// 🟢 Send OTP to Mobile Number
const sendOTP = async (mobileNumber) => {
    try {
        const otp = generateOTP();
        otpStore[mobileNumber] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP expires in 5 mins
        
        console.log("Generated OTP:", otp); // ✅ This will display OTP in the backend console

        return true; // Simulating successful OTP sent
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        return false;
    }
};

// 🟢 Verify OTP (Check if OTP is valid)
const verifyOTP = (mobileNumber, userOTP) => {
    const otpData = otpStore[mobileNumber];

    if (!otpData) return false; // No OTP found
    if (Date.now() > otpData.expiresAt) {
        delete otpStore[mobileNumber]; // Expired OTP
        return false;
    }
    if (otpData.otp === userOTP) {
        delete otpStore[mobileNumber]; // OTP used, delete it
        return true;
    }
    return false;
};

// Export functions
module.exports = { sendOTP, verifyOTP };
