import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PRDGenerator from './components/PRDGenerator';
import Templates from './components/Templates';
import Dashboard from './components/Dashboard';
import AuthPage from './components/Authentication';
import { PRD } from './types/prd';

function App() {
  const [currentPage, setCurrentPage] = useState<
    'auth' | 'landing' | 'generator' | 'templates' | 'dashboard'
  >('auth');
  const [savedPRDs, setSavedPRDs] = useState<PRD[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');

  const handleSavePRD = (prd: PRD) => {
    setSavedPRDs([...savedPRDs, { ...prd, id: Date.now().toString() }]);
  };

  // Handle successful auth → go to landing instead of dashboard
  const handleAuthenticate = (data: { name: string; email: string; password: string }) => {
    setUserName(data.name);
    setCurrentPage('landing');
  };

  const handleLogout = () => {
    setUserName('');
    setSavedPRDs([]);
    setCurrentPage('auth');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return <AuthPage onAuthenticate={handleAuthenticate} />;
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
            userName={userName}
            onLogout={handleLogout}
          />
        );
      case 'landing':
      default:
        return (
          <LandingPage
            onNavigate={setCurrentPage}
            userName={userName}
            onLogout={handleLogout}
          />
        );
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderPage()}</div>;
}

export default App;
