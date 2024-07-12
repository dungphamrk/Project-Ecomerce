// src/slices/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../interfaces/types"; // Import the Category interface
import { CategoryService } from "../../services/category.service"; // Import the CategoryService
import axios from "axios";
import state from "sweetalert/typings/modules/state";

// Define the initial state using the Category interface
export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  totalPages: number;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  modalOpen: false,
  totalPages: 1,
};

// Async thunk for fetching all categories
export const fetchPaginatedCategories: any = createAsyncThunk(
  "categories/fetchPaginatedCategories",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `http://localhost:3000/categories?_page=${page}&_limit=${limit}`
    );
    return {
      categories: response.data,
      totalPages: Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      ),
    };
  }
);
export const getAllCategory: any = createAsyncThunk(
  "categories/getAll",
  async () => {
    const data = await CategoryService.getAllCategory();
    return data;
  }
);

// Async thunk for adding a category
export const addCategory: any = createAsyncThunk(
  "categories/add",
  async (category: Category) => {
    const newCategory = await CategoryService.addCategory(category);
    return newCategory;
  }
);

// Async thunk for updating a category
export const updateCategory: any = createAsyncThunk(
  "categories/update",
  async (category: Category) => {
    const updatedCategory = await CategoryService.updateCategory(category);
    return updatedCategory;
  }
);

// Async thunk for deleting a category
export const deleteCategory: any = createAsyncThunk(
  "categories/delete",
  async (id: number) => {
    await CategoryService.deleteCategory(id);
    return id;
  }
);

// Create the category slice
const categorySlice = createSlice({
  name: "categories",
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
      .addCase(getAllCategory.fulfilled, (state,action) => {
        state.categories=action.payload;
      })
      .addCase(fetchPaginatedCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add category";
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.id
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update category";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete category";
      });
  },
});

// Export the actions
export const { openModal, closeModal } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;
