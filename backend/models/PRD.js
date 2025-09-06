const mongoose = require('mongoose');

const prdSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  problemStatement: {
    type: String,
    required: [true, 'Problem statement is required'],
    trim: true
  },
  targetAudience: {
    type: String,
    required: [true, 'Target audience is required'],
    trim: true
  },
  goals: {
    type: String,
    required: [true, 'Goals are required'],
    trim: true
  },
  features: {
    type: String,
    required: [true, 'Features are required'],
    trim: true
  },
  constraints: {
    type: String,
    trim: true
  },
  objectives: [{
    type: String,
    trim: true
  }],
  userStories: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  acceptanceCriteria: [{
    type: String,
    trim: true
  }],
  metrics: [{
    type: String,
    trim: true
  }],
  risks: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'review', 'approved', 'in-progress', 'completed'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  estimatedEffort: {
    type: String,
    enum: ['small', 'medium', 'large', 'xl'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'owner'],
      default: 'viewer'
    }
  }],
  version: {
    type: Number,
    default: 1
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better search performance
prdSchema.index({ userId: 1, createdAt: -1 });
prdSchema.index({ title: 'text', problemStatement: 'text' });
prdSchema.index({ tags: 1 });
prdSchema.index({ status: 1 });

module.exports = mongoose.model('PRD', prdSchema);