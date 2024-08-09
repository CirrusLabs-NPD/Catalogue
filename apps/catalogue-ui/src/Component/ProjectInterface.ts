export interface Project {
    _id: string;
    projectName: string;
    startDate?: string;
    gitHubLinks: string;
    technology: string[];
    resources: string[];
    projectStatus: string;
    members: string[];
    description: string;
    progressPercent: number;
    demoURL: string;
    completionDate?: string;
  }