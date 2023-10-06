import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const HELLO_WORLD_FEATURE_KEY = 'helloWorld';

/*
 * Update these interfaces according to your requirements.
 */
export interface HelloWorldEntity {
  id: number;
}

export interface HelloWorldState extends EntityState<HelloWorldEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const helloWorldAdapter = createEntityAdapter<HelloWorldEntity>();

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
 *   dispatch(fetchHelloWorld())
 * }, [dispatch]);
 * ```
 */
export const fetchHelloWorld = createAsyncThunk<HelloWorldEntity[]>(
  'helloWorld/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getHelloWorlds()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialHelloWorldState: HelloWorldState =
  helloWorldAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const helloWorldSlice = createSlice({
  name: HELLO_WORLD_FEATURE_KEY,
  initialState: initialHelloWorldState,
  reducers: {
    add: helloWorldAdapter.addOne,
    remove: helloWorldAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHelloWorld.pending, (state: HelloWorldState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchHelloWorld.fulfilled,
        (state: HelloWorldState, action: PayloadAction<HelloWorldEntity[]>) => {
          helloWorldAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchHelloWorld.rejected, (state: HelloWorldState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const helloWorldReducer = helloWorldSlice.reducer;

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
 *   dispatch(helloWorldActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const helloWorldActions = helloWorldSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllHelloWorld);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = helloWorldAdapter.getSelectors();

export const getHelloWorldState = (rootState: {
  [HELLO_WORLD_FEATURE_KEY]: HelloWorldState;
}): HelloWorldState => rootState[HELLO_WORLD_FEATURE_KEY];

export const selectAllHelloWorld = createSelector(
  getHelloWorldState,
  selectAll
);

export const selectHelloWorldEntities = createSelector(
  getHelloWorldState,
  selectEntities
);
