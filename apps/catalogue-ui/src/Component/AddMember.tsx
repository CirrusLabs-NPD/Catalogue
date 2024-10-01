import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { addMember, deleteMember, getMembers, updateMember } from '../api/auth';
import { Member } from './ProjectInterface';
import { PlusCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [newMember, setNewMember] = useState<Omit<Member, '_id'>>({
    name: '',
    email: '',
    title: '',
    techStack: [],
    projects: []
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const fetchedMembers = await getMembers();
      setMembers(fetchedMembers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to fetch members: ${errorMessage}`);
      console.error('Error fetching members:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Omit<Member, '_id'>, value: string | string[]) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setNewMember({ name: '', email: '', title: '', techStack: [], projects: [] });
    setEditingMemberId(null);
  };

  const handleAddOrUpdateMember = async () => {
    setIsLoading(true);
    try {
      if (editingMemberId) {
        // Update member
        await handleUpdateMember(editingMemberId);
      } else {
        // Add new member
        const addedMember = await addMember(newMember);
        setMembers(prev => [...prev, addedMember]);
        setSuccess('Member added successfully');
      }
      resetForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to ${editingMemberId ? 'update' : 'add'} member: ${errorMessage}`);
      console.error(`Error ${editingMemberId ? 'updating' : 'adding'} member:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMember = async (id: string) => {
    const updatedFields: Partial<Omit<Member, '_id'>> = {};
    for (const [key, value] of Object.entries(newMember)) {
      if (value !== '') {
        updatedFields[key as keyof Omit<Member, '_id'>] = value;
      }
    }
    if (Object.keys(updatedFields).length > 0) {
      const updatedMember = await updateMember(id, updatedFields);
      setMembers(prev =>
        prev.map(member => (member._id === id ? { ...member, ...updatedMember } : member))
      );
      setSuccess('Member updated successfully');
    } else {
      setError('No changes to update');
    }
  };

  const handleDeleteMember = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteMember(id);
      setMembers(prev => prev.filter(member => member._id !== id));
      setSuccess('Member deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to delete member: ${errorMessage}`);
      console.error('Error deleting member:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = (member: Member) => {
    setNewMember({
      name: member.name,
      email: member.email,
      title: member.title,
      techStack: member.techStack,
      projects: member.projects
    });
    setEditingMemberId(member._id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <div className="admin-dashboard ml-64 p-6 lg:p-10">
      <h1 className="text-2xl font-semibold mb-4">
        {editingMemberId ? 'Edit Member' : 'Add New Member'}
      </h1>
      <div className="mb-8 max-w-lg space-y-4">
        <TextField
          label="Name"
          value={newMember.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={newMember.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          fullWidth
        />
        <TextField
          label="Title"
          value={newMember.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          fullWidth
        />
        <TextField
          label="Tech Stack (comma separated)"
          value={newMember.techStack.join(', ')}
          onChange={(e) =>
            handleInputChange('techStack', e.target.value.split(',').map(item => item.trim()))
          }
          fullWidth
        />
        <TextField
          label="Projects (comma separated)"
          value={newMember.projects.join(', ')}
          onChange={(e) =>
            handleInputChange('projects', e.target.value.split(',').map(item => item.trim()))
          }
          fullWidth
        />
        <button
          onClick={handleAddOrUpdateMember}
          disabled={isLoading}
          className="group flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-sans font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90" />
              <span className="text-sm uppercase tracking-wider">
                {editingMemberId ? 'Update Member' : 'Add Member'}
              </span>
            </>
          )}
        </button>
        {editingMemberId && (
          <Button onClick={handleCancelEdit} variant="outlined" disabled={isLoading}>
            Cancel
          </Button>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Members List</h2>
      {isLoading && members.length === 0 ? (
        <CircularProgress />
      ) : members.length === 0 ? (
        <p>No members found. Add a new member to get started.</p>
      ) : (
        members.map(member => (
          <div key={member._id} className="member-item p-4 mb-4 border rounded-lg shadow-sm">
            <p><strong>Name:</strong> {member.name}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Title:</strong> {member.title}</p>
            <p><strong>Tech Stack:</strong> {member.techStack.join(', ')}</p>
            <p><strong>Projects:</strong> {member.projects.join(', ')}</p>
            <div className="mt-2 flex space-x-2">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEditMember(member)}
                disabled={isLoading || editingMemberId !== null}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteMember(member._id)}
                disabled={isLoading || editingMemberId !== null}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
