import React from 'react';
import { FileText, Zap, Users, Download, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'generator' | 'templates' | 'dashboard') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-beige-200">
      {/* Navigation */}
      <nav className="bg-primary-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-beige-500" />
              <span className="text-xl font-bold text-white">PRD Studio</span>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => onNavigate('templates')}
                className="text-beige-300 hover:text-white font-medium transition-colors"
              >
                Templates
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                className="text-beige-300 hover:text-white font-medium transition-colors"
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
          <h1 className="text-4xl font-bold text-primary-900 mb-6 leading-tight font-sans">
            Professional PRD Creation
            <span className="text-olive-700"> Made Simple</span>
          </h1>
          <p className="text-lg text-primary-700 mb-8 max-w-3xl mx-auto leading-relaxed font-body">
            Transform your product ideas into comprehensive requirement documents. 
            Structured templates and guided workflows help you create professional 
            PRDs that drive successful product development.
          </p>
          <button 
            onClick={() => onNavigate('generator')}
            className="bg-olive-700 hover:bg-olive-800 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                     transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <span>Create New PRD</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-primary-900 mb-12 font-sans">
          Complete PRD Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-olive-700" />}
            title="Structured Templates"
            description="Pre-built frameworks for common PRD scenarios with guided prompts and best practices."
          />
          <FeatureCard 
            icon={<FileText className="h-8 w-8 text-orange-600" />}
            title="Professional Format"
            description="Industry-standard PRD structure with all essential sections and documentation standards."
          />
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-primary-600" />}
            title="Export & Share"
            description="Download PRDs in multiple formats and share with stakeholders and development teams."
          />
          <FeatureCard 
            icon={<Download className="h-8 w-8 text-olive-600" />}
            title="Document Management"
            description="Save, organize, and manage your PRD library with version tracking and easy access."
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-t border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-olive-700 mb-2 font-sans">85%</div>
              <div className="text-primary-600 font-body">Time Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-olive-700 mb-2 font-sans">12</div>
              <div className="text-primary-600 font-body">Essential Sections</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-olive-700 mb-2 font-sans">4</div>
              <div className="text-primary-600 font-body">PRD Templates</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-sans">
            Ready to create better PRDs?
          </h2>
          <p className="text-beige-300 text-lg mb-8 font-body">
            Start documenting your product requirements with professional structure and clarity.
          </p>
          <button 
            onClick={() => onNavigate('generator')}
            className="bg-olive-700 hover:bg-olive-800 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                     transition-colors shadow-lg"
          >
            Start Creating
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
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-primary-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-primary-900 mb-2 font-sans">{title}</h3>
      <p className="text-primary-600 leading-relaxed font-body text-sm">{description}</p>
    </div>
  );
};

export default LandingPage;