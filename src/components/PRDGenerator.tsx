import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Copy, Download, Save } from 'lucide-react';
import { PRD } from '../types/prd';
import PRDOutput from './PRDOutput';

interface PRDGeneratorProps {
  onSave: (prd: PRD) => void;
  template?: any;
  onBack: () => void;
}

const PRDGenerator: React.FC<PRDGeneratorProps> = ({ onSave, template, onBack }) => {
  const [formData, setFormData] = useState({
    problemStatement: '',
    targetAudience: '',
    goals: '',
    features: '',
    constraints: ''
  });
  
  const [generatedPRD, setGeneratedPRD] = useState<PRD | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (template) {
      setFormData(template.template);
    }
  }, [template]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePRD = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prd: PRD = {
      title: extractTitle(formData.problemStatement),
      problemStatement: formData.problemStatement,
      targetAudience: formData.targetAudience,
      goals: formData.goals,
      features: formData.features,
      constraints: formData.constraints,
      objectives: generateObjectives(formData.goals),
      userStories: generateUserStories(formData.targetAudience, formData.features),
      requirements: generateRequirements(formData.features),
      acceptanceCriteria: generateAcceptanceCriteria(formData.features),
      metrics: generateMetrics(formData.goals),
      risks: generateRisks(formData.constraints),
      createdAt: new Date()
    };
    
    setGeneratedPRD(prd);
    setIsGenerating(false);
  };

  const extractTitle = (problemStatement: string): string => {
    const words = problemStatement.split(' ').slice(0, 6);
    return words.length > 0 ? `PRD: ${words.join(' ')}...` : 'Product Requirement Document';
  };

  const generateObjectives = (goals: string): string[] => {
    return [
      `Deliver a solution that addresses: ${goals}`,
      'Ensure user adoption meets target metrics',
      'Maintain system performance and reliability',
      'Provide measurable business value'
    ];
  };

  const generateUserStories = (audience: string, features: string): string[] => {
    return [
      `As a ${audience}, I want to access the core functionality so that I can achieve my primary goal`,
      `As a ${audience}, I want the system to be intuitive so that I can use it without extensive training`,
      `As a ${audience}, I want reliable performance so that I can depend on the system for my workflow`,
      'As a stakeholder, I want clear metrics and feedback so that I can measure success'
    ];
  };

  const generateRequirements = (features: string): string[] => {
    return [
      'Functional Requirements:',
      `- Implement ${features}`,
      '- Ensure responsive design across devices',
      '- Provide user authentication and authorization',
      '- Include error handling and validation',
      '',
      'Non-Functional Requirements:',
      '- Page load time under 3 seconds',
      '- 99.9% uptime availability',
      '- WCAG 2.1 AA accessibility compliance',
      '- Mobile-first responsive design'
    ];
  };

  const generateAcceptanceCriteria = (features: string): string[] => {
    return [
      '✓ User can successfully complete the primary workflow',
      '✓ All form validations work correctly',
      '✓ Error messages are clear and actionable',
      '✓ Performance meets specified benchmarks',
      '✓ Mobile experience is fully functional',
      '✓ Accessibility requirements are met'
    ];
  };

  const generateMetrics = (goals: string): string[] => {
    return [
      'User Adoption: 80% of target users actively use the feature within 30 days',
      'Performance: Average task completion time reduced by 40%',
      'Quality: Less than 2% error rate in user workflows',
      'Satisfaction: 4.5+ star rating in user feedback',
      'Business Impact: Measurable improvement in key business metrics'
    ];
  };

  const generateRisks = (constraints: string): string[] => {
    return [
      `Technical Risk: ${constraints || 'Integration complexity with existing systems'}`,
      'Timeline Risk: Dependencies on external teams or resources',
      'User Adoption Risk: Change management and training requirements',
      'Business Risk: Market conditions or competitive pressure',
      'Security Risk: Data privacy and compliance considerations'
    ];
  };

  if (generatedPRD) {
    return (
      <PRDOutput 
        prd={generatedPRD}
        onSave={() => onSave(generatedPRD)}
        onBack={() => setGeneratedPRD(null)}
        onHome={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-beige-200">
      <div className="bg-primary-900 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-beige-300 hover:text-white transition-colors font-body"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold text-white font-sans">Create PRD</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-primary-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-2 font-sans">
              Document Your Product Requirements
            </h2>
            <p className="text-primary-600 font-body">
              Complete the sections below to create a structured Product Requirement Document.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2 font-sans">
                Scenario / Problem Statement *
              </label>
              <textarea
                value={formData.problemStatement}
                onChange={(e) => handleInputChange('problemStatement', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-olive-500 
                         focus:border-olive-500 resize-none transition-colors font-body bg-beige-50"
                placeholder="Describe the problem you're trying to solve or the opportunity you want to address..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2 font-sans">
                  Target Audience / Users *
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-olive-500 
                           focus:border-olive-500 transition-colors font-body bg-beige-50"
                  placeholder="Who will use this feature?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2 font-sans">
                  Goals / Outcomes *
                </label>
                <input
                  type="text"
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-olive-500 
                           focus:border-olive-500 transition-colors font-body bg-beige-50"
                  placeholder="What do you want to achieve?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2 font-sans">
                Features Needed *
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => handleInputChange('features', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-olive-500 
                         focus:border-olive-500 resize-none transition-colors font-body bg-beige-50"
                placeholder="List the key features and functionality needed..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2 font-sans">
                Constraints / Dependencies
              </label>
              <textarea
                value={formData.constraints}
                onChange={(e) => handleInputChange('constraints', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-olive-500 
                         focus:border-olive-500 resize-none transition-colors font-body bg-beige-50"
                placeholder="Any technical, time, or resource constraints..."
              />
            </div>

            <button
              type="button"
              onClick={generatePRD}
              disabled={!formData.problemStatement || !formData.targetAudience || !formData.goals || !formData.features || isGenerating}
              className="w-full bg-olive-700 hover:bg-olive-800 disabled:bg-primary-400 text-white px-6 py-4 rounded-lg 
                       text-lg font-semibold transition-colors flex items-center justify-center space-x-2 font-sans"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Document...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Create PRD</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PRDGenerator;