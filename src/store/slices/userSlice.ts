import { IUser, tokenType } from '../../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from '../../API/UserService';

export const fetchMe = createAsyncThunk<IUser, tokenType>(
  'user/fetchMe',
  async (token, { rejectWithValue }) => {
    try {
      const response = await UserService.getMe(token);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.user;
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

interface userState {
  user: IUser | null;
  status: Status;
}

const initialState: userState = {
  user: null,
  status: Status.LOADING,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser(state) {
      state.user = null;
      state.status = Status.LOADING;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.email,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          avatarUrl: action.payload?.avatarUrl,
          birthday: action.payload?.birthday,
          city: action.payload?.city,
          university: action.payload?.university,
        };
        state.status = Status.SUCCESS;
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = Status.LOADING;
        state.user = null;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = Status.ERROR;
        state.user = null;
      });
  },
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
