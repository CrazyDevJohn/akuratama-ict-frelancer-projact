import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    // lectures: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: 'Lecture',
    //   default: [],
    // },

    videoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
