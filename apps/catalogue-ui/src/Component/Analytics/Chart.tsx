import React, { useEffect, useState } from 'react';
import { getPercentDash } from '../../api/analytics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Typography, Paper } from '@mui/material';

interface RowData {
  projectName: string;
  members: string[];
  startDate: string;
  completionDate: string;
  projectStatus: string;
  progressPercent: number;
}

interface MemberData {
  name: string;
  projects: { [key: string]: number };
}

export default function Chart() {
  const [membersData, setMembersData] = useState<MemberData[]>([]);
  const [allProjects, setAllProjects] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPercentDash();
        const membersMap: { [key: string]: { [key: string]: number } } = {};
        const projectsSet = new Set<string>();

        // Collect projects for each member
        data.forEach((row: RowData) => {
          projectsSet.add(row.projectName);
          row.members.forEach((member: string) => {
            if (!membersMap[member]) {
              membersMap[member] = {};
            }
            membersMap[member][row.projectName] = (membersMap[member][row.projectName] || 0) + 1; 
          });
        });

        const membersList = Object.keys(membersMap).map((name) => ({
          name,
          projects: membersMap[name],
        }));

        // Sort the list by the number of projects in descending order
        membersList.sort((a, b) => Object.keys(b.projects).length - Object.keys(a.projects).length);

        setMembersData(membersList);
        setAllProjects(Array.from(projectsSet));
      } catch (error) {
        setError('Error fetching project data.');
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-4 rounded shadow-md">
          <p className="label font-semibold mb-2">{label}</p>
          <ul>
            {payload.map((entry: any, index: number) => (
              <li key={`item-${index}`}>
                {entry.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Paper elevation={3} className="max-w-7xl mx-auto p-4">
      {error ? (
        <Typography color="error" align="center" className="mt-4">
          {error}
        </Typography>
      ) : (
        <div className="mt-8 pl-4">
          <ResponsiveContainer width="80%" height={300}>
            <BarChart 
              data={membersData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip content={<CustomTooltip />} />
              {allProjects.map((project, index) => (
                <Bar 
                  key={project} 
                  dataKey={`projects.${project}`} 
                  stackId="a" 
                  fill={getRandomColor()} 
                  name={project}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  );
}
