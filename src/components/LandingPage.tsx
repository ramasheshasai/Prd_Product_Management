import React from 'react';
import { FileText, Zap, Users, Download, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'generator' | 'templates' | 'dashboard') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PRD Generator</span>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => onNavigate('templates')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Templates
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Write better PRDs
            <span className="text-blue-600"> faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Just enter your product scenario, and our AI will generate a structured 
            Product Requirement Document for you. Perfect for PMs who want to focus 
            on strategy, not formatting.
          </p>
          <button 
            onClick={() => onNavigate('generator')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                     transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <span>Start Writing a PRD</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need for professional PRDs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-blue-600" />}
            title="AI-Powered Generation"
            description="Transform your ideas into structured PRDs instantly with intelligent formatting and suggestions."
          />
          <FeatureCard 
            icon={<FileText className="h-8 w-8 text-green-600" />}
            title="Professional Templates"
            description="Choose from proven PRD templates for new features, enhancements, MVPs, and bug fixes."
          />
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-purple-600" />}
            title="Team Collaboration"
            description="Share PRDs with stakeholders and gather feedback through shareable links."
          />
          <FeatureCard 
            icon={<Download className="h-8 w-8 text-orange-600" />}
            title="Export Options"
            description="Download your PRDs as PDF, DOCX, or Markdown for easy sharing and documentation."
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10x</div>
              <div className="text-gray-600">Faster PRD Creation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Completeness Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">PMs Using Daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your PRD process?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join hundreds of product managers who save hours every week.
          </p>
          <button 
            onClick={() => onNavigate('generator')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold 
                     hover:bg-gray-50 transition-colors shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default LandingPage;