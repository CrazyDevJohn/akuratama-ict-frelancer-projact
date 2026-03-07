import { Schema, model } from 'mongoose';

const lectureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pageNumber: {
      type: String,
      required: true,
    },
    resources: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Lecture = model('Lecture', lectureSchema);
export default Lecture;
