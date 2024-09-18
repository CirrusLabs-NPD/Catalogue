import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, CircularProgress, TableContainer } from '@mui/material';
import { Project } from '../ProjectInterface';
import { styled } from '@mui/material/styles';

interface ProjectApprovalTableProps {
  projects: Project[];
  onApprove: (projectId: string) => void;
  onReject: (projectId: string) => void;
  loading?: boolean;
}

// Styled components using MUI's styling solution
const StyledTableContainer = styled(TableContainer)({
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledTableCell = styled(TableCell)({
  padding: '16px',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ProjectApprovalTable: React.FC<ProjectApprovalTableProps> = ({ projects, onApprove, onReject, loading = false }) => {
  return (
    <Paper elevation={3} style={{ borderRadius: '8px' }}>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Project Name</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Project Manager</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Start Date</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <StyledTableRow key={project._id}>
                <StyledTableCell>{project.projectName}</StyledTableCell>
                <StyledTableCell>{project.projectManager}</StyledTableCell>
                <StyledTableCell>
                  {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                </StyledTableCell>
                <StyledTableCell>
                  <Button 
                    component={Link}
                    to={`/description/${project._id}`}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: '8px', borderRadius: '20px' }}
                    aria-label={`View details for ${project.projectName}`}
                  >
                    View
                  </Button>
                  <Button 
                    onClick={() => onApprove(project._id)} 
                    variant="contained" 
                    color="primary" 
                    style={{ marginRight: '8px', borderRadius: '20px' }}
                    aria-label={`Approve ${project.projectName}`}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} style={{ color: '#fff' }} /> : 'Approve'}
                  </Button>
                  <Button 
                    onClick={() => onReject(project._id)} 
                    variant="contained" 
                    color="error"
                    style={{ borderRadius: '20px' }}
                    aria-label={`Reject ${project.projectName}`}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} style={{ color: '#fff' }} /> : 'Reject'}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Paper>
  );
};

export default ProjectApprovalTable;
