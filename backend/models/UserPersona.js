const mongoose = require('mongoose');

const userPersonaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Persona name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  demographics: {
    age: {
      min: Number,
      max: Number
    },
    gender: String,
    location: String,
    occupation: String,
    income: String,
    education: String
  },
  psychographics: {
    personality: [String],
    values: [String],
    interests: [String],
    lifestyle: String
  },
  goals: [{
    type: String,
    trim: true
  }],
  frustrations: [{
    type: String,
    trim: true
  }],
  motivations: [{
    type: String,
    trim: true
  }],
  techSavviness: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  preferredChannels: [{
    type: String,
    enum: ['email', 'sms', 'push', 'social', 'phone', 'in-app']
  }],
  painPoints: [{
    type: String,
    trim: true
  }],
  behaviorPatterns: [{
    type: String,
    trim: true
  }],
  quote: {
    type: String,
    trim: true,
    maxlength: [500, 'Quote cannot exceed 500 characters']
  },
  avatar: {
    type: String, // URL to avatar image
    trim: true
  },
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
userPersonaSchema.index({ userId: 1, createdAt: -1 });
userPersonaSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('UserPersona', userPersonaSchema);