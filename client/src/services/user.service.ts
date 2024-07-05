import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllAccount: any = createAsyncThunk(
  "user/getAllAccount",
  async () => {
    const res = await axios.get("http://localhost:3000/users");
    return res.data;
  }
);

export const register: any = createAsyncThunk(
  "user/registerUser",
  async (newUser: any) => {
    console.log(newUser);
    
    const response = await axios.post("http://localhost:3000/users",newUser  );
    return response.data;
  }
);

export const login: any = createAsyncThunk(
  "user/login",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:3000/users/${id}`);
    return response.data;
  }
);

export const logout: any = createAsyncThunk(
  "user/logoutUser",
  async (id: number) => {
    const response = await axios.patch(`http://localhost:3000/users/${id}`);
    return response.data;
  }
);