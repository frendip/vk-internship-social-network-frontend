import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILogin, IRegistration, tokenType } from '../../types/types';
import PostService from '../../API/PostService';

export const fetchLogin = createAsyncThunk<tokenType, ILogin>(
  'auth/fetchLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await PostService.getLogin(email, password);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.token;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchRegistration = createAsyncThunk<tokenType, IRegistration>(
  'auth/fetchRegistration',
  async ({ email, password, firstname, lastname }, { rejectWithValue }) => {
    try {
      const response = await PostService.getRegistration(email, password, firstname, lastname);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.token;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface productsState {
  token: null | tokenType;
  status: Status;
  errorMessage: null | string;
}

const initialState: productsState = {
  token: null,
  status: Status.LOADING,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.status = Status.LOADING;
        state.token = null;
        state.errorMessage = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = Status.SUCCESS;
      })
      .addMatcher(isError, (state, action) => {
        state.status = Status.ERROR;
        state.token = null;
        state.errorMessage = action.payload;
      });
  },
});

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const isFulfilled = (action: AnyAction) => {
  return action.type.endsWith('fulfilled');
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export default authSlice.reducer;
