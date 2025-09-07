import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getAreas = wrapAsyncThunk('areas/getAll', async () => {
  const response = await api.get('/areas');
  return response.data.data;
});
