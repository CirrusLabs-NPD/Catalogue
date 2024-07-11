
export const projectData = [
  {
    id: 'CirrusInsightsNow',
    name: 'CirrusInsights Now',
    description:
      'Our AI application simplifies the creation of user stories for any project. By answering a few targeted questions, users can effortlessly generate detailed and accurate user stories.',
    // description1:
    //   "This streamlined process allows users to focus on their project's needs while ensuring that the user stories align with best practices and project goals.When the user clicks on the CirrusinsightsNow link, it navigates to the landing page.\n The user needs to click on 'Get Started,' which then directs them to the Auth0 sign-up and login page.",
    // description2:
    //   "After the user logs in, it takes them to the main CirrusinsightsNow AI page where they can view five sections. To begin, the user needs to select the 'Lean Business Canvas' section and provide a detailed description of the problem statement. From the next question onwards, the user can choose the option to receive help with answers. The user must attend all sections To generate the solution, the user needs to click on the 'Solution' button. Once the solution is generated, the status of that section changes to 'Completed.' After the solution is generated, the user can view the scenarios, acceptance criteria and Java code. Users have the option to download solutions for all sections in PDF format and also download each section's solution separately in PDF format.",
    // description3:
    //   "Upon clicking the download option, the files are downloaded to the desktop for the user's viewing. If the user wishes to edit any questions, they can do so by clicking on the 'Preview' option and selecting the questions. Additionally, in the 'View Question' section, users can review the questions. The application also features a 'History' section where users can view their past search data. When the user clicks on the 'Logout' option, they will be logged out of the application.",
    githubLinks: ['https://github.com/CirrusLabs-NPD/CirrusInsight-AI.git'],
    technology: 'Javascript',
    otherTechnology: 'Auth0 Authentication',
    duration: '8 weeks',
    members: ['Praveenraj', 'Abhishek', 'Rashmi'],
    status: 'Deployed',
    progress: '100%',
    Web_URL: 'https://cirrusinsightai.azurewebsites.net'
  },
  {
    id: 'ResumeMiner',
    name: 'Resume Miner',
    description:
      '"Resume Mining" is an innovative project built on NestJS, a progressive NodeJS framework. This project leverages the power of Langchain, an AI technology, to offer an advanced resume processing service. With Resume Mining, users can expect efficient and accurate analysis of resumes, unlocking valuable insights and streamlining the recruitment process.',

    githubLinks: [
      'https://github.com/CirrusLabs-NPD/Resume-Mining-Nodejs-BE/',
      'https://github.com/CirrusLabs-NPD/Resume-Mining-FE',
    ],
    technology: 'Python',
    otherTechnology: 'GenAI,Javascript',
    duration: '8 weeks',
    members: ['Aakash', 'Keith', 'Rashmi', 'Farhan', 'Rajesab', 'Rohan'],
    status: 'Deployed',
    progress: '80%',
    Web_URL: 'https://resumeminner.azurewebsites.net'
  },
  {
    id: 'ProjectCatalogue',
    name: 'Project Catalogue',
    description:
      'Project Catalogue provides the one stop integrated platform for all the POCs across CirrusLabs.It is built using nx monorepo tool, Project Catalogue uses Nestjs and reactjs for backend and frontend respectively',

    githubLinks: ['https://github.com/CirrusLabs-NPD/Catalogue'],
    technology: 'Javascript',
    otherTechnology: 'Node.js,React.js',
    duration: '8 weeks',
    members: ['Aakash', 'Keith', 'Rashmi', 'Farhan', 'Rajesab', 'Rohan'],
    status: 'Deployed',
    progress: '40%',
     Web_URL: 'https://projectcatalogue.azurewebsites.net'
  },
];
