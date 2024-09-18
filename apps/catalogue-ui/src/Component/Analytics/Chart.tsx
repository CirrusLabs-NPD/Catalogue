import React, { useEffect, useState } from 'react';
import { getPercentDash } from '../../api/analytics';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

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
  totalProjects: number;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
  '#F06292', '#AED581', '#7986CB', '#4DB6AC', '#FFD54F'
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800 mb-2">{data.name}</p>
        <p className="text-sm text-gray-600">Total Projects: {data.totalProjects}</p>
        <ul className="mt-2 space-y-1">
          {Object.entries(data.projects).map(([project, count], index) => (
            <li key={index} className="text-sm flex items-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              {project}: {count}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

const ProjectVisualization: React.FC = () => {
  const [membersData, setMembersData] = useState<MemberData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPercentDash();
        const membersMap: { [key: string]: { projects: { [key: string]: number }, totalProjects: number } } = {};

        data.forEach((row: RowData) => {
          row.members.forEach((member: string) => {
            const memberName = member.includes('@') ? member.split('@')[0] : member;
            if (!membersMap[memberName]) {
              membersMap[memberName] = { projects: {}, totalProjects: 0 };
            }
            membersMap[memberName].projects[row.projectName] = (membersMap[memberName].projects[row.projectName] || 0) + 1;
            membersMap[memberName].totalProjects += 1;
          });
        });

        const membersList = Object.keys(membersMap).map((name) => ({
          name,
          ...membersMap[name],
        }));

        membersList.sort((a, b) => b.totalProjects - a.totalProjects);
        setMembersData(membersList);
      } catch (error) {
        setError('Error fetching project data.');
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <div className="mt-8">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={membersData}
                dataKey="totalProjects"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                innerRadius={100}
                labelLine={false}
              >
                {membersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ProjectVisualization;
