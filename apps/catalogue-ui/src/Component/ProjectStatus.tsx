import React, { useState } from 'react';
import { useStatusContext } from './StatusContext';

function ProjectStatus() {
  const { statuses, addStatus, deleteStatus } = useStatusContext();
  const [newStatus, setNewStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAddStatus = async () => {
    if (!newStatus.trim()) {
      setError('Status cannot be empty.');
      return;
    }

    try {
      await addStatus(newStatus);
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
    } catch (error) {
      console.error('Error deleting status:', error);
      setError('Failed to delete status.');
    }
  };

  return (
    <div className="p-8 mt-10 bg-white rounded-xl max-w-lg mx-auto shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Manage Project Statuses</h2>

      {error && (
        <div className="text-red-600 bg-red-100 p-3 mb-4 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          placeholder="Enter new status"
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <button
          onClick={handleAddStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-150 shadow-md"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {statuses.map((status) => (
          <li
            key={status._id}
            className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            <span className="text-gray-800 font-medium">{status.projectStatus}</span>
            <button
              onClick={() => handleDeleteStatus(status._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg transition duration-150 shadow-sm"
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
