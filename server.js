import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key', // Use demo key for testing
});

// PRD Generation endpoint
app.post('/api/generate-prd', async (req, res) => {
  try {
    const { problemStatement, targetAudience, goals, features, constraints } = req.body;

    // Validate required fields
    if (!problemStatement || !targetAudience || !goals) {
      return res.status(400).json({ 
        error: 'Missing required fields: problemStatement, targetAudience, and goals are required' 
      });
    }

    // For demo purposes, we'll simulate AI generation
    // In production, you would use the OpenAI API
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
        `As a ${targetAudience}, I want to ${features.split(',')[0] || 'use the new feature'} so that I can achieve my goals more efficiently`,
        `As a ${targetAudience}, I need clear feedback when using the feature so that I understand the system status`,
        `As a ${targetAudience}, I want the feature to be accessible on all devices so that I can use it anywhere`
      ],
      requirements: [
        'Functional Requirements:',
        `• ${features}`,
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

    // If OpenAI API key is available, use real AI generation
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'demo-key') {
      try {
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert product manager. Generate a complete PRD based on the input. 
              Return a JSON object with these exact fields:
              - title (string)
              - problemStatement (string) 
              - targetAudience (string)
              - goals (string)
              - features (string)
              - constraints (string)
              - objectives (array of strings)
              - userStories (array of strings)
              - requirements (array of strings)
              - acceptanceCriteria (array of strings)
              - metrics (array of strings)
              - risks (array of strings)
              - createdAt (ISO date string)
              
              Make it comprehensive and professional.`
            },
            {
              role: "user",
              content: `Create a PRD for:
              Problem: ${problemStatement}
              Target Audience: ${targetAudience}
              Goals: ${goals}
              Features: ${features}
              Constraints: ${constraints}`
            }
          ],
          temperature: 0.7,
        });

        const aiResponse = completion.choices[0].message?.content?.trim();
        if (aiResponse) {
          try {
            const aiPRD = JSON.parse(aiResponse);
            aiPRD.createdAt = new Date();
            return res.json(aiPRD);
          } catch (parseError) {
            console.log('AI response parsing failed, using simulated PRD');
          }
        }
      } catch (aiError) {
        console.log('OpenAI API call failed, using simulated PRD');
      }
    }

    // Return simulated PRD
    res.json(simulatedPRD);

  } catch (error) {
    console.error('Error generating PRD:', error);
    res.status(500).json({ error: 'Failed to generate PRD' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PRD Generator API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 PRD Generator API ready`);
});