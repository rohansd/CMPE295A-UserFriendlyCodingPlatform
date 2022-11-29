// import * as React from 'react';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { BorderClear } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectSmall() {
  // const [ds, setDS] = React.useState('');

  // const changeDataStructure = async (event) => {
  //   setDS(event.target.ds);
  //   try {
  //     const response = await axios.get('http://localhost:5000/get_problems_by_ds', ds);
  //     console.log("********** questions :", response);
  //     setQuestions(response.data) 
  //   } catch (error) {
  //     console.error("***********",error.message);
  //   }
  // };

  // return (
  //   <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
  //     <InputLabel id="demo-select-small">Select Data Structure</InputLabel>
  //     <Select
  //       labelId="demo-select-small"
  //       id="demo-select-small"
  //       value={ds}
  //       label="Data Structures"
  //       onChange={changeDataStructure}
  //     >
  //       <MenuItem value="">
  //         <em>All</em>
  //       </MenuItem>
  //       <MenuItem value={10}>Array</MenuItem>
  //       <MenuItem value={20}>Tree</MenuItem>
  //       <MenuItem value={30}>String</MenuItem>
  //       <MenuItem value={40}>HashTable</MenuItem>
  //       <MenuItem value={50}>DFS</MenuItem>
  //     </Select>
  //   </FormControl>
  // );
}
function createData(id, title, acceptance, difficulty, frequency) {
  return {
        id,
        title,
        acceptance,
        difficulty,
        frequency
  };
}

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'acceptance',
    numeric: true,
    disablePadding: false,
    label: 'Acceptance',
  },
  {
    id: 'difficulty',
    numeric: true,
    disablePadding: false,
    label: 'Difficulty',
  },
  {
    id: 'frequency',
    numeric: true,
    disablePadding: false,
    label: 'Frequency',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                        <Box component="span"
                            // sx={visuallyHidden}
                        >
                  {order === 'desc' ? '(sorted descending)' : '(sorted ascending)'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Coding Problems
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function Problems() {
  let history = useHistory();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('acceptance');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ds, setDS] = React.useState('All');

  // ****************
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/get_problems');
        console.log("********** questions :", response);
        setQuestions(response.data)
      } catch (error) {
        console.error("***********",error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  // ****************

  const changeDataStructure = async (event) => {
    event.preventDefault();
    setDS(event.target.value);
    console.log("Ds value is :", event.target.value, ds);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const clickToRedirect = (event, title) => {
    localStorage.setItem("questionTitle", title);
      history.push("/problems");
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (title) => selected.indexOf(title) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

  return (
    
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* <Typography variant="h2">PROBLEM LIST</Typography> */}
        </Grid>
        <Grid item xs={4}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Select Data Structure</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={ds}
              label="Data Structures"
              onChange={changeDataStructure}
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Array"}>Array</MenuItem>
              <MenuItem value={"Tree"}>Tree</MenuItem>
              <MenuItem value={"String"}>String</MenuItem>
              <MenuItem value={"HashTable"}>HashTable</MenuItem>
              <MenuItem value={"DFS"}>DFS</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={questions.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(questions, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="button"
                      key={row.Id}
                    >
                      <TableCell align="center">{row.Id}</TableCell>
                      <TableCell align="center">
                        <Button
                        style={{
                            backgroundColor: "#fff",
                            width: "500px"
                        }}
                        variant="contained" href="/codescreen"
                          onClick={(event) => clickToRedirect(event, row.Title)}>{row.Title}
                        </Button>
                      </TableCell>
                      <TableCell align="center">{row.Acceptance}</TableCell>
                      <TableCell align="center">{row.Difficulty}</TableCell>
                      <TableCell align="center">{row.Frequency}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}