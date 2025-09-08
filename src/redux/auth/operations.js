import api, {
  clearAuthHeader,
  setAuthHeader,
} from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';
import { selectIsLoggedIn } from './selectors';

export const registerUser = wrapAsyncThunk('auth/register', async user => {
  const response = await api.post('/auth/register', user, {
    skipRefresh: true,
  });
  return response.data.data;
});

export const logInUser = wrapAsyncThunk('auth/logIn', async userData => {
  const response = await api.post('/auth/login', userData, {
    skipRefresh: true,
  });
  setAuthHeader(response.data.data.accessToken);
  return response.data.data;
});

export const logOutUser = wrapAsyncThunk('auth/logOut', async () => {
  await api.post('/auth/logout', {}, { skipRefresh: true });
  clearAuthHeader();
});

export const refreshUser = wrapAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const isLoggedIn = selectIsLoggedIn(thunkApi.getState());
    if (!isLoggedIn) {
      thunkApi.rejectWithValue('Is not authenticated');
    }
    const response = await api.post('/auth/refresh', {}, {
      skipRefresh: true,
    });
    setAuthHeader(response.data.data.accessToken);
    return response.data.data;
  }
);
export const requestPasswordReset = wrapAsyncThunk(
  'auth/requestPasswordReset',
  async email => {
    const response = await api.post(
      '/auth/request-password-reset',
      { email },
      { skipRefresh: true }
    );
    return response.data.data;
  }
);

export const resetPassword = wrapAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }) => {
    const response = await api.post(
      '/auth/reset-password',
      {
        token,
        password,
      },
      { skipRefresh: true }
    );
    return response.data;
  }
);

export const confirmUser = wrapAsyncThunk('auth/confirmUser', async token => {

  const response = await api.post('/auth/confirm-email', token, {
    skipRefresh: true,
  });

  setAuthHeader(response.data.data.accessToken);

  return response.data.data;
});

export const getOauthGoogleUrl = wrapAsyncThunk(
  'auth/get-oauth-google-url',
  async () => {
    const response = await api.get('auth/get-oauth-url',{}, { skipRefresh: true });

    return response.data.data.oauth_url;
  }
);

export const logInWithGoogle = wrapAsyncThunk(
  'auth/google-log-iIn',
  async code => {
    const response = await api.post('/auth/confirm-oauth', code, {
      skipRefresh: true,
    });

    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  }
);
