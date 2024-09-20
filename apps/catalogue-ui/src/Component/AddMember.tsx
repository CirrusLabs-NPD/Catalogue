import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { addMember, deleteMember, getMembers, updateMember } from '../api/auth';
import { Member } from './ProjectInterface';
import { PlusCircle } from 'lucide-react';

const AdminDashboard = () => {
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

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await getMembers();
        setMembers(fetchedMembers);
      } catch (err) {
        setError('Failed to fetch members');
      }
    };
    fetchMembers();
  }, []);

  const handleInputChange = (field: keyof Omit<Member, '_id'>, value: string | string[]) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setNewMember({ name: '', email: '', title: '', techStack: [], projects: [] });
  };

  const handleAddMember = async () => {
    try {
      const addedMember = await addMember(newMember);
      setMembers(prev => [...prev, addedMember]);
      setSuccess('Member added successfully');
      resetForm();
    } catch (err) {
      setError('Failed to add member');
    }
  };
  
  const handleUpdateMember = async (id: string) => {
    try {
      const updatedMember = await updateMember(id, newMember);
      setMembers(prev =>
        prev.map(member => (member._id === id ? updatedMember : member))
      );
      setSuccess('Member updated successfully');
    } catch (err) {
      setError('Failed to update member');
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      await deleteMember(id);
      setMembers(prev => prev.filter(member => member._id !== id));
      setSuccess('Member deleted successfully');
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  return (
    <div className="admin-dashboard ml-64 p-6 lg:p-10">
      <h1 className="text-2xl font-semibold mb-4">Add New Member</h1>
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
          onChange={(e) => handleInputChange('techStack', e.target.value.split(',').map(item => item.trim()))}
          fullWidth
        />
        <TextField
          label="Projects (comma separated)"
          value={newMember.projects.join(', ')}
          onChange={(e) => handleInputChange('projects', e.target.value.split(',').map(item => item.trim()))}
          fullWidth
        />
        <button
          onClick={handleAddMember} 
          className="group flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-sans font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          <PlusCircle className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span className="text-sm uppercase tracking-wider">Add Member</span>
        </button>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Members List</h2>
      {members.map(member => (
        <div key={member._id} className="member-item p-4 mb-4 border rounded-lg shadow-sm">
          <p><strong>Name:</strong> {member.name}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Title:</strong> {member.title}</p>
          <p><strong>Tech Stack:</strong> {member.techStack.join(', ')}</p>
          <p><strong>Projects:</strong> {member.projects.join(', ')}</p>
          <div className="mt-2 flex space-x-2">
            <Button variant="contained" color="secondary" onClick={() => handleUpdateMember(member._id)}>
              Update
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDeleteMember(member._id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success} 
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
