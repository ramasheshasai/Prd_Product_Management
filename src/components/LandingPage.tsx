import React from 'react';
import { FileText, Zap, Users, Download, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'generator' | 'templates' | 'dashboard') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-primary-900 shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-9 w-9 text-beige-400" />
              <span className="text-2xl font-extrabold text-white tracking-wide">PRD Studio</span>
            </div>
            <div className="flex space-x-8">
              <button 
                onClick={() => onNavigate('templates')}
                className="text-beige-300 hover:text-white font-semibold transition-colors text-lg"
              >
                Templates
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-beige-300 hover:text-white font-semibold transition-colors text-lg"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20 text-center">
        <h1 className="text-5xl font-extrabold text-primary-900 mb-8 leading-relaxed font-sans">
          Professional PRD Creation <span className="text-olive-700"> Made Simple</span>
        </h1>
        <p className="text-xl text-primary-700 max-w-4xl mx-auto mb-12 font-body leading-relaxed">
          Transform your product ideas into comprehensive requirement documents.  
          Structured templates and guided workflows help you create professional PRDs 
          that drive successful product development.
        </p>
        <button 
          onClick={() => onNavigate('generator')}
          className="bg-olive-700 hover:bg-olive-800 text-white px-12 py-5 rounded-2xl text-xl font-semibold
                     transition-shadow shadow-md hover:shadow-xl flex items-center mx-auto space-x-3"
        >
          <span>Create New PRD</span>
          <ArrowRight className="h-6 w-6" />
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <h2 className="text-4xl font-extrabold text-center text-primary-900 mb-16 font-sans">
          Complete PRD Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-11">
          <FeatureCard 
            icon={<Zap className="h-10 w-16 text-olive-700" />}
            title="Structured Templates"
            description="Pre-built frameworks for common PRD scenarios with guided prompts and best practices."
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-16 text-orange-600" />}
            title="Professional Format"
            description="Industry-standard PRD structure with all essential sections and documentation standards."
          />
          <FeatureCard 
            icon={<Users className="h-10 w-16 text-primary-600" />}
            title="Export & Share"
            description="Download PRDs in multiple formats and share with stakeholders and development teams."
          />
          <FeatureCard 
            icon={<Download className="h-10 w-16 text-olive-600" />}
            title="Document Management"
            description="Save, organize, and manage your PRD library with version tracking and easy access."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10 border-t border-primary-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-extrabold text-olive-700 mb-3 font-sans">85%</div>
              <div className="text-primary-600 font-body text-lg">Time Saved</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-olive-700 mb-3 font-sans">12</div>
              <div className="text-primary-600 font-body text-lg">Essential Sections</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-olive-700 mb-3 font-sans">4</div>
              <div className="text-primary-600 font-body text-lg">PRD Templates</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 py-8">
        <div className="max-w-3xl mx-auto text-center px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-semibold text-white mb-3 font-sans">
            Ready to create better PRDs?
          </h2>
          <p className="text-beige-300 text-base mb-6 font-body max-w-xl mx-auto">
            Start documenting your product requirements with professional structure and clarity.
          </p>
          <button 
            onClick={() => onNavigate('generator')}
            className="bg-olive-700 hover:bg-olive-800 text-white px-10 py-3 rounded-xl text-lg font-semibold 
                       transition-shadow shadow-md hover:shadow-lg"
          >
            Start Creating
          </button>
          <p className="mt-8 text-center text-beige-400 italic text-sm font-body">
  Made with lots of ❤️ and product 
</p>
        </div>
      </section>
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
    <div className="bg-white p-7 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-200">
      <div className="mb-5">{icon}</div>
      <h3 className="text-xl font-semibold text-primary-900 mb-3 font-sans">{title}</h3>
      <p className="text-primary-600 leading-relaxed font-body text-base">{description}</p>
    </div>
  );
};

export default LandingPage;
