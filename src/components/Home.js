import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList';
import MuiDialog from "./MuiDialog";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, getUsersclearState } from "../store/reducers/usersReducer/getUsers";
import { postUsersclearState } from "../store/reducers/usersReducer/postUsers";
import { putUsersclearState, putUsers } from "../store/reducers/usersReducer/editUsers";
import { deleteUsersclearState } from "../store/reducers/usersReducer/deleteUsers";
import { putStatus, putStatusclearState } from "../store/reducers/usersReducer/userStatus";



const Home = () => {
  const { usersdata, isSuccess } = useSelector((state) => state.getUsersSlice);
  const { postSuccess } = useSelector((state) => state.postUsersSlice);
  const { deleteSuccess } = useSelector((state) => state.deleteUsersSlice);
  const { putSuccess } = useSelector((state) => state.putUsersSlice);
  const { putStatusSuccess } = useSelector((state) => state.putStatusSlice);
  const dispatch = useDispatch()
  const [allData, setAllData] = React.useState([])
  const [openFilter, setOpenFilter] = React.useState(false)
  const [filterData, setFilterData] = React.useState(null)
  const [editState, setEditState] = React.useState(null)
  const [openDelete, setOpenDelete] = React.useState(false)
  const [deleteItem, setDeleteItem] = React.useState(null)

  // formik module for state management and validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter name"),
      email: yup.string().required("Enter email"),
      phone: yup.string().required("Enter phone no"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(putUsers({ values, id: editState }));
    },
  });

  // useEffect for call users data
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  // useEffect for server response
  React.useEffect(() => {
    if (isSuccess) {
      setAllData(usersdata)
      dispatch(getUsersclearState());
    }
    if (postSuccess) {
      toast.success('Sucessfully Updated', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getUsers());
      dispatch(postUsersclearState());
    }
    if (deleteSuccess) {
      toast.error("successfully Deleted", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getUsers());
      dispatch(deleteUsersclearState());
    }
    if (putSuccess) {
      toast.success('successfully Edited', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setEditState(null)
      dispatch(putUsersclearState());
      dispatch(getUsers());
    }
    if (putStatusSuccess) {
      toast.success('Status Completed', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEditState(null)
      dispatch(getUsers());
      dispatch(putStatusclearState());
    }
    if (filterData !== null) {
      if (filterData.length === 1 && filterData[0] !== "all") {
        filterData.map((data) => {
          const filter1 = usersdata.filter((ele) => ele.status === data)
          setAllData(filter1)
          return filter1;
        })
      } else {
        setAllData(usersdata)
      }
    }
  }, [isSuccess, dispatch, usersdata, postSuccess, deleteSuccess, putSuccess, putStatusSuccess, filterData])

  // onClick for filter item
  const onClickFilter = () => {
    setOpenFilter(true)
  }

  // onClick for Delete item
  const deleteOnclick = (id) => {
    setDeleteItem(id);
    setOpenDelete(true)
  }

  // onClick for Edit item
  const editOnclick = (ele) => {
    formik.setValues((preValue) => {
      return {
        ...preValue,
        name: ele.name,
        email: ele.email,
        phone: ele.phone
      }
    })
    setEditState(ele.id)
  }

  // onClick for table status
  const statusOnclick = (id) => {
    dispatch(putStatus({ id: id }));
  }

  // onClickAway for ClickAwayListener of mui
  const outSideClick = () => {
    setEditState(null)
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5">
              Users Details
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
            <Link to="/form" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large" type="submit" color="success">
                Add
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <form onSubmit={formik.handleSubmit} >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ minWidth: 100 }}
                        >
                          <Typography>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ minWidth: 100 }}
                        >
                          <Typography>
                            Email
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ minWidth: 100 }}
                        >
                          <Typography>
                            Phone
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ minWidth: 100 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FilterListIcon onClick={onClickFilter} sx={{ mr: 1 }} />
                            <Typography>
                              Status
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ minWidth: 100 }}
                        >
                          <Typography>
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <ClickAwayListener onClickAway={outSideClick}>
                      <TableBody>
                        {allData.map((ele) => {
                          return (
                            <TableRow hover key={ele.id}>
                              <TableCell>
                                {
                                  editState !== ele.id || editState === null ?
                                    ele.name :

                                    <TextField
                                      placeholder="Enter phone name"
                                      fullWidth
                                      name="name"
                                      value={formik.values.name}
                                      onChange={formik.handleChange}
                                      error={formik.touched.name && Boolean(formik.errors.name)}
                                      helperText={formik.touched.name && formik.errors.name}
                                      variant="standard" />
                                }
                              </TableCell>
                              <TableCell>
                                {
                                  editState !== ele.id ?
                                    ele.email :
                                    <TextField
                                      placeholder="Enter phone email"
                                      fullWidth
                                      name="email"
                                      value={formik.values.email}
                                      onChange={formik.handleChange}
                                      error={formik.touched.email && Boolean(formik.errors.email)}
                                      helperText={formik.touched.email && formik.errors.email}
                                      variant="standard" />
                                }
                              </TableCell>
                              <TableCell>
                                {
                                  editState !== ele.id ?
                                    ele.phone :
                                    <TextField
                                      placeholder="Enter phone number"
                                      fullWidth
                                      type="text"
                                      name="phone"
                                      value={formik.values.phone}
                                      onChange={formik.handleChange}
                                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                                      helperText={formik.touched.phone && formik.errors.phone}
                                      variant="standard" />
                                }
                              </TableCell>
                              <TableCell>
                                {ele.status !== null ?
                                  <Button variant="contained" disabled>completed</Button>
                                  :
                                  <Button variant="contained" color="success" onClick={() => statusOnclick(ele.id)}>complete</Button>
                                }
                              </TableCell>
                              <TableCell>
                                {
                                  editState !== ele.id ?
                                    <Box>
                                      {ele.status !== null ?
                                        <Button variant="outlined" sx={{ mr: 1 }} disabled>Edit</Button>
                                        :
                                        <Button variant="outlined" sx={{ mr: 1 }} color="success" onClick={() => editOnclick(ele)}>Edit</Button>
                                      }
                                      <Button variant="outlined" color="error" onClick={() => deleteOnclick(ele.id)}>Delete</Button>
                                    </Box>
                                    :
                                    <Button variant="contained" type="submit" color="success">Update</Button>
                                }
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </ClickAwayListener>
                  </Table>
                </form>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      < MuiDialog openFilter={openFilter} setOpenFilter={setOpenFilter} filterData={filterData} setFilterData={setFilterData} deleteItem={deleteItem} openDelete={openDelete} setOpenDelete={setOpenDelete} />
      <ToastContainer />
    </>
  );
}


export default Home;