// src/services/categoryservice.ts
import axios from 'axios';
import { Category } from '../interfaces/types'; // Import interface Category (nếu có)

const API_URL = '  http://localhost:3000/categories'; // Thay đổi URL API của bạn tại đây

export const CategoryService = {

  async getAllCategory(): Promise<Category> {
    const response = await axios.get<Category>(API_URL);
    return response.data;
  },

  async addCategory(category: Category): Promise<Category> {
    const response = await axios.post<Category>(API_URL, category);
    return response.data;
  },

  async updateCategory(category: Category): Promise<Category> {
    const response = await axios.put<Category>(`${API_URL}/${category.id}`, category);
    return response.data;
  },

  async deleteCategory(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
