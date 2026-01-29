import mongoose, { Schema } from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    courseEnrolled: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);
const User = mongoose.model('User', schema);
export default User;
