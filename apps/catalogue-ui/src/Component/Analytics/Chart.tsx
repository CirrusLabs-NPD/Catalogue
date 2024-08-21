import React, { useEffect, useState } from 'react';
import { getPercentDash } from '../../api/analytics';

interface RowData {
  projectName: string;
  members: string[];
  startDate: string;
  completionDate: string;
  projectStatus: string;
  progressPercent: number;
}

interface MemberProject {
  projectName: string;
  status: string;
}

interface MemberData {
  name: string;
  projects: MemberProject[];
}

export default function Chart() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [membersData, setMembersData] = useState<MemberData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPercentDash();
        setRows(data);
        const membersMap: { [key: string]: MemberProject[] } = {};

        // Collect the members and the projects they are working on with status
        data.forEach((row: RowData) => {
          row.members.forEach((member: string) => {
            if (!membersMap[member]) {
              membersMap[member] = [];
            }
            membersMap[member].push({
              projectName: row.projectName,
              status: row.projectStatus,
            });
          });
        });

        const membersList = Object.keys(membersMap).map((name) => ({
          name,
          projects: membersMap[name],
        }));

        setMembersData(membersList);
      } catch (error) {
        setError('Error fetching project data.');
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Members Working on Multiple Projects</h2>
          <ul className="mt-4 list-disc pl-5">
            {membersData
              .filter((member) => member.projects.length > 1)
              .map((member) => (
                <li key={member.name} className="mb-2">
                  <span className="font-medium">{member.name}</span> - assigned to{' '}
                  <span className="text-indigo-600">
                    {member.projects
                      .map(({ projectName, status }) => `${projectName} (${status})`)
                      .join(', ')}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
