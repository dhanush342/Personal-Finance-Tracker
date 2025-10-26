import Category from '../models/Category.js';
import Joi from 'joi';

// Validation schema
const categorySchema = Joi.object({
  name: Joi.string().trim().required(),
  icon: Joi.string(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  description: Joi.string().trim(),
  isDefault: Joi.boolean()
});

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get default categories
export const getDefaultCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDefault: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = new Category(value);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initialize default categories
export const initializeDefaultCategories = async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'Food', icon: '🍕', color: '#FF6B6B', isDefault: true },
      { name: 'Transportation', icon: '🚗', color: '#4ECDC4', isDefault: true },
      { name: 'Entertainment', icon: '🎬', color: '#95E1D3', isDefault: true },
      { name: 'Utilities', icon: '💡', color: '#FFE66D', isDefault: true },
      { name: 'Shopping', icon: '🛍️', color: '#FF6B9D', isDefault: true },
      { name: 'Health', icon: '⚕️', color: '#C44569', isDefault: true },
      { name: 'Education', icon: '📚', color: '#6C5CE7', isDefault: true },
      { name: 'Other', icon: '📁', color: '#808080', isDefault: true }
    ];

    const created = [];
    for (const cat of defaultCategories) {
      const existing = await Category.findOne({ name: cat.name });
      if (!existing) {
        const newCategory = new Category(cat);
        await newCategory.save();
        created.push(newCategory);
      }
    }

    res.json({
      message: `${created.length} default categories initialized`,
      categories: created
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
