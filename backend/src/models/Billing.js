import mongoose, { Schema } from 'mongoose';

const billing = new mongoose.Schema({
  courseId: {
    type: Schema.Types.ObjectId,
      ref: 'Course',
     },
  studentId: { type: Schema.Types.ObjectId,
      ref: 'User',
      },
  isApruved: Boolean,
  timeDuration: Date,
  billUrl: String
});

const Billing = mongoose.model('Billing', billing);

export default Billing;
