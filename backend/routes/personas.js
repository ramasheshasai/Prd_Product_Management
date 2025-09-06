const express = require('express');
const UserPersona = require('../models/UserPersona');
const auth = require('../middleware/auth');
const { validateUserPersona } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/personas
// @desc    Get all user personas
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const query = { userId: req.user._id, isArchived: false };
    
    if (search) {
      query.$text = { $search: search };
    }

    const personas = await UserPersona.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await UserPersona.countDocuments(query);

    res.json({
      success: true,
      data: {
        personas,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get personas error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching personas'
    });
  }
});

// @route   GET /api/personas/:id
// @desc    Get a specific persona
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const persona = await UserPersona.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona not found'
      });
    }

    res.json({
      success: true,
      data: { persona }
    });
  } catch (error) {
    console.error('Get persona error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching persona'
    });
  }
});

// @route   POST /api/personas
// @desc    Create a new user persona
// @access  Private
router.post('/', auth, validateUserPersona, async (req, res) => {
  try {
    const personaData = {
      ...req.body,
      userId: req.user._id
    };

    const persona = new UserPersona(personaData);
    await persona.save();

    res.status(201).json({
      success: true,
      message: 'User persona created successfully',
      data: { persona }
    });
  } catch (error) {
    console.error('Create persona error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating persona'
    });
  }
});

// @route   PUT /api/personas/:id
// @desc    Update a user persona
// @access  Private
router.put('/:id', auth, validateUserPersona, async (req, res) => {
  try {
    const persona = await UserPersona.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona not found'
      });
    }

    res.json({
      success: true,
      message: 'Persona updated successfully',
      data: { persona }
    });
  } catch (error) {
    console.error('Update persona error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating persona'
    });
  }
});

// @route   DELETE /api/personas/:id
// @desc    Delete (archive) a persona
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const persona = await UserPersona.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isArchived: true },
      { new: true }
    );

    if (!persona) {
      return res.status(404).json({
        success: false,
        message: 'Persona not found'
      });
    }

    res.json({
      success: true,
      message: 'Persona archived successfully'
    });
  } catch (error) {
    console.error('Delete persona error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting persona'
    });
  }
});

module.exports = router;