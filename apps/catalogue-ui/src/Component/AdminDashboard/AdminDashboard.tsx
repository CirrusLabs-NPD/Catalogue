import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';
import { faUsers, faFileAlt, faTrash ,faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { TextField, Select, MenuItem, Switch, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userCounts, setUserCounts] = useState({
    total: 100,
    active: 80,
    inactive: 20,
  });

  const usersPerPage = 5;

  useEffect(() => {
    // Fetch users here and set them to `setUsers`
    // Also, calculate and set `userCounts` based on fetched data
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const nPages = Math.ceil(filteredUsers.length / usersPerPage);

  function handleDeleteUser(index: number): void {
    // Handle user deletion logic here
  }

  function handleStatusChange(index: number): void {
    // Handle status change logic here
  }

  function handleRoleChange(index: number, value: any): void {
    // Handle role change logic here
  }

  return (
      <div className="flex">
        
        {/* Main Content */}
        <div className="flex-1 mt-5">
          <h2 className="text-xl font-semibold  ml-64" style={{ color: '#0f3374' }}>
            Admin Dashboard
          </h2>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-8 ml-64">
            <StatCard
              icon={faUsers}
              title="Total Users"
              total={userCounts.total.toString()}
              active={`Active Users ${userCounts.active}`}
              inactive={`Inactive Users ${userCounts.inactive}`}  
            />
            <div onClick={() => navigate('/ManageProject')}>
            <a className="flex items-center p-4 bg-white rounded-lg shadow h-35 pb-7">
                <img src="../src/app/assets/Managestatus.png" alt="Project Status Icon" className="h-10 w-10" />
                <div className="pl-4">
                  <h2 className="text-xl font-bold" style={{ color: '#0f3374' }}>Manage Projects</h2>
                  <h4 className="font-semibold" >Click to manage projects</h4>
                </div>
              </a>
            </div>
            <div onClick={() => navigate('/ProjectStatus')}>
              <a className="flex items-center p-4 bg-white rounded-lg shadow h-35 pb-7">
                <img src="../src/app/assets/projects.png" alt="ProjectStatus" className="h-10 w-10" />
                <div className="pl-4">
                  <h2 className="text-xl font-bold" style={{ color: '#0f3374' }}>Manage Project Status</h2>
                  <h4 className="font-semibold" >Click to manage project statuses</h4>
                </div>
              </a>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4 ml-64" style={{ color: '#0f3374' }}>
            User Management
          </h2>
          {/* User Management */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-9/12 ml-64 overflow-x-auto">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type to search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </div>
          <div className="overflow-x-auto ml-64">
            <table className="w-full min-w-max justify-center">
              <thead>
                <tr className="border-b justify-center">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Role</th>
                  <th className="text-left py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(indexOfFirstUser + index, e.target.value)}
                        className="w-full"
                      >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                      </Select>
                    </td>
                    <td className="py-2 px-4">
                      <Switch
                        checked={user.status}
                        onChange={() => handleStatusChange(indexOfFirstUser + index)}
                        color="primary"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <button onClick={() => handleDeleteUser(indexOfFirstUser + index)}>
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
