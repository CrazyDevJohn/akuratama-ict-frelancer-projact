import Billing from '../models/Billing.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

export const billing = async (req, res) => {
  try {
    const file = req.file;
    const bill = JSON.parse(req.body.bill);

    const { courseId } = bill;

    const fileData = {
      courseId,
      studentId: req.user._id,
      isApruved: false,
      billUrl: file?.path || '',
      timeDuration: new Date().getDate(),
    };

    //   courseId: String,
    // studentId: String,
    // isApruved: Boolean,
    // timeDuration: Date,
    // billUrl: String

    const response = await Billing.create(fileData);

    console.log(response);

    return res.status(201).json({
      message: 'File uploaded!',
      fileData,
      response,
    });
  } catch (error) {
    console.log('error in file uploading ' + error);
    return res.status(500).json({ message: 'error in file upload!', error });
  }
};

export const aprualCourse = async (req, res) => {
  try {
    const { courseId, studentId, billingId } = req.body;
    const { _id, isAdmin } = req.user;
    console.log(courseId, _id, isAdmin, studentId, billingId);

    if (!courseId || !_id || !isAdmin || !studentId || !billingId) {
      return res
        .status(400)
        .json({ message: 'Something went wrong, contact the admin first!!' });
    }

    const response = await Billing.findByIdAndUpdate(billingId, {
      isApruved: true,
    });

    const student = await User.findById(studentId);

    const userData = await User.findByIdAndUpdate(studentId, {
      courseEnrolled: [...student.courseEnrolled, courseId],
    });

    return res
      .status(200)
      .json({ message: 'request apruved' }, response, userData);
  } catch (error) {
    return res.status(500).json({ message: 'error in aprual course', error });
  }
};

export const getAllPandingequests = async (req, res) => {
  try {
    const { isAdmin } = req.user;

    console.log(req.user);

    if (!isAdmin) {
      return res.status(503).json({ message: 'You Not A Admin!' });
    }

    const response = await Billing.find({ isApruved: false });

    return res
      .status(200)
      .json({ message: 'All th non apruved requests', requests: response });
  } catch (error) {
    console.log('error in get all panding requests');
    return res
      .status(500)
      .json({ message: 'error in get all panding requests', error });
  }
};
