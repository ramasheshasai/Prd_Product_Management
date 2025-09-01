import React, { useState } from 'react';
import { ArrowLeft, Copy, Download, Save, Home, Check } from 'lucide-react';
import { PRD } from '../types/prd';

interface PRDOutputProps {
  prd: PRD;
  onSave: () => void;
  onBack: () => void;
  onHome: () => void;
}

const PRDOutput: React.FC<PRDOutputProps> = ({ prd, onSave, onBack, onHome }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copyToClipboard = async () => {
    const prdText = formatPRDAsText(prd);
    await navigator.clipboard.writeText(prdText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const downloadPRD = () => {
    const prdText = formatPRDAsText(prd);
    const blob = new Blob([prdText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prd.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatPRDAsText = (prd: PRD): string => {
    return `
${prd.title}
${'='.repeat(prd.title.length)}

PROBLEM STATEMENT
${prd.problemStatement}

TARGET AUDIENCE
${prd.targetAudience}

OBJECTIVES & GOALS
${prd.objectives.map(obj => `• ${obj}`).join('\n')}

USER STORIES
${prd.userStories.map(story => `• ${story}`).join('\n')}

FEATURES & REQUIREMENTS
${prd.requirements.map(req => `• ${req}`).join('\n')}

ACCEPTANCE CRITERIA
${prd.acceptanceCriteria.map(criteria => `• ${criteria}`).join('\n')}

METRICS OF SUCCESS
${prd.metrics.map(metric => `• ${metric}`).join('\n')}

RISKS & DEPENDENCIES
${prd.risks.map(risk => `• ${risk}`).join('\n')}

Generated on: ${prd.createdAt.toLocaleDateString()}
    `.trim();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Edit</span>
              </button>
              <button 
                onClick={onHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg 
                         hover:bg-gray-50 transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={downloadPRD}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg 
                         hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                         text-white rounded-lg transition-colors"
              >
                {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                <span>{saved ? 'Saved!' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRD Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <PRDDocument prd={prd} />
        </div>
      </div>
    </div>
  );
};

interface PRDDocumentProps {
  prd: PRD;
}

const PRDDocument: React.FC<PRDDocumentProps> = ({ prd }) => {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-100 pb-4">
        {prd.title}
      </h1>
      
      <Section title="Problem Statement">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <p className="text-gray-700 leading-relaxed">{prd.problemStatement}</p>
        </div>
      </Section>

      <Section title="Target Audience">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-gray-700">{prd.targetAudience}</p>
        </div>
      </Section>

      <Section title="Objectives & Goals">
        <ul className="space-y-3">
          {prd.objectives.map((objective, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <span className="text-gray-700 leading-relaxed">{objective}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="User Stories">
        <div className="space-y-4">
          {prd.userStories.map((story, index) => (
            <div key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  US{index + 1}
                </div>
                <p className="text-gray-700 italic leading-relaxed">{story}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Features & Requirements">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <div className="space-y-2">
            {prd.requirements.map((requirement, index) => (
              <div key={index} className="text-gray-700">
                {requirement.startsWith('•') || requirement.startsWith('-') ? (
                  <div className="flex items-start space-x-2 ml-4">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{requirement.replace(/^[•-]\s*/, '')}</span>
                  </div>
                ) : requirement === '' ? (
                  <div className="h-2"></div>
                ) : (
                  <div className={`${requirement.endsWith(':') ? 'font-semibold text-gray-900 mt-3 mb-1' : ''}`}>
                    {requirement}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Acceptance Criteria">
        <div className="space-y-3">
          {prd.acceptanceCriteria.map((criteria, index) => (
            <div key={index} className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">{criteria.replace('✓ ', '')}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Metrics of Success">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prd.metrics.map((metric, index) => (
            <div key={index} className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{metric}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Risks & Dependencies">
        <div className="space-y-4">
          {prd.risks.map((risk, index) => (
            <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  R{index + 1}
                </div>
                <p className="text-gray-700">{risk}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-12 pt-6 border-t border-gray-200 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Generated on {prd.createdAt.toLocaleDateString()} at {prd.createdAt.toLocaleTimeString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PRD Generator • Built for Product Managers
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Ready to share</p>
            <p className="text-xs text-gray-500">Export or save to continue working</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-100 flex items-center space-x-2">
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
};

export default PRDOutput;