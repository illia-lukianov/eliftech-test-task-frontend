import {
  selectSearchCategories,
  selectSearchAreas,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from '../filters/selectors';
import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

const perPage = 12;

const createSearchParams = (state, newPage) => {
  const searchQuery = selectSearchQuery(state).toLowerCase();
  const categories = selectSearchCategories(state);
  const areas = selectSearchAreas(state);
  const sortBy = selectSortBy(state);
  const sortOrder = selectSortOrder(state);
  return {
    searchQuery,
    categories,
    areas,
    sortBy,
    sortOrder,
    page: newPage,
    perPage,
  };
};

export const getAllFlowers = wrapAsyncThunk(
  'flowers/getAll',
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const params = createSearchParams(state, newPage);
    const response = await api.get('/flowers', {
      params: params,
    });
    return response.data.data;
  }
);

export const getFavoriteFlowers = wrapAsyncThunk(
  'flowers/getFavorite',
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const params = createSearchParams(state, newPage);
    const response = await api.get('/flowers/favourites', {
      params: params,
    });
    return response.data.data;
  }
);

export const addFlowerToFavorite = wrapAsyncThunk(
  'flowers/addToFavorite',
  async id => {
    const response = await api.post(`/flowers/favourites/${id}`);
    return response.data.data;
  }
);

export const deleteFlowerFromFavorite = wrapAsyncThunk(
  'flowers/deleteFromFavorite',
  async id => {
    await api.delete(`/flowers/favourites/${id}`);
    return id;
  }
);