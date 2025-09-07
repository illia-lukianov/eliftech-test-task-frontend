import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getFlowerDetails = wrapAsyncThunk(
  'flowerDetails/getFlower',
  async id => {
    const response = await api.get(`flowers/${id}`);
    return response.data.data;
  }
);
