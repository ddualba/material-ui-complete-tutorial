import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment
} from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridCellParams
} from '@material-ui/data-grid';
// import DeleteIcon from "@material-ui/icons/Delete";
import Controls from '../../components/controls/Controls';
import { Search } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  }
}));

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 150
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 150
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 150
  },
  {
    field: 'edit',
    headerName: 'Edit Delete',
    sortable: false,
    width: 200,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <Button
          size='small'
          variant='contained'
          color='primary'
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      );
    }
  }
];

const rows = [
  { id: 1, fullName: 'Dar Dualba', email: 'ddualba@gmail.com', age: 35 },
  { id: 2, fullName: 'Maria Silveyra', email: 'maria@gmail.com', age: 42 },
  { id: 3, fullName: 'Evan Lannister', email: 'evan@outlook.com', age: 45 },
  { id: 4, fullName: 'Stark Jones', email: 'stark@yahoo.com', age: 16 }
];

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department', disableSorting: true }
];

function Employees() {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    }
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == '') return items;
        else
          return items.filter(x =>
            x.fullName.toLowerCase().includes(target.value)
          );
      }
    });
  };

  return (
    <>
      <PageHeader
        title='New Employee'
        subTitle='Form design with validation'
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />

        <Toolbar>
          <Controls.Input
            className={classes.searchInput}
            label='Search Employees'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      {/* <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          // pageSize={5}
          // checkboxSelection
          // disableSelectionOnClick
        />
      </div> */}
    </>
  );
}

export default Employees;
