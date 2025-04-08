import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await instance.get('/posts');
    return response.data;
  }
);