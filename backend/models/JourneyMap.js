const mongoose = require('mongoose');

const journeyMapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Journey title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true
  },
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserPersona',
    required: true
  },
  scenario: {
    type: String,
    required: [true, 'Scenario is required'],
    trim: true
  },
  stages: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    touchpoints: [{
      type: String,
      trim: true
    }],
    actions: [{
      type: String,
      trim: true
    }],
    thoughts: [{
      type: String,
      trim: true
    }],
    emotions: [{
      emotion: {
        type: String,
        enum: ['happy', 'excited', 'neutral', 'frustrated', 'angry', 'confused', 'satisfied', 'disappointed'],
        required: true
      },
      intensity: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
      }
    }],
    painPoints: [{
      type: String,
      trim: true
    }],
    opportunities: [{
      type: String,
      trim: true
    }],
    duration: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  overallSentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  keyInsights: [{
    type: String,
    trim: true
  }],
  improvementAreas: [{
    type: String,
    trim: true
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better performance
journeyMapSchema.index({ userId: 1, createdAt: -1 });
journeyMapSchema.index({ persona: 1 });
journeyMapSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('JourneyMap', journeyMapSchema);