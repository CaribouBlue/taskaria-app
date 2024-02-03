import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {
  TASKS_FEATURE_KEY,
  tasksReducer,
} from '@taskaria-app/tasks-data-access';
import { USER_FEATURE_KEY, userReducer } from '@taskaria-app/user-data-access';

const rootReducer = combineReducers({
  [TASKS_FEATURE_KEY]: tasksReducer,
  [USER_FEATURE_KEY]: userReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
  });
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
