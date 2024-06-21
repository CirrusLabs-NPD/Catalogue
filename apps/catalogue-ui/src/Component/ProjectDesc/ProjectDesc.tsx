import React from 'react';
import './ProjectDesc.css';

const ProjectDetails = () => {
  const project = {
    name: "CirrusInsights Now",
    description: "Our AI application simplifies the creation of user stories for any project. By answering a few targeted questions, users can effortlessly generate detailed and accurate user stories. This streamlined process allows users to focus on their project's needs while ensuring that the user stories align with best practices and project goals.When the user clicks on the CirrusinsightsNow link, it navigates to the landing page. The user needs to click on 'Get Started,' which then directs them to the Auth0 sign-up and login page. After the user logs in, it takes them to the main CirrusinsightsNow AI page where they can view five sections. To begin, the user needs to select the 'Lean Business Canvas' section and provide a detailed description of the problem statement. From the next question onwards, the user can choose the option to receive help with answers. The user must attend all sections To generate the solution, the user needs to click on the 'Solution' button. Once the solution is generated, the status of that section changes to 'Completed.' After the solution is generated, the user can view the scenarios, acceptance criteria and Java code. Users have the option to download solutions for all sections in PDF format and also download each section's solution separately in PDF format. Upon clicking the download option, the files are downloaded to the desktop for the user's viewing. If the user wishes to edit any questions, they can do so by clicking on the 'Preview' option and selecting the questions. Additionally, in the 'View Question' section, users can review the questions. The application also features a 'History' section where users can view their past search data. When the user clicks on the 'Logout' option, they will be logged out of the application.",
    githubLinks: ["https://github.com/CirrusLabs-NPD/CirrusInsight-AI.git", "https://github.com/CirrusLabs-NPD/CirrusInsight-AI.git"],
    technology: "Python",
    otherTechnology: "Auth0 Authentication",
    duration: "8 weeks",
    members: ["Praveenraj", "Abhishek", "Rashmi"],
    status: "Deployed"
  };

  return (
    <div className="project-details">
      <h1 className="project-title">{project.name}</h1>
      <div className="project-info">
        <div className="project-info-item">
          <h2 className="project-info-heading">Description</h2>
          <p className="project-info-detail">{project.description}</p>
        </div>
        <div className="project-info-item">
          <h2 className="project-info-heading">GitHub Links</h2>
          {project.githubLinks.map((link, index) => (
            <p key={index} className="project-info-detail">
              <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            </p>
          ))}
        </div>
        <div className="project-info-item">
          <h2 className="project-info-heading">Technology</h2>
          <p className="project-info-detail">{project.technology}</p>
        </div>
        <div className="project-info-item">
          <h2 className="project-info-heading">Other Technology</h2>
          <p className="project-info-detail">{project.otherTechnology}</p>
        </div>
        <div className="project-info-item">
          <h2 className="project-info-heading">Duration</h2>
          <p className="project-info-detail">{project.duration}</p>
        </div>
        <div className="project-info-item">
          <h2 className="project-info-heading">Members</h2>
          {project.members.map((member, index) => (
            <p key={index} className="project-info-detail">{member}</p>
          ))}
        </div>
        <div className="project-info-item">
          <h2 className="project-info-heading">Status</h2>
          <p className="project-info-detail">{project.status}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
