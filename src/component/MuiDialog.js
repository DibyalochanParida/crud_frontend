import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from "@mui/material/Checkbox";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { deleteUsers } from "../store/reducers/usersReducer/deleteUsers";
import { useSelector, useDispatch } from 'react-redux';


export default function MuiDialog({ openFilter, setOpenFilter, setFilterData, deleteItem, openDelete, setOpenDelete }) {
  const { deleteFetching, deleteSuccess, deleteError } = useSelector((state) => state.deleteUsersSlice);
  const dispatch = useDispatch()
  const selected = [];

  React.useEffect(() => {
    if (deleteSuccess) {
      setOpenDelete(false)
    }
  }, [deleteSuccess])
  
  const handleClose = () => {
    setOpenFilter(false);
  };
  const handleSelected = () => {
    setFilterData(selected)
    setOpenFilter(false);
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const handleDelete = () => {
    dispatch(deleteUsers({ id: deleteItem }));
  }

  return (
    <>
      {/* dialog for Delete */}
      <Dialog disableEscapeKeyDown open={openDelete} onClose={handleCloseDelete}>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* dialog for filter */}
      <Dialog disableEscapeKeyDown open={openFilter} onClose={handleClose}>

        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <Grid container spacing={0}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox color="success" onClick={() => selected.push(null)} />
              <Typography variant="body2">Active</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox color="success" onClick={() => selected.push("completed")} />
              <Typography variant="body2">Completed</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox color="success" onClick={() => selected.push("all")} />
              <Typography variant="body2">All</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSelected}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
