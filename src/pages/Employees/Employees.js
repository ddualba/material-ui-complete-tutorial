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
  InputAdornment,
  Button
} from '@material-ui/core'; // replace Button with Controls.Button
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridCellParams
} from '@material-ui/data-grid';
// import DeleteIcon from "@material-ui/icons/Delete";
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup';
import { EditOutlined, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';

import EditIcon from '@material-ui/icons/Edit'; // consider removing

import useTable from '../../components/useTable';
import * as employeeService from '../../services/employeeService';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
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
  { id: 'department', label: 'Department' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

function Employees() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === '') return items;
        else
          return items.filter(x =>
            x.fullName.toLowerCase().includes(target.value)
          );
      }
    });
  };

  // (employee) is an {object} sent from formik as a value object
  const addOrEdit = employee => {
    if (employee.id === 0) employeeService.insertEmployee(employee);
    else employeeService.updateEmployee(employee);
    // resetForm();
    setRecordForEdit(null);
    setOpenPopup(false); // close popUp
    setRecords(employeeService.getAllEmployees()); // fetch records again for... new/updated
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    });
  };

  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
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
          <Controls.Button
            className={classes.newButton}
            text='Add New'
            variant='outlined'
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
            startIcon={<AddIcon />}
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
                <TableCell>
                  <Controls.ActionButton
                    color='primary'
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize='small' />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color='secondary'
                    onClick={() => {
                      // onDelete(item.id);
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure you want to delete this record?',
                        subTitle: 'You can not undo this operation',
                        onConfirm: () => {
                          onDelete(item.id);
                        }
                      });
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Employee Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

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
