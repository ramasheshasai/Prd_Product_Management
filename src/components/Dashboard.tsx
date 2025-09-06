import React from 'react';
import { ArrowLeft, FileText, Download, Calendar } from 'lucide-react';
import { PRD } from '../types/prd';

interface DashboardProps {
  prds: PRD[];
  onBack: () => void;
  userName: string;  
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ prds, onBack, userName, onLogout }) => {
  const downloadPRD = (prd: PRD) => {
    const prdText = formatPRDAsText(prd);
    const blob = new Blob([prdText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prd.title}.txt`;
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
            {/* Back button */}
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-beige-300 hover:text-white transition-colors font-body"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl font-semibold text-white font-sans">My Documents</h1>

            {/* User + Logout */}
            <div className="flex items-center space-x-4 text-beige-300 font-medium font-sans text-sm md:text-base">
               {/* <span>
                Welcome, <span className="font-bold">{userName}</span>
              </span>  */}

              <button
                onClick={onLogout}
                className="hover:text-white transition-colors font-body"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state vs PRD grid */}
      {prds.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-primary-200 m-6">
          <FileText className="h-16 w-16 text-primary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-primary-900 mb-2 font-sans">
            Welcome, {userName} 👋
          </h3>
          <p className="text-primary-600 mb-6 font-body">
            You don’t have any PRDs yet. Start by creating your first one!
          </p>
          <button 
            onClick={onBack}
            className="bg-olive-700 hover:bg-olive-800 text-white px-6 py-3 rounded-lg 
                     font-semibold transition-colors font-sans"
          >
            Create Your First PRD
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6">
          {prds.map((prd) => (
            <PRDCard 
              key={prd.id} 
              prd={prd} 
              onDownload={() => downloadPRD(prd)}
            />
          ))}
        </div>
      )}

      {/* Stats Section */}
      {prds.length > 0 && (
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 border border-primary-200 m-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-6 font-sans">Document Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-olive-700 mb-2 font-sans">{prds.length}</div>
              <div className="text-primary-600 font-body">Total PRDs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2 font-sans">
                {Math.round(
                  prds.length /
                  (Math.max(
                    1,
                    Math.ceil(
                      (Date.now() - new Date(prds[0]?.createdAt || Date.now()).getTime()) /
                      (1000 * 60 * 60 * 24 * 7)
                    )
                  ))
                )}
              </div>
              <div className="text-primary-600 font-body">Per Week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700 mb-2 font-sans">
                {Math.round(
                  prds.reduce((acc, prd) => acc + prd.requirements.length, 0) / Math.max(1, prds.length)
                )}
              </div>
              <div className="text-primary-600 font-body">Avg Requirements</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface PRDCardProps {
  prd: PRD;
  onDownload: () => void;
}

const PRDCard: React.FC<PRDCardProps> = ({ prd, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2 font-sans">
            {prd.title}
          </h3>
          <p className="text-sm text-primary-600 line-clamp-3 font-body">
            {prd.problemStatement}
          </p>
        </div>
        <FileText className="h-5 w-5 text-primary-400 flex-shrink-0 ml-4" />
      </div>

      <div className="flex items-center space-x-4 text-sm text-primary-500 mb-4 font-body">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{prd.createdAt.toLocaleDateString()}</span>
        </div>
        <div className="bg-beige-300 px-2 py-1 rounded text-xs">
          {prd.requirements.length} requirements
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-primary-500 font-body">
          Target: {prd.targetAudience}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onDownload}
            className="flex items-center space-x-1 text-olive-700 hover:text-olive-800 
                     transition-colors text-sm font-medium font-body"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
