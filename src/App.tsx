import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PRDGenerator from './components/PRDGenerator';
import Templates from './components/Templates';
import Dashboard from './components/Dashboard';
import { PRD } from './types/prd';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'generator' | 'templates' | 'dashboard'>('landing');
  const [savedPRDs, setSavedPRDs] = useState<PRD[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleSavePRD = (prd: PRD) => {
    setSavedPRDs([...savedPRDs, { ...prd, id: Date.now().toString() }]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'generator':
        return (
          <PRDGenerator 
            onSave={handleSavePRD}
            template={selectedTemplate}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'templates':
        return (
          <Templates 
            onSelectTemplate={(template) => {
              setSelectedTemplate(template);
              setCurrentPage('generator');
            }}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            prds={savedPRDs}
            onBack={() => setCurrentPage('landing')}
          />
        );
      default:
        return (
          <LandingPage 
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;