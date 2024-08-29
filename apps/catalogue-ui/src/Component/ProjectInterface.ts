

export interface Member {
  _id: string;
  name: string;
  email: string;
  title: string;
  techStack: string[];
  projects: string[];
}

export interface Project {
    _id: string;
    projectName: string;
    projectManager: string;
    startDate?: string;
    gitHubLinks: string;
    technology: string[];
    resources: string[];
    projectStatus: string;
    members: Member[];
    description: string;
    progressPercent: number;
    demoURL: string;
    completionDate?: string;
    readmeFile?: string;
  }