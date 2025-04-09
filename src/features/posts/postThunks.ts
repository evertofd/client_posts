import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios';

/**
* @Everto Farias
* @description: Thunk para obtener todos los posts desde el servidor mediante una petición GET
* @param: createAsyncThunk (función de Redux Toolkit para crear thunks asíncronos)
* @return: Función que devuelve los datos de los posts recibidos desde el API
*/

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await instance.get('/posts');
    return response.data;
  }
);