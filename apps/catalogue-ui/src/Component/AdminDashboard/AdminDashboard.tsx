import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';
import { faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TextField, Select, MenuItem, Switch, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUsers, deleteUser, assignRole, assignStatus } from '../../api/auth';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

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
          active: usersData.filter(user => user.status === 'active').length,
          inactive: usersData.filter(user => user.status === 'inactive').length,
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

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        const response = await deleteUser(userToDelete._id);
        setUsers(users.filter(u => u._id !== userToDelete._id));
        setDeleteDialogOpen(false);
        setUserToDelete(null);
        // Update user counts
        setUserCounts(prev => ({
          ...prev,
          total: prev.total - 1,
          active: userToDelete.status === 'active' ? prev.active - 1 : prev.active,
          inactive: userToDelete.status === 'inactive' ? prev.inactive - 1 : prev.inactive,
        }));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };
  async function handleStatusChange(index: number) {
    const user = currentUsers[index];
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await assignStatus(user.email, newStatus);
      const updatedUsers = [...users];
      updatedUsers[indexOfFirstUser + index].status = newStatus;
      setUsers(updatedUsers);
      setUserCounts(prev => ({
        ...prev,
        active: newStatus === 'active' ? prev.active + 1 : prev.active - 1,
        inactive: newStatus === 'inactive' ? prev.inactive + 1 : prev.inactive - 1,
      }));
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
                      checked={user.status === 'active'}
                      onChange={() => handleStatusChange(index)}
                      color="primary"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleDeleteClick(user)}>
                      <FontAwesomeIcon icon={faTrash} color="red" />
                    </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
            <Dialog
              open={deleteDialogOpen}
              onClose={handleDeleteCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this user? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel}>Cancel</Button>
                <Button onClick={handleDeleteConfirm} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
  );
}