import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap } from 'lucide-react';
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

  // 🔥 Call backend API instead of fake AI
  const generatePRD = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-prd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate PRD");

      const prd = await response.json();
      setGeneratedPRD(prd);
    } catch (err) {
      console.error(err);
      alert("Error generating PRD. Check console.");
    } finally {
      setIsGenerating(false);
    }
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
              Complete the sections below to create a structured Product Requirement Document with AI.
            </p>
          </div>

          <form className="space-y-6">
            <textarea
              value={formData.problemStatement}
              onChange={(e) => handleInputChange('problemStatement', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg font-body bg-beige-50"
              placeholder="Describe the problem you're trying to solve..."
            />
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg font-body bg-beige-50"
              placeholder="Who will use this feature?"
            />
            <input
              type="text"
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg font-body bg-beige-50"
              placeholder="What do you want to achieve?"
            />
            <textarea
              value={formData.features}
              onChange={(e) => handleInputChange('features', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg font-body bg-beige-50"
              placeholder="List the key features..."
            />
            <textarea
              value={formData.constraints}
              onChange={(e) => handleInputChange('constraints', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg font-body bg-beige-50"
              placeholder="Any constraints..."
            />

            <button
              type="button"
              onClick={generatePRD}
              disabled={isGenerating}
              className="w-full bg-olive-700 hover:bg-olive-800 text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-2 font-sans"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Document...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Create PRD with AI</span>
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
