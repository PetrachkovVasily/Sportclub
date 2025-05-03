import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8090/api/collections" }),
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: () => ({
        url: "/activity/records",
      }),
    }),
  }),
});
export const { useFetchAllPostsQuery } = postAPI;
