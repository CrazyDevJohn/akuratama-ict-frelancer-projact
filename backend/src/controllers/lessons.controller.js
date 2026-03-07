import Lecture from '../models/Lectures.js';
import Lesson from '../models/Lessons.js';

export const getAllLessonsByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const response = await Lesson.find({ courseId })
      .sort({ pageNumber: 1 })
      .populate('lectures')
      .sort({ pageNumber: 1 });
    return res.status(200).json(response);
  } catch (error) {
    console.log('Error fetching lessons', error);
    return res
      .status(500)
      .json({ message: 'Error fetching lessons', error: error.message });
  }
};

export const getAllLessons = async (req, res) => {
  try {
    const response = await Lesson.find();

    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log('Error fetching lesson', error);
    return res
      .status(500)
      .json({ message: 'Error fetching lesson', error: error.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const {
      title,
      description,
      pageNumber,
      /**lectures, */ videoUrl,
      courseId,
    } = req.body;

    console.log('Received data for creating lesson:', {
      title,
      description,
      pageNumber,
      // lectures,
      videoUrl,
      courseId,
    });

    // console.log('Creating lesson with data:', {
    //   title,
    //   description,
    //   pageNumber,
    //   lectures,
    //   courseId,
    // });

    // const lecturesRes = await Lecture.insertMany(lectures);
    // console.log('Lecture created', lecturesRes);

    const response = await Lesson.create({
      title,
      description,
      pageNumber,
      // lectures: lecturesRes.map((lecture) => lecture._id),
      videoUrl,
      courseId,
    });

    console.log('Lesson created', response);

    return res
      .status(201)
      .json({ message: 'Lesson created successfully', lesson: response });
  } catch (error) {
    console.log('Error creating lesson', error);
    return res
      .status(500)
      .json({ message: 'Error creating lesson', error: error.message });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { title, description, pageNumber, resources } = req.body;

    const response = await Lecture.create({
      title,
      description,
      pageNumber,
      resources,
    });
    console.log('Lecture created', response);

    return res
      .status(201)
      .json({ message: 'Lecture created successfully', lessons: response });
  } catch (error) {
    console.log('Error creating lecture', error);
    return res
      .status(500)
      .json({ message: 'Error creating lecture', error: error.message });
  }
};
