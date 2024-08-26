import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStatuses, addStatus as apiAddStatus, deleteStatus as apiDeleteStatus } from '../api/projects';

interface Status {
  _id: string;
  projectStatus: string;
}

interface StatusContextType {
  statuses: Status[];
  addStatus: (status: string) => Promise<void>;
  deleteStatus: (id: string) => Promise<void>;
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

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const addStatus = useCallback(async (status: string) => {
    try {
      const addedStatus = await apiAddStatus({ projectStatus: status });
      setStatuses((prevStatuses) => [...prevStatuses, addedStatus]);
    } catch (error) {
      console.error('Error adding status:', error);
      setError('Failed to add status.');
    }
  }, []);

  const deleteStatus = useCallback(async (id: string) => {
    try {
      await apiDeleteStatus(id);
      setStatuses((prevStatuses) => prevStatuses.filter((status) => status._id !== id));
    } catch (error) {
      console.error('Error deleting status:', error);
      setError('Failed to delete status.');
    }
  }, []);

  return (
    <StatusContext.Provider value={{ statuses, addStatus, deleteStatus, loading, error }}>
      {children}
    </StatusContext.Provider>
  );
};
