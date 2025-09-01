export interface PRD {
  id?: string;
  title: string;
  problemStatement: string;
  targetAudience: string;
  goals: string;
  features: string;
  constraints: string;
  objectives: string[];
  userStories: string[];
  requirements: string[];
  acceptanceCriteria: string[];
  metrics: string[];
  risks: string[];
  createdAt: Date;
}

export interface PRDTemplate {
  id: string;
  name: string;
  description: string;
  category: 'new-feature' | 'enhancement' | 'bug-fix' | 'mvp';
  template: {
    problemStatement: string;
    targetAudience: string;
    goals: string;
    features: string;
    constraints: string;
  };
}</parameter>