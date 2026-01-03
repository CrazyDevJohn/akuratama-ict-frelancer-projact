export const getAllLessons = async (req, res) => {
  try {
    const response = await Lesson.find({});
    return res.status(200).json(response);
  } catch (error) {
    console.log('Error fetching lessons', error);
    return res
      .status(500)
      .json({ message: 'Error fetching lessons', error: error.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const { title, resources, course } = req.body;

    const response = await Lesson.create({
      title,
      course,
      resources,
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

// todo - update and delete lesson controllers can be added here
