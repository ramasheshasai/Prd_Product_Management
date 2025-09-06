const express = require('express');
const PRD = require('../models/PRD');
const auth = require('../middleware/auth');
const { validatePRD } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/prds
// @desc    Get all PRDs for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search, tags } = req.query;
    
    // Build query
    const query = { userId: req.user._id, isArchived: false };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (tags) query.tags = { $in: tags.split(',') };
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const prds = await PRD.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('collaborators.user', 'name email');

    const total = await PRD.countDocuments(query);

    res.json({
      success: true,
      data: {
        prds,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get PRDs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching PRDs'
    });
  }
});

// @route   GET /api/prds/:id
// @desc    Get a specific PRD
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const prd = await PRD.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('collaborators.user', 'name email');

    if (!prd) {
      return res.status(404).json({
        success: false,
        message: 'PRD not found'
      });
    }

    res.json({
      success: true,
      data: { prd }
    });
  } catch (error) {
    console.error('Get PRD error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching PRD'
    });
  }
});

// @route   POST /api/prds
// @desc    Create a new PRD
// @access  Private
router.post('/', auth, validatePRD, async (req, res) => {
  try {
    const prdData = {
      ...req.body,
      userId: req.user._id
    };

    const prd = new PRD(prdData);
    await prd.save();

    res.status(201).json({
      success: true,
      message: 'PRD created successfully',
      data: { prd }
    });
  } catch (error) {
    console.error('Create PRD error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating PRD'
    });
  }
});

// @route   PUT /api/prds/:id
// @desc    Update a PRD
// @access  Private
router.put('/:id', auth, validatePRD, async (req, res) => {
  try {
    const prd = await PRD.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body, version: { $inc: 1 } },
      { new: true, runValidators: true }
    );

    if (!prd) {
      return res.status(404).json({
        success: false,
        message: 'PRD not found'
      });
    }

    res.json({
      success: true,
      message: 'PRD updated successfully',
      data: { prd }
    });
  } catch (error) {
    console.error('Update PRD error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating PRD'
    });
  }
});

// @route   DELETE /api/prds/:id
// @desc    Delete (archive) a PRD
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const prd = await PRD.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isArchived: true },
      { new: true }
    );

    if (!prd) {
      return res.status(404).json({
        success: false,
        message: 'PRD not found'
      });
    }

    res.json({
      success: true,
      message: 'PRD archived successfully'
    });
  } catch (error) {
    console.error('Delete PRD error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting PRD'
    });
  }
});

// @route   GET /api/prds/stats/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const stats = await Promise.all([
      PRD.countDocuments({ userId, isArchived: false }),
      PRD.countDocuments({ userId, status: 'draft', isArchived: false }),
      PRD.countDocuments({ userId, status: 'in-progress', isArchived: false }),
      PRD.countDocuments({ userId, status: 'completed', isArchived: false }),
      PRD.aggregate([
        { $match: { userId, isArchived: false } },
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        total: stats[0],
        draft: stats[1],
        inProgress: stats[2],
        completed: stats[3],
        byPriority: stats[4]
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;