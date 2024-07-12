// src/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/types'; // Import the User interface
import { UserService } from '../../services/user.service'; // Import the UserService
import axios from 'axios';

// Define the initial state using the User interface
export interface UserState {
  users: User[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
}

const initialState: UserState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  modalOpen: false,
};

// Async thunks for fetching, registering, updating, and deleting users
export const fetchPaginatedUsers: any = createAsyncThunk(
  "users/fetchPaginatedUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `http://localhost:3000/users?_page=${page}&_limit=${limit}`
    );
    return {
      users: response.data,
      totalPages: Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      ),
    };
  }
);
export const getAllUser: any = createAsyncThunk(
  "users/getAll",
  async () => {
    const data = await UserService.getAllUsers();
    return data;
  });

export const registerUser:any = createAsyncThunk('users/registerUser', async (newUser: User) => {
  const response = await axios.post('http://localhost:3000/users', newUser);
  return response.data;
});

export const updateUser:any = createAsyncThunk('users/updateUser', async (updatedUser: User) => {
  const response = await axios.put(`http://localhost:3000/users/${updatedUser.id}`, updatedUser);
  return response.data;
});

export const deleteUser:any = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`http://localhost:3000/users/${id}`);
  return id;
});

// Slice definition
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    
    builder
      // Fetch all users
      .addCase(getAllUser.fulfilled, (state,action) => {
        state.users=action.payload;
      })
      .addCase(fetchPaginatedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register user';
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

// Export the actions
export const { openModal, closeModal } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
