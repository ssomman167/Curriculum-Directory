import mongoose from "mongoose";

// MongoDB connection function
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_API_KEY_URI || "";
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
