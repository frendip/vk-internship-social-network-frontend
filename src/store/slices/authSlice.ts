import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin, IRegistration, tokenType } from '../../types/types';
import { AuthService } from '../../API/AuthService';
import { RootState } from '../store';

export const fetchLogin = createAsyncThunk<tokenType, ILogin>(
  'auth/fetchLogin',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await AuthService.getLogin(login, password);
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
  async ({ login, email, password, firstname, lastname }, { rejectWithValue }) => {
    try {
      const response = await AuthService.getRegistration(
        login,
        email,
        password,
        firstname,
        lastname,
      );
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
  WAITING = 'waiting',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface authState {
  token: null | tokenType;
  status: Status;
}

const initialState: authState = {
  token: null,
  status: Status.WAITING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    deleteToken(state) {
      state.token = null;
      state.status = Status.WAITING;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<tokenType>) => {
        state.token = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = Status.LOADING;
        state.token = null;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = Status.ERROR;
        state.token = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<tokenType>) => {
        state.token = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchRegistration.pending, (state) => {
        state.status = Status.LOADING;
        state.token = null;
      })
      .addCase(fetchRegistration.rejected, (state) => {
        state.status = Status.ERROR;
        state.token = null;
      });
  },
});

export const getToken = (state: RootState) => state.auth.token;

export const { deleteToken } = authSlice.actions;
export default authSlice.reducer;
