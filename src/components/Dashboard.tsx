import React from 'react';
import { ArrowLeft, FileText, Download, Calendar, Trash2 } from 'lucide-react';
import { PRD } from '../types/prd';

interface DashboardProps {
  prds: PRD[];
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ prds, onBack }) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">My PRD Dashboard</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your PRDs</h2>
          <p className="text-gray-600">
            Manage and access all your saved Product Requirement Documents.
          </p>
        </div>

        {prds.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No PRDs yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first PRD to get started with better product documentation.
            </p>
            <button 
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                       font-semibold transition-colors"
            >
              Create Your First PRD
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{prds.length}</div>
                <div className="text-gray-600">Total PRDs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(prds.length / (Math.max(1, Math.ceil((Date.now() - new Date(prds[0]?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24 * 7)))))}
                </div>
                <div className="text-gray-600">PRDs per Week</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(prds.reduce((acc, prd) => acc + prd.requirements.length, 0) / Math.max(1, prds.length))}
                </div>
                <div className="text-gray-600">Avg Requirements</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface PRDCardProps {
  prd: PRD;
  onDownload: () => void;
}

const PRDCard: React.FC<PRDCardProps> = ({ prd, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {prd.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {prd.problemStatement}
          </p>
        </div>
        <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{prd.createdAt.toLocaleDateString()}</span>
        </div>
        <div className="bg-gray-100 px-2 py-1 rounded text-xs">
          {prd.requirements.length} requirements
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Target: {prd.targetAudience}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onDownload}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 
                     transition-colors text-sm font-medium"
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