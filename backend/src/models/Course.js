import { model, Schema } from 'mongoose';

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: Number,
    grade: String,
    image: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
    },
    studentsEnrolled: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    modules: String,
    lessons: String,
    duration: String,
    certificate: String,

    assets: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Course = model('Course', courseSchema);
export default Course;
