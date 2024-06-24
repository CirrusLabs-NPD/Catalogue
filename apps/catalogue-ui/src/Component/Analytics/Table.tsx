import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

interface Column {
  id: 'name' | 'projectmanager' | 'duedate' | 'status' | 'progress';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'projectmanager', label: 'Project Manager', minWidth: 100 },
  {
    id: 'duedate',
    label: 'Due Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'progress',
    label: 'Progress',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  name: string;
  projectmanager: string;
  duedate: string;
  status: string;
  progress: string;
}

function createData(
  name: string,
  projectmanager: string,
  duedate: string,
  status: string,
  progress: string,
): Data {
  return { name, projectmanager, duedate, status, progress };
}

const rows = [
  createData('Cirrus Insights Now', 'Praveen Raj', 'Mar 20th, 2022', 'Completed','100%'),
  createData('Resume Mining', 'Arjun Rathod', 'Feb 12th, 2022', 'Completed','100%'),
  createData('GeniBid', 'Rohan Shah', 'Dec 25th, 2023', 'Completed','100%'),
  createData('Humanoid ChatBot', 'Aakash Bharadwaj', 'Jan 2nd, 2023', 'Ongoing','20%'),
  createData('Internal Project Catalogue', 'Aakash Bharadwaj', 'Oct 22th, 2024', 'Ongoing','20%'),

];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="h6" component="div" style={{ fontFamily: 'Quicksand', fontWeight: 'regular', fontSize:'5' }}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.projectmanager}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Typography variant="h6" component="div" style={{ fontFamily: 'Quicksand', fontWeight: 'lighter', fontSize:'5' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}