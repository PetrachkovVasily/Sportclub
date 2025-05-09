import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/api/collections",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).authReducer.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/users/auth-with-password",
        method: "POST",
        body: {
          identity: email,
          password,
        },
      }),
    }),

    register: build.mutation({
      query: ({ email, password, passwordConfirm, username }) => ({
        url: "/users/records",
        method: "POST",
        body: {
          email,
          password,
          passwordConfirm,
          username,
        },
      }),
    }),

    fetchUser: build.query({
      query: (userId) => ({
        url: `/users/records/${userId}`,
      }),
    }),

    getUserGoals: build.query({
      query: (userId) => ({
        url: "/goal/records",
        params: {
          filter: `user_id="${userId}"`,
          expand: "user_id",
        },
      }),
    }),

    getUserWeekGoals: build.query({
      query: (userId) => ({
        url: "/goal/records",
        params: {
          filter: `user_id="${userId}" && type="week"`,
          expand: "user_id",
        },
      }),
      providesTags: ["Goal"],
    }),

    getUserMonthGoals: build.query({
      query: (userId) => ({
        url: "/goal/records",
        params: {
          filter: `user_id="${userId}" && type="month"`,
          expand: "user_id",
        },
      }),
      providesTags: ["Goal"],
    }),

    getUserYearGoals: build.query({
      query: (userId) => ({
        url: "/goal/records",
        params: {
          filter: `user_id="${userId}" && type="year"`,
          expand: "user_id",
        },
      }),
      providesTags: ["Goal"],
    }),

    deleteGoal: build.mutation({
      query: (postId) => ({
        url: `/goal/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goal"],
    }),

    getUserClubs: build.query({
      query: (userId) => ({
        url: "/club/records",
        params: {
          filter: `user_id~"${userId}"`,
          expand: "user_id",
        },
      }),
    }),
    getAllClubs: build.query({
      query: (userId) => ({
        url: "/club/records",
        params: {
          filter: `user_id!~"${userId}"`,
          expand: "user_id",
        },
      }),
    }),
  }),
});
export const {
  useFetchUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserGoalsQuery,
  useGetUserWeekGoalsQuery,
  useGetUserMonthGoalsQuery,
  useGetUserYearGoalsQuery,
  useDeleteGoalMutation,
  useGetUserClubsQuery,
  useGetAllClubsQuery,
} = userAPI;
