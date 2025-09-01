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
    <div className="min-h-screen bg-beige-200">
      {/* Header */}
      <div className="bg-primary-900 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-beige-300 hover:text-white transition-colors font-body"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Edit</span>
              </button>
              <button 
                onClick={onHome}
                className="flex items-center space-x-2 text-beige-300 hover:text-white transition-colors font-body"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 border border-beige-400 rounded-lg 
                         hover:bg-beige-100 transition-colors text-primary-700 font-body"
              >
                {copied ? <Check className="h-4 w-4 text-olive-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={downloadPRD}
                className="flex items-center space-x-2 px-4 py-2 border border-beige-400 rounded-lg 
                         hover:bg-beige-100 transition-colors text-primary-700 font-body"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-olive-700 hover:bg-olive-800 
                         text-white rounded-lg transition-colors font-sans"
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
        <div className="bg-white rounded-lg shadow-sm p-8 border border-primary-200">
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
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold text-primary-900 mb-6 border-b-2 border-beige-400 pb-4 font-sans">
        {prd.title}
      </h1>
      
      <Section title="Problem Statement">
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
          <p className="text-primary-800 leading-relaxed font-body">{prd.problemStatement}</p>
        </div>
      </Section>

      <Section title="Target Audience">
        <div className="bg-olive-50 border-l-4 border-olive-500 p-4 rounded-r-lg">
          <p className="text-primary-800 font-body">{prd.targetAudience}</p>
        </div>
      </Section>

      <Section title="Objectives & Goals">
        <ul className="space-y-3">
          {prd.objectives.map((objective, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-olive-100 text-olive-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5 font-sans">
                {index + 1}
              </div>
              <span className="text-primary-800 leading-relaxed font-body">{objective}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="User Stories">
        <div className="space-y-4">
          {prd.userStories.map((story, index) => (
            <div key={index} className="bg-beige-100 border border-beige-300 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-olive-100 text-olive-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 font-sans">
                  US{index + 1}
                </div>
                <p className="text-primary-800 italic leading-relaxed font-body">{story}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Features & Requirements">
        <div className="bg-beige-100 p-6 rounded-lg border border-beige-300">
          <div className="space-y-2">
            {prd.requirements.map((requirement, index) => (
              <div key={index} className="text-primary-800 font-body">
                {requirement.startsWith('•') || requirement.startsWith('-') ? (
                  <div className="flex items-start space-x-2 ml-4">
                    <span className="text-olive-700 font-bold">•</span>
                    <span>{requirement.replace(/^[•-]\s*/, '')}</span>
                  </div>
                ) : requirement === '' ? (
                  <div className="h-2"></div>
                ) : (
                  <div className={`${requirement.endsWith(':') ? 'font-semibold text-primary-900 mt-3 mb-1 font-sans' : ''}`}>
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
            <div key={index} className="flex items-center space-x-3 bg-olive-50 p-3 rounded-lg border border-olive-200">
              <Check className="h-5 w-5 text-olive-600 flex-shrink-0" />
              <span className="text-primary-800 font-body">{criteria.replace('✓ ', '')}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Metrics of Success">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prd.metrics.map((metric, index) => (
            <div key={index} className="bg-beige-100 border border-beige-300 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 font-sans">
                  {index + 1}
                </div>
                <p className="text-primary-800 text-sm leading-relaxed font-body">{metric}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Risks & Dependencies">
        <div className="space-y-4">
          {prd.risks.map((risk, index) => (
            <div key={index} className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 font-sans">
                  R{index + 1}
                </div>
                <p className="text-primary-800 font-body">{risk}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-12 pt-6 border-t border-primary-200 bg-beige-100 -mx-8 -mb-8 px-8 pb-8 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-600 font-body">
              Generated on {prd.createdAt.toLocaleDateString()} at {prd.createdAt.toLocaleTimeString()}
            </p>
            <p className="text-xs text-primary-500 mt-1 font-body">
              PRD Studio • Professional Documentation
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary-900 font-sans">Document Complete</p>
            <p className="text-xs text-primary-500 font-body">Export or save for future reference</p>
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
      <h2 className="text-xl font-bold text-primary-900 mb-4 pb-2 border-b-2 border-beige-400 flex items-center space-x-2 font-sans">
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
};

export default PRDOutput;