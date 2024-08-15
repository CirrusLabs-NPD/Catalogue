import React, { useEffect, useState } from 'react';
import { getStatuses, addStatus, deleteStatus } from '../api/projects';

interface Status {
  _id: string;
  projectStatus: string;
}

function ProjectStatus() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [newStatus, setNewStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const fetchedStatuses = await getStatuses();
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  const handleAddStatus = async () => {
    if (!newStatus.trim()) {
      setError('Status cannot be empty.');
      return;
    }

    try {
      const addedStatus = await addStatus({ projectStatus: newStatus });
      setStatuses([...statuses, addedStatus]);
      setNewStatus('');
      setError(null);
    } catch (error) {
      console.error('Error adding status:', error);
      setError('Failed to add status.');
    }
  };

  const handleDeleteStatus = async (id: string) => {
    try {
      await deleteStatus(id);
      setStatuses(statuses.filter((status) => status._id !== id));
    } catch (error) {
      console.error('Error deleting status:', error);
      setError('Failed to delete status.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg max-w-md mx-auto">
      <h2 className="text-center text-xl font-semibold mb-6">Manage Project Statuses</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="flex mb-6">
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          placeholder="Enter new status"
          className="flex-grow p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          onClick={handleAddStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Status
        </button>
      </div>

      <ul className="space-y-3">
        {statuses.map((status) => (
          <li
            key={status._id}
            className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300"
          >
            <span>{status.projectStatus}</span>
            <button
              onClick={() => handleDeleteStatus(status._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectStatus;
