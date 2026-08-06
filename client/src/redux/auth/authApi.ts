import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/src/mock/apiCall";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { message: error.message }
        );
      }
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (loginData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { message: error.message }
        );
      }
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { message: error.message }
        );
      }
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || { message: error.message }
        );
      }
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);