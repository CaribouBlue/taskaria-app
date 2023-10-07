import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { helloWorldApi } from '@taskaria-app/hello-world/data-access';

const rootReducer = combineReducers({
  [helloWorldApi.reducerPath]: helloWorldApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(helloWorldApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
  });
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
