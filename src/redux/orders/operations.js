import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getOrders = wrapAsyncThunk(
  'orders/getAll',
  async ({ page = 1, limit = 12 }) => {
    const response = await api.get('/orders', { params: { page, limit } });
    return response.data.data;
  }
);

export const postOrders = wrapAsyncThunk(
  'orders/createOrder',
  async (payload) => {
    const response = await api.post('/orders', payload);
    return response.data.data;
  }
);