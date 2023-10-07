import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface HelloWorldResult {
  message: string;
}

// Define a service using a base URL and expected endpoints
export const helloWorldApi = createApi({
  reducerPath: 'helloWorldApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/hello-world' }),
  endpoints: (builder) => ({
    getHelloWorld: builder.query<HelloWorldResult, void>({
      query: () => '',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHelloWorldQuery } = helloWorldApi;
