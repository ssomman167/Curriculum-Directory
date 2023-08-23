import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export default userSchema;
