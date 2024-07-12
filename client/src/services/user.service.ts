// src/services/userService.ts
import axios from 'axios';
import { User } from '../interfaces/types'; // Ensure you have a User interface defined

const API_URL = 'http://localhost:3000/users'; // Update your API URL if needed

export const UserService = {
  async getAllUsers(): Promise<User> {
    const response = await axios.get<User>(API_URL);
    return response.data;
  },

  async registerUser(newUser: User): Promise<User> {
    const response = await axios.post<User>(API_URL, newUser);
    return response.data;
  },

  async updateUser(id: number): Promise<User> {
    const response = await axios.patch<User>(`${API_URL}/${id}`);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await axios.patch(`${API_URL}/${id}`);
  },
};
