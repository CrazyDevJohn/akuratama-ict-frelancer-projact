import Categories from '../models/Categories.js';

export const health = (req, res) => {
  res.status(200).json({ status: 'Categories service is healthy' });
};

export const getAllCategories = async (req, res) => {
  try {
    // Logic to get all categories
    const response = await Categories.find({});

    console.log(response);
    res.status(200).json({ categories: response });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    // Logic to create a new category

    const { name } = req.body;
    const response = await Categories.create({ name });
    console.log(response);

    return res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: error.message });
  }
};

// todo - update and delete category controllers can be added here
