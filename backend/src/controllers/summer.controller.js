import Course from '../models/Course.js';
import Lessons from '../models/Lessons.js';
import Users from '../models/User.js';
import Billing from '../models/Billing.js';

export const getSummarys = async (req, res) => {
  try {
    const courses = await Course.find({});
    const lessons = await Lessons.find({});
    const users = await Users.find({});
    const billing = await Billing.find({});

    return res.status(200).json({
      courseCount: courses.length,
      lessonCount: lessons.length,
      userCount: users.length,
      requestCount: billing.length,
    });
  } catch (error) {
    console.log('error in create course', error);
    return res
      .status(500)
      .json({ message: 'error in create course', error: error });
  }
};
