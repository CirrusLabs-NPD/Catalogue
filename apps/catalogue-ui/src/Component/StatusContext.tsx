import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStatuses, addStatus as apiAddStatus, deleteStatus as apiDeleteStatus } from '../api/projects';

interface Status {
  _id: string;
  projectStatus: string;
  color: string; // Add color property
}

interface StatusContextType {
  statuses: Status[];
  addStatus: (status: string) => Promise<void>;
  deleteStatus: (id: string) => Promise<void>;
  fetchStatuses: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const useStatusContext = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatusContext must be used within a StatusProvider');
  }
  return context;
};

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Fetch statuses from the server
  const fetchStatuses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedStatuses = await getStatuses();
      setStatuses(fetchedStatuses);
    } catch (error) {
      console.error('Error fetching statuses:', error);
      setError('Failed to fetch statuses.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch statuses on component mount
  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  // Add a new status
  const addStatus = useCallback(async (status: string) => {
    setLoading(true);
    setError(null);
    try {
      const color = getRandomColor(); // Generate a random color
      const addedStatus = await apiAddStatus({ projectStatus: status, color });
      setStatuses((prevStatuses) => [...prevStatuses, addedStatus]);
    } catch (error) {
      console.error('Error adding status:', error);
      setError('Failed to add status.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete an existing status
  const deleteStatus = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiDeleteStatus(id);
      setStatuses((prevStatuses) => prevStatuses.filter((status) => status._id !== id));
    } catch (error) {
      console.error('Error deleting status:', error);
      setError('Failed to delete status.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <StatusContext.Provider value={{ statuses, addStatus, deleteStatus, fetchStatuses, loading, error }}>
      {children}
    </StatusContext.Provider>
  );
};
