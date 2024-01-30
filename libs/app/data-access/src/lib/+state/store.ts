import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

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
