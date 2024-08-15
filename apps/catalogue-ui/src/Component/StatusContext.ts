import React, { createContext, useState } from 'react';

const StatusContext = createContext();

const StatusProvider = ({ children }) => {
  const [statuses, setStatuses] = useState([]);

  return (
    <StatusContext.Provider value={{ statuses, setStatuses }}>
      {children}
    </StatusContext.Provider>
  );
};

export { StatusProvider, StatusContext };