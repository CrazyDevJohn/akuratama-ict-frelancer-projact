import mongoose from 'mongoose';

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
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course',
      default: [],
    },
  },
  { timestamps: true },
);
const User = mongoose.model('User', schema);
export default User;
