import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllAccount, register, login, logout } from '../../services/user.service';

export interface UserState {
  users: any[];
  currentUser: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllAccount.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch accounts';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register user';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login user';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to logout user';
      });
  },
});

export default userSlice.reducer;
