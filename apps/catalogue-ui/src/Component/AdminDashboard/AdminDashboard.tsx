import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TextField, Select, MenuItem, Switch, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUsers, deleteUser, assignRole, assignStatus } from '../../api/auth';
import StatCard from './StatCard';
import DashboardCard from './DashboardCard';
import UserTable from './UserTable';

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
    fetchUsers();
  }, []);

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
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete._id);
        setUsers(users.filter(u => u._id !== userToDelete._id));
        setDeleteDialogOpen(false);
        setUserToDelete(null);
        updateUserCounts(userToDelete, 'delete');
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

  const handleStatusChange = async (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await assignStatus(user.email, newStatus);
      const updatedUsers = users.map(u => 
        u._id === user._id ? { ...u, status: newStatus } : u
      );
      setUsers(updatedUsers);
      updateUserCounts(user, 'status');
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status');
    }
  };

  const handleRoleChange = async (user: User, newRole: string) => {
    try {
      await assignRole(user.email, newRole);
      const updatedUsers = users.map(u => 
        u._id === user._id ? { ...u, role: newRole } : u
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error assigning role:', error);
      setError('Failed to assign role');
    }
  };

  const updateUserCounts = (user: User, action: 'delete' | 'status') => {
    setUserCounts(prev => {
      if (action === 'delete') {
        return {
          total: prev.total - 1,
          active: user.status === 'active' ? prev.active - 1 : prev.active,
          inactive: user.status === 'inactive' ? prev.inactive - 1 : prev.inactive,
        };
      } else {
        return {
          ...prev,
          active: user.status === 'active' ? prev.active - 1 : prev.active + 1,
          inactive: user.status === 'inactive' ? prev.inactive - 1 : prev.inactive + 1,
        };
      }
    });
  };

  // New function to handle navigation to AddMember.tsx
  const handleAddMemberClick = () => {
    navigate('/AddMember'); // Assuming '/AddMember' is the route for AddMember component
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="flex-1 ml-64 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatCard
            icon={faUsers}
            title="Total Users"
            total={userCounts.total.toString()}
            active={`Active Users ${userCounts.active}`}
            inactive={`Inactive Users ${userCounts.inactive}`}
          />
          <DashboardCard
            icon="../src/app/assets/Managestatus.png"
            title="Manage Projects"
            description="Click to manage projects"
            onClick={() => navigate('/ManageProject')}
          />
          <DashboardCard
            icon="../src/app/assets/projects.png"
            title="Manage Project Status"
            description="Click to manage project statuses"
            onClick={() => navigate('/ProjectStatus')}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">User Management</h2>
          <Button variant="contained" color="primary" onClick={handleAddMemberClick}>
            Add New Member
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />
          <UserTable
            users={currentUsers}
            onDelete={handleDeleteClick}
            onStatusChange={handleStatusChange}
            onRoleChange={handleRoleChange}
          />
        </div>

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
