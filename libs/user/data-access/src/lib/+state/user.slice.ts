import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

export const USER_FEATURE_KEY = 'user';

/*
 * Update these interfaces according to your requirements.
 */
export interface User {
  id: string;
}

export interface UserState {
  user: User | null;
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchUser())
 * }, [dispatch]);
 * ```
 */
export const fetchUser = createAsyncThunk<User>(
  'user/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getUsers()`;
     * Right now we just return an empty array.
     */
    console.log('fetching user ...');
    return Promise.resolve({
      id: '0',
    });
  }
);

export const initialUserState: UserState = {
  user: null,
  loadingStatus: 'not loaded',
  error: null,
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchUser.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const userReducer = userSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(userActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const userActions = userSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllUser);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getUserState = (rootState: {
  [USER_FEATURE_KEY]: UserState;
}): UserState => rootState[USER_FEATURE_KEY];

export const selectUser = createSelector(getUserState, ({ user }) => user);

export const selectUserLoadingStatus = createSelector(
  getUserState,
  ({ loadingStatus }) => loadingStatus
);
