import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const putStatus = createAsyncThunk(
  "/usersput",
  async ({id},thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_PATH}/usersput/${id}`,
        {
          method: "PUT",
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


export const putStatusSlice = createSlice({
  name: "usersput",
  initialState: {
    putStatusFetching: false,
    putStatusSuccess: false,
    putStatusError: false,
    errorMessage: "",
  },
  reducers: {
    putStatusclearState: (state) => {
      state.putStatusError = false;
      state.putStatusSuccess = false;
      state.putStatusFetching = false;
      return state;
    },
  },
  extraReducers: {
    [putStatus.fulfilled]: (state, { payload }) => {
      state.putStatusFetching = false;
      state.putStatusSuccess = true;
      state.putStatusError = false;
    },
    [putStatus.pending]: (state) => {
      state.putStatusFetching = true;
    },
    [putStatus.rejected]: (state, { payload }) => {
      state.putStatusFetching = false;
      state.putStatusError = true;
      state.putStatusSuccess = false;
      state.errorMessage = payload.message;
    },
  },
})

export const { putStatusclearState } = putStatusSlice.actions;