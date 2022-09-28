import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const patchUsers = createAsyncThunk(
  "/userspatch",
  async ({id},thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/userspatch/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({
           status:"completed"
        }),
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const patchUsersSlice = createSlice({
  name: "userspatch",
  initialState: {
    patchFetching: false,
    patchSuccess: false,
    patchError: false,
    errorMessage: "",
  },
  reducers: {
    patchUsersclearState: (state) => {
      state.patchError = false;
      state.patchSuccess = false;
      state.patchFetching = false;
      return state;
    },
  },
  extraReducers: {
    [patchUsers.fulfilled]: (state, { payload }) => {
      state.patchFetching = false;
      state.patchSuccess = true;
      state.patchError = false;
    },
    [patchUsers.pending]: (state) => {
      state.patchFetching = true;
    },
    [patchUsers.rejected]: (state, { payload }) => {
      state.patchFetching = false;
      state.patchError = true;
      state.patchSuccess = false;
      state.errorMessage = payload.message;
    },
  },
})

export const { patchUsersclearState } = patchUsersSlice.actions;