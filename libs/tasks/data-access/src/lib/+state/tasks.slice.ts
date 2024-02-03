import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Task } from '@taskaria-app/tasks/util-types';
import { mockTask } from './__mocks__/mock-tasks-data';

export const TASKS_FEATURE_KEY = 'tasks';

/*
 * Update these interfaces according to your requirements.
 */
export type TasksEntity = Task;

export interface TasksState extends EntityState<TasksEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const tasksAdapter = createEntityAdapter<TasksEntity>({
  selectId(task) {
    return task.taskId;
  },
});

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
 *   dispatch(fetchTasks())
 * }, [dispatch]);
 * ```
 */
export const fetchTasks = createAsyncThunk<TasksEntity[]>(
  'tasks/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getTaskss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([mockTask]);
  }
);

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const tasksSlice = createSlice({
  name: TASKS_FEATURE_KEY,
  initialState: initialTasksState,
  reducers: {
    add: tasksAdapter.addOne,
    remove: tasksAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state: TasksState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchTasks.fulfilled,
        (state: TasksState, action: PayloadAction<TasksEntity[]>) => {
          tasksAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchTasks.rejected, (state: TasksState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const tasksReducer = tasksSlice.reducer;

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
 *   dispatch(tasksActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const tasksActions = tasksSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllTasks);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = tasksAdapter.getSelectors();

export const getTasksState = (rootState: {
  [TASKS_FEATURE_KEY]: TasksState;
}): TasksState => rootState[TASKS_FEATURE_KEY];

export const selectAllTasks = createSelector(getTasksState, selectAll);

export const selectTasksEntities = createSelector(
  getTasksState,
  selectEntities
);

export const selectTasksLoadingStatus = createSelector(
  getTasksState,
  ({ loadingStatus }) => loadingStatus
);
