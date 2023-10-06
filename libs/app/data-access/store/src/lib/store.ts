import { configureStore } from '@reduxjs/toolkit';
import {
  HELLO_WORLD_FEATURE_KEY,
  helloWorldReducer,
} from '@taskaria-app/hello-world/data-access';

export const store = configureStore({
  reducer: { [HELLO_WORLD_FEATURE_KEY]: helloWorldReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
