import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStatuses, addStatus as apiAddStatus, deleteStatus as apiDeleteStatus } from '../api/projects';

interface Status {
  _id: string;
  projectStatus: string;
}

interface StatusContextType {
  statuses: Status[];
  addStatus: (status: string) => Promise<void>;
  deleteStatus: (id: string) => Promise<void>;
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

  const addStatus = async (status: string) => {
    try {
      const addedStatus = await apiAddStatus({ projectStatus: status });
      setStatuses((prevStatuses) => [...prevStatuses, addedStatus]);
    } catch (error) {
      console.error('Error adding status:', error);
    }
  };

  const deleteStatus = async (id: string) => {
    try {
      await apiDeleteStatus(id);
      setStatuses((prevStatuses) => prevStatuses.filter((status) => status._id !== id));
    } catch (error) {
      console.error('Error deleting status:', error);
    }
  };

  return (
    <StatusContext.Provider value={{ statuses, addStatus, deleteStatus }}>
      {children}
    </StatusContext.Provider>
  );
};
