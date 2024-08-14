import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';
import { faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TextField, Select, MenuItem, Switch } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUsers, deleteUser, assignRole } from '../../api/auth';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userCounts, setUserCounts] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsers();
        const usersData: User[] = response || [];
        setUsers(usersData);
        setUserCounts({
          total: usersData.length,
          active: usersData.filter(user => user.status).length,
          inactive: usersData.filter(user => !user.status).length,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const nPages = Math.ceil(filteredUsers.length / usersPerPage);

  async function handleDeleteUser(index: number) {
    const user = currentUsers[index];
    try {
      await deleteUser(user._id);
      setUsers(users.filter(u => u._id !== user._id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  }

  async function handleStatusChange(index: number) {
    const user = currentUsers[index];
    try {
      const updatedUsers = [...users];
      updatedUsers[indexOfFirstUser + index].status = !user.status;
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status');
    }
  }

  async function handleRoleChange(index: number, newRole: string) {
    const user = currentUsers[index];
    try {
      await assignRole(user.email, newRole);
      const updatedUsers = [...users];
      updatedUsers[indexOfFirstUser + index].role = newRole;
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error assigning role:', error);
      setError('Failed to assign role');
    }
  }

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <div className="flex-1 mt-5">
        <h2 className="text-xl font-semibold  ml-64" style={{ color: '#0f3374' }}>
          Admin Dashboard
        </h2>
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
                <h4 className="font-semibold">Click to manage projects</h4>
              </div>
            </a>
          </div>
          <div onClick={() => navigate('/ProjectStatus')}>
            <a className="flex items-center p-4 bg-white rounded-lg shadow h-35 pb-7">
              <img src="../src/app/assets/projects.png" alt="ProjectStatus" className="h-10 w-10" />
              <div className="pl-4">
                <h2 className="text-xl font-bold" style={{ color: '#0f3374' }}>Manage Project Status</h2>
                <h4 className="font-semibold">Click to manage project statuses</h4>
              </div>
            </a>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4 ml-64" style={{ color: '#0f3374' }}>
          User Management
        </h2>
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
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(index, e.target.value as string)}
                      className="w-full"
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="member">Member</MenuItem>
                    </Select>
                  </td>
                  <td className="py-2 px-4">
                    <Switch
                      checked={user.status}
                      onChange={() => handleStatusChange(index)}
                      color="primary"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleDeleteUser(index)}>
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