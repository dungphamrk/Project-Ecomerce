// src/services/productService.ts
import axios from 'axios';
import { Product } from '../interfaces/types'; // Import interface Product (nếu có)

const API_URL = '  http://localhost:3000/products'; // Thay đổi URL API của bạn tại đây

export const ProductService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  },

  async addProduct(product: Product): Promise<Product> {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
  },

  async updateProduct(product: Product): Promise<Product> {
    const response = await axios.put<Product>(`${API_URL}/${product.id}`, product);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
