const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const UserPersona = require('../models/UserPersona');
const PRD = require('../models/PRD');
const JourneyMap = require('../models/JourneyMap');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await UserPersona.deleteMany({});
    await PRD.deleteMany({});
    await JourneyMap.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = await User.create({
      name: 'John Product Manager',
      email: 'pm@example.com',
      password: hashedPassword,
      role: 'user'
    });

    console.log('👤 Created sample user');

    // Create sample personas
    const personas = await UserPersona.create([
      {
        name: 'Sarah the Busy Professional',
        description: 'A working professional who values efficiency and time-saving solutions',
        demographics: {
          age: { min: 28, max: 35 },
          gender: 'Female',
          location: 'Urban areas',
          occupation: 'Marketing Manager',
          income: '$60,000 - $80,000',
          education: 'Bachelor\'s degree'
        },
        psychographics: {
          personality: ['Goal-oriented', 'Tech-savvy', 'Time-conscious'],
          values: ['Efficiency', 'Quality', 'Work-life balance'],
          interests: ['Productivity tools', 'Career development', 'Fitness'],
          lifestyle: 'Fast-paced urban lifestyle'
        },
        goals: [
          'Complete tasks efficiently',
          'Maintain work-life balance',
          'Stay organized and productive'
        ],
        frustrations: [
          'Wasting time on inefficient processes',
          'Complex interfaces',
          'Lack of integration between tools'
        ],
        motivations: [
          'Career advancement',
          'Personal efficiency',
          'Recognition for achievements'
        ],
        techSavviness: 'advanced',
        preferredChannels: ['email', 'push', 'in-app'],
        painPoints: [
          'Too many tools to manage',
          'Inconsistent user experiences',
          'Time-consuming manual processes'
        ],
        behaviorPatterns: [
          'Checks phone frequently throughout the day',
          'Prefers mobile-first experiences',
          'Values quick, actionable insights'
        ],
        quote: 'I need tools that work as hard as I do and don\'t waste my time.',
        userId: user._id,
        tags: ['professional', 'efficiency', 'mobile-first']
      },
      {
        name: 'Mike the Tech Enthusiast',
        description: 'An early adopter who loves trying new technologies and features',
        demographics: {
          age: { min: 22, max: 30 },
          gender: 'Male',
          location: 'Tech hubs',
          occupation: 'Software Developer',
          income: '$70,000 - $100,000',
          education: 'Computer Science degree'
        },
        psychographics: {
          personality: ['Curious', 'Analytical', 'Detail-oriented'],
          values: ['Innovation', 'Technical excellence', 'Continuous learning'],
          interests: ['Latest tech trends', 'Open source', 'Gaming'],
          lifestyle: 'Digital-first lifestyle'
        },
        goals: [
          'Stay ahead of technology trends',
          'Build efficient workflows',
          'Contribute to tech community'
        ],
        frustrations: [
          'Outdated technology',
          'Poor API documentation',
          'Lack of customization options'
        ],
        motivations: [
          'Technical mastery',
          'Problem-solving',
          'Community recognition'
        ],
        techSavviness: 'expert',
        preferredChannels: ['in-app', 'email', 'social'],
        painPoints: [
          'Limited customization',
          'Poor developer experience',
          'Lack of advanced features'
        ],
        behaviorPatterns: [
          'Explores all features thoroughly',
          'Provides detailed feedback',
          'Shares experiences with community'
        ],
        quote: 'Give me the power to customize and I\'ll build something amazing.',
        userId: user._id,
        tags: ['developer', 'early-adopter', 'technical']
      }
    ]);

    console.log('🎭 Created sample personas');

    // Create sample PRDs
    const prds = await PRD.create([
      {
        title: 'Mobile App Push Notifications Enhancement',
        problemStatement: 'Users are missing important updates because our current notification system is not personalized and often sends irrelevant information, leading to notification fatigue and decreased engagement.',
        targetAudience: 'Mobile app users who want to stay informed about relevant updates',
        goals: 'Increase notification engagement by 40% and reduce unsubscribe rate by 25%',
        features: 'Smart notification categorization, personalized timing, user preference controls, and rich media support',
        constraints: 'Must work across iOS and Android, respect battery life, and comply with platform guidelines',
        objectives: [
          'Implement intelligent notification categorization',
          'Add user preference controls',
          'Optimize delivery timing based on user behavior',
          'Support rich media content in notifications'
        ],
        userStories: [
          'As a busy professional, I want to receive notifications at optimal times so that I don\'t get distracted during important meetings',
          'As a user, I want to categorize my notifications so that I only see what\'s relevant to me',
          'As a mobile user, I want rich notifications with images and actions so that I can respond quickly without opening the app'
        ],
        requirements: [
          'Functional Requirements:',
          '• Smart categorization algorithm',
          '• User preference dashboard',
          '• Timing optimization engine',
          '• Rich media support',
          '',
          'Non-Functional Requirements:',
          '• 99.9% delivery reliability',
          '• Sub-second processing time',
          '• GDPR compliance',
          '• Cross-platform compatibility'
        ],
        acceptanceCriteria: [
          'Users can set notification preferences by category',
          'System learns optimal delivery times for each user',
          'Rich notifications display correctly on all devices',
          'Notification engagement increases by target percentage'
        ],
        metrics: [
          'Notification open rate: Target 40% increase',
          'User retention: Maintain 95%+ retention',
          'Unsubscribe rate: Reduce by 25%',
          'User satisfaction score: Above 4.2/5'
        ],
        risks: [
          'Platform policy changes may affect implementation',
          'User privacy concerns about behavior tracking',
          'Technical complexity of cross-platform implementation'
        ],
        status: 'in-progress',
        priority: 'high',
        estimatedEffort: 'large',
        tags: ['mobile', 'notifications', 'engagement'],
        userId: user._id
      },
      {
        title: 'Dashboard Analytics Redesign',
        problemStatement: 'Current analytics dashboard is overwhelming and doesn\'t provide actionable insights, causing users to struggle with data interpretation and decision-making.',
        targetAudience: 'Business users and analysts who need to make data-driven decisions',
        goals: 'Improve user task completion rate by 50% and reduce time-to-insight by 60%',
        features: 'Simplified interface, interactive visualizations, automated insights, and customizable widgets',
        constraints: 'Must maintain all existing functionality while improving usability and performance',
        objectives: [
          'Redesign dashboard with user-centered approach',
          'Implement automated insight generation',
          'Add customizable widget system',
          'Improve data visualization clarity'
        ],
        userStories: [
          'As a business analyst, I want automated insights so that I can quickly identify trends without manual analysis',
          'As a manager, I want customizable dashboards so that I can focus on metrics relevant to my team',
          'As a new user, I want an intuitive interface so that I can understand the data without extensive training'
        ],
        requirements: [
          'Functional Requirements:',
          '• Drag-and-drop widget customization',
          '• Automated insight engine',
          '• Interactive chart components',
          '• Export and sharing capabilities',
          '',
          'Performance Requirements:',
          '• Load time under 3 seconds',
          '• Support for 100+ concurrent users',
          '• Real-time data updates',
          '• Mobile responsive design'
        ],
        acceptanceCriteria: [
          'Users can customize dashboard layout',
          'Automated insights are generated for key metrics',
          'All charts are interactive and responsive',
          'Export functionality works for all data views'
        ],
        metrics: [
          'Task completion rate: 50% improvement',
          'Time-to-insight: 60% reduction',
          'User satisfaction: Above 4.5/5',
          'Dashboard usage frequency: 30% increase'
        ],
        risks: [
          'Data migration complexity',
          'User adoption of new interface',
          'Performance impact of real-time features'
        ],
        status: 'draft',
        priority: 'medium',
        estimatedEffort: 'medium',
        tags: ['analytics', 'dashboard', 'ux'],
        userId: user._id
      }
    ]);

    console.log('📋 Created sample PRDs');

    // Create sample journey maps
    const journeyMaps = await JourneyMap.create([
      {
        title: 'New User Onboarding Journey',
        description: 'Complete journey of a new user from signup to first successful task completion',
        persona: personas[0]._id,
        scenario: 'Sarah discovers our app through a colleague recommendation and wants to get started quickly',
        stages: [
          {
            name: 'Discovery',
            description: 'User learns about the product',
            touchpoints: ['Website', 'App Store', 'Word of mouth'],
            actions: ['Searches for solution', 'Reads reviews', 'Compares alternatives'],
            thoughts: ['Is this the right tool for me?', 'What makes this different?'],
            emotions: [{ emotion: 'curious', intensity: 3 }],
            painPoints: ['Too many options to choose from', 'Unclear value proposition'],
            opportunities: ['Clear differentiation', 'Social proof'],
            duration: '2-3 days',
            order: 1
          },
          {
            name: 'Sign Up',
            description: 'User creates an account',
            touchpoints: ['Landing page', 'Sign up form'],
            actions: ['Clicks sign up', 'Fills form', 'Verifies email'],
            thoughts: ['This better be worth it', 'Hope it\'s not complicated'],
            emotions: [{ emotion: 'neutral', intensity: 3 }],
            painPoints: ['Long sign up form', 'Email verification delay'],
            opportunities: ['Streamlined process', 'Social login options'],
            duration: '5 minutes',
            order: 2
          },
          {
            name: 'First Use',
            description: 'User explores the interface for the first time',
            touchpoints: ['App interface', 'Onboarding flow'],
            actions: ['Explores features', 'Follows tutorial', 'Attempts first task'],
            thoughts: ['Where do I start?', 'This looks complex'],
            emotions: [{ emotion: 'confused', intensity: 4 }],
            painPoints: ['Overwhelming interface', 'Unclear next steps'],
            opportunities: ['Progressive disclosure', 'Guided tour'],
            duration: '15 minutes',
            order: 3
          },
          {
            name: 'First Success',
            description: 'User completes their first meaningful task',
            touchpoints: ['Core features', 'Success confirmation'],
            actions: ['Completes task', 'Sees results', 'Shares achievement'],
            thoughts: ['This actually works!', 'I can see the value'],
            emotions: [{ emotion: 'satisfied', intensity: 4 }],
            painPoints: ['Took longer than expected'],
            opportunities: ['Celebrate success', 'Suggest next steps'],
            duration: '10 minutes',
            order: 4
          }
        ],
        overallSentiment: 'neutral',
        keyInsights: [
          'Users need clearer guidance during first use',
          'Success moments should be celebrated',
          'Onboarding is critical for retention'
        ],
        improvementAreas: [
          'Simplify initial interface',
          'Add progressive onboarding',
          'Improve success feedback'
        ],
        userId: user._id,
        tags: ['onboarding', 'new-user', 'ux']
      }
    ]);

    console.log('🗺️ Created sample journey maps');

    console.log('✅ Sample data created successfully!');
    console.log('\n📧 Login credentials:');
    console.log('Email: pm@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the seed function
connectDB().then(() => {
  seedData();
});