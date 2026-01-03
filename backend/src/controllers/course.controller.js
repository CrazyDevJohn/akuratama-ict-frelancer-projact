import Course from '../models/Course.js';

export const health = (req, res) => {
  res.status(200).json({ status: 'Course service is healthy' });
};

export const getAllCourses = (req, res) => {
  // Logic to get all courses
  res.status(200).json({ courses: [] });
};

export const getCoursesByCategory = (req, res) => {
  const { category } = req.params;
  // Logic to get courses by category
  res.status(200).json({ category, courses: [] });
};

export const getCourseById = (req, res) => {
  const { id } = req.params;

  res.status(200).json({ course: { id } });
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;

    const response = await Course.create({
      title,
      description,
      category,
      author,
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

// todo - update and delete course controllers can be added here
