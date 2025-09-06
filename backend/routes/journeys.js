const express = require('express');
const JourneyMap = require('../models/JourneyMap');
const auth = require('../middleware/auth');
const { validateJourneyMap } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/journeys
// @desc    Get all journey maps
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, persona, search } = req.query;
    
    const query = { userId: req.user._id, isArchived: false };
    
    if (persona) query.persona = persona;
    if (search) {
      query.$text = { $search: search };
    }

    const journeys = await JourneyMap.find(query)
      .populate('persona', 'name description')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await JourneyMap.countDocuments(query);

    res.json({
      success: true,
      data: {
        journeys,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get journeys error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching journey maps'
    });
  }
});

// @route   GET /api/journeys/:id
// @desc    Get a specific journey map
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const journey = await JourneyMap.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('persona', 'name description demographics');

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Journey map not found'
      });
    }

    res.json({
      success: true,
      data: { journey }
    });
  } catch (error) {
    console.error('Get journey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching journey map'
    });
  }
});

// @route   POST /api/journeys
// @desc    Create a new journey map
// @access  Private
router.post('/', auth, validateJourneyMap, async (req, res) => {
  try {
    const journeyData = {
      ...req.body,
      userId: req.user._id
    };

    const journey = new JourneyMap(journeyData);
    await journey.save();

    await journey.populate('persona', 'name description');

    res.status(201).json({
      success: true,
      message: 'Journey map created successfully',
      data: { journey }
    });
  } catch (error) {
    console.error('Create journey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating journey map'
    });
  }
});

// @route   PUT /api/journeys/:id
// @desc    Update a journey map
// @access  Private
router.put('/:id', auth, validateJourneyMap, async (req, res) => {
  try {
    const journey = await JourneyMap.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('persona', 'name description');

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Journey map not found'
      });
    }

    res.json({
      success: true,
      message: 'Journey map updated successfully',
      data: { journey }
    });
  } catch (error) {
    console.error('Update journey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating journey map'
    });
  }
});

// @route   DELETE /api/journeys/:id
// @desc    Delete (archive) a journey map
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const journey = await JourneyMap.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isArchived: true },
      { new: true }
    );

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Journey map not found'
      });
    }

    res.json({
      success: true,
      message: 'Journey map archived successfully'
    });
  } catch (error) {
    console.error('Delete journey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting journey map'
    });
  }
});

module.exports = router;