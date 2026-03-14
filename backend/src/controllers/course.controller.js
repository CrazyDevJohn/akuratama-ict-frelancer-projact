import Course from '../models/Course.js';
import Lesson from '../models/Lessons.js';

export const health = (req, res) => {
  res.status(200).json({ status: 'Course service is healthy' });
};

export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});

    return res.status(200).json({
      courses: allCourses,
    });
  } catch (error) {
    console.log('error in getting all courses', error);
    return res
      .status(500)
      .json({ message: 'error in getting all courses', error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: 'Course id is required' });
    }

    console.log(`find by course id: ${id}`);

    const response = await Course.findById(id).populate('lessons');

    // const response = await Lesson.find({ courseId: id });

    if (response) {
      return res
        .status(200)
        .json({ course: response, mesage: 'Course founded!' });
    }

    return res.status(404).json({ mesage: 'Course Not founded!' });
  } catch (error) {
    console.log('error in getting course by id', error);
    return res
      .status(500)
      .json({ message: 'error in getting course by id', error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      grade,
      image,
      lessons,
      modules,
      duration,
      features = [],
      assets = [],
    } = req.body;

    const response = await Course.create({
      title,
      description,
      price,
      grade,
      image: image || '',
      assets,
      lessons,
      modules,
      duration,
      features,
    });
    console.log('course created', response);

    res
      .status(201)
      .json({ message: 'Course created successfully', course: response });
  } catch (error) {
    console.log('error in create course', error);
    return res
      .status(500)
      .json({ message: 'error in create course', error: error.message });
  }
};

export const allEnrolled = async (req, res) => {
  try {
    const { _id, courseEnrolled } = req.user;

    const allCourses = await Course.find().where('_id').in(courseEnrolled);

    return res
      .status(200)
      .json({ message: 'Course successfully', course: allCourses });
  } catch (error) {
    console.log('error in getting enrolled course', error);
    return res.status(500).json({
      message: 'error in getting enrolled course',
      error: error.message,
    });
  }
};

// todo - update and delete course controllers can be added here
