import React from 'react';
import { ArrowLeft, FileText, Sparkles, Bug, Rocket } from 'lucide-react';
import { PRDTemplate } from '../types/prd';

interface TemplatesProps {
  onSelectTemplate: (template: PRDTemplate) => void;
  onBack: () => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate, onBack }) => {
  const templates: PRDTemplate[] = [
    {
      id: 'new-feature',
      name: 'New Feature PRD',
      description: 'Template for introducing a brand new feature to your product',
      category: 'new-feature',
      template: {
        problemStatement: 'Users are struggling with [specific pain point] because our current product lacks [capability]. This is impacting user satisfaction and potentially leading to churn.',
        targetAudience: 'Primary users who need [specific functionality]',
        goals: 'Increase user engagement by 25% and reduce task completion time by 40%',
        features: 'Core functionality including [feature 1], [feature 2], user interface, notifications, and analytics tracking',
        constraints: 'Must integrate with existing systems, maintain current performance standards, and be accessible on mobile devices'
      }
    },
    {
      id: 'enhancement',
      name: 'Enhancement PRD',
      description: 'Template for improving existing features or functionality',
      category: 'enhancement',
      template: {
        problemStatement: 'The current [feature/functionality] is not meeting user expectations based on feedback and usage analytics. Users report [specific issues] which is affecting their workflow efficiency.',
        targetAudience: 'Existing users who regularly use [current feature]',
        goals: 'Improve user satisfaction scores by 30% and reduce support tickets by 50%',
        features: 'Enhanced user interface, improved performance, better error handling, and additional customization options',
        constraints: 'Cannot break existing functionality, must maintain backward compatibility, limited development resources'
      }
    },
    {
      id: 'bug-fix',
      name: 'Bug Fix PRD',
      description: 'Template for critical bug fixes and stability improvements',
      category: 'bug-fix',
      template: {
        problemStatement: 'Critical bug identified in [system/feature] causing [specific impact] for users. This is affecting [percentage] of our user base and needs immediate attention.',
        targetAudience: 'All users affected by the current bug',
        goals: 'Eliminate the bug completely and prevent similar issues in the future',
        features: 'Bug identification, root cause analysis, fix implementation, testing, and monitoring',
        constraints: 'Must be deployed within [timeframe], minimal disruption to users, thorough testing required'
      }
    },
    {
      id: 'mvp',
      name: 'MVP PRD',
      description: 'Template for building a Minimum Viable Product',
      category: 'mvp',
      template: {
        problemStatement: 'We need to validate our product hypothesis by building and testing a minimum viable product that solves [core problem] for [target users].',
        targetAudience: 'Early adopters and potential customers who face [specific problem]',
        goals: 'Validate product-market fit, gather user feedback, and prove business viability',
        features: 'Core essential features only: user authentication, basic functionality, feedback collection, and analytics',
        constraints: 'Limited budget and timeline, focus on core value proposition, prepare for rapid iteration based on feedback'
      }
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'new-feature':
        return <Sparkles className="h-6 w-6 text-blue-600" />;
      case 'enhancement':
        return <FileText className="h-6 w-6 text-green-600" />;
      case 'bug-fix':
        return <Bug className="h-6 w-6 text-red-600" />;
      case 'mvp':
        return <Rocket className="h-6 w-6 text-purple-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const getBackgroundColor = (category: string) => {
    switch (category) {
      case 'new-feature':
        return 'from-blue-50 to-blue-100 border-blue-200';
      case 'enhancement':
        return 'from-green-50 to-green-100 border-green-200';
      case 'bug-fix':
        return 'from-red-50 to-red-100 border-red-200';
      case 'mvp':
        return 'from-purple-50 to-purple-100 border-purple-200';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">PRD Templates</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a Template</h2>
          <p className="text-gray-600">
            Start with a proven structure for your PRD. These templates include common sections and prompts
            to help you create comprehensive documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`bg-gradient-to-br ${getBackgroundColor(template.category)} border rounded-xl p-6 
                       hover:shadow-lg transition-all cursor-pointer transform hover:scale-105`}
              onClick={() => onSelectTemplate(template)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getIcon(template.category)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {template.category.replace('-', ' ')}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                      Use Template →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 border">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            What's included in every template?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TemplateFeature 
              title="Problem Statement"
              description="Clear definition of the issue you're solving"
            />
            <TemplateFeature 
              title="User Stories"
              description="Structured user scenarios and requirements"
            />
            <TemplateFeature 
              title="Success Metrics"
              description="Measurable outcomes and KPIs"
            />
            <TemplateFeature 
              title="Acceptance Criteria"
              description="Clear definition of done"
            />
            <TemplateFeature 
              title="Risk Assessment"
              description="Potential challenges and mitigation strategies"
            />
            <TemplateFeature 
              title="Dependencies"
              description="Required resources and constraints"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TemplateFeatureProps {
  title: string;
  description: string;
}

const TemplateFeature: React.FC<TemplateFeatureProps> = ({ title, description }) => {
  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default Templates;