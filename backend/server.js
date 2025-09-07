require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const prdRoutes = require('./routes/prds');
const personaRoutes = require('./routes/personas');
const journeyRoutes = require('./routes/journeys');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Security middleware
app.use(helmet());

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// ✅ CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// ✅ Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Logging middleware (only in dev)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PRD Studio API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/prds', prdRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/journeys', journeyRoutes);

// ✅ Legacy PRD generation (kept as fallback)
app.post('/api/generate-prd', async (req, res) => {
  try {
    const { problemStatement, targetAudience, goals, features, constraints } = req.body;

    if (!problemStatement || !targetAudience || !goals) {
      return res.status(400).json({ 
        error: 'Missing required fields: problemStatement, targetAudience, and goals are required' 
      });
    }

    const simulatedPRD = {
      title: `PRD: ${problemStatement.split(' ').slice(0, 5).join(' ')}...`,
      problemStatement,
      targetAudience,
      goals,
      features,
      constraints,
      objectives: [
        `Solve the core problem: ${problemStatement.split('.')[0]}`,
        `Deliver value to ${targetAudience}`,
        `Achieve measurable impact: ${goals}`,
        'Ensure scalable and maintainable solution'
      ],
      userStories: [
        `As a ${targetAudience}, I want to ${features?.split(',')[0] || 'use the new feature'} so that I can achieve my goals more efficiently`,
        `As a ${targetAudience}, I need clear feedback when using the feature so that I understand the system status`,
        `As a ${targetAudience}, I want the feature to be accessible on all devices so that I can use it anywhere`
      ],
      requirements: [
        'Functional Requirements:',
        `• ${features || 'Define features clearly'}`,
        '',
        'Non-Functional Requirements:',
        '• Performance: Load time under 2 seconds',
        '• Accessibility: WCAG 2.1 AA compliance',
        '• Security: Data encryption and secure authentication',
        '• Scalability: Support for 10x current user base',
        '',
        'Technical Requirements:',
        '• Mobile-responsive design',
        '• Cross-browser compatibility',
        '• API integration capabilities',
        '• Real-time data synchronization'
      ],
      acceptanceCriteria: [
        'Feature functions as described in requirements',
        'All user stories are successfully completed',
        'Performance benchmarks are met',
        'Security requirements are validated',
        'Accessibility standards are achieved',
        'User testing shows positive feedback'
      ],
      metrics: [
        'User adoption rate: 70% within first month',
        'Task completion time: Reduced by 40%',
        'User satisfaction score: Above 4.5/5',
        'Error rate: Less than 1%',
        'Support ticket reduction: 30%',
        'Feature usage frequency: Daily active usage'
      ],
      risks: [
        'Technical complexity may extend development timeline',
        'User adoption might be slower than expected',
        'Integration with existing systems could face compatibility issues',
        'Resource constraints may impact feature scope',
        'Market conditions could affect priority and timeline'
      ],
      createdAt: new Date()
    };

    res.json(simulatedPRD);

  } catch (error) {
    console.error('Error generating PRD:', error);
    res.status(500).json({ error: 'Failed to generate PRD' });
  }
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 PRD Studio API ready`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
