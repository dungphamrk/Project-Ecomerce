// src/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interfaces/types'; // Import the Product interface
import { ProductService } from '../../services/products.service'; // Import the ProductService

// Define the initial state using the Product interface
export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  modalOpen: false,
};

// Async thunk for fetching all products
export const fetchProducts:any = createAsyncThunk('products/fetchAll', async () => {
  const products = await ProductService.getAllProducts();
  return products;
});

// Async thunk for adding a product
export const addProduct:any = createAsyncThunk('products/add', async (product: Product) => {
  const newProduct = await ProductService.addProduct(product);
  return newProduct;
});

// Async thunk for updating a product
export const updateProduct:any = createAsyncThunk('products/update', async (product: Product) => {
  const updatedProduct = await ProductService.updateProduct(product);
  return updatedProduct;
});

// Async thunk for deleting a product
export const deleteProduct:any = createAsyncThunk('products/delete', async (id: number) => {
  await ProductService.deleteProduct(id);
  return id;
});

// Create the product slice
const productSlice = createSlice({
  name: 'products',
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add product';
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

// Export the actions
export const { openModal, closeModal } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
