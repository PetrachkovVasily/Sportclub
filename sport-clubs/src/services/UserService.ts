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
      query: ({ userId, name, category, status, country, city }) => {
        const filters: string[] = [];

        // console.log(userId, name, category, status, country, city);

        if (name) filters.push(`name ~ "${name}"`);
        if (country) filters.push(`country ~ "${country}"`);
        if (city) filters.push(`city ~ "${city}"`);
        if (category && category != "no category")
          filters.push(`category = "${category}"`);
        if (status && status != "no status") filters.push(`status="${status}"`);
        return {
          url: "/club/records",
          params: {
            filter:
              `user_id~"${userId}"` +
              (filters.length ? " && " : "") +
              filters.join(" && "),
            expand: "user_id",
          },
        };
      },
    }),

    getClubs: build.query({
      query: ({ userId, name, category, status, country, city }) => {
        const filters: string[] = [];

        // console.log(userId, name, category, status, country, city);

        if (name) filters.push(`name ~ "${name}"`);
        if (country) filters.push(`country ~ "${country}"`);
        if (city) filters.push(`city ~ "${city}"`);
        if (category && category != "no category")
          filters.push(`category = "${category}"`);
        if (status && status != "no status") filters.push(`status="${status}"`);
        return {
          url: "/club/records",
          params: {
            filter:
              `user_id!~"${userId}"` +
              (filters.length ? " && " : "") +
              filters.join(" && "),
            expand: "user_id",
          },
        };
      },
    }),

    getSingleClub: build.query({
      query: (clubId) => ({
        url: `/club/records/${clubId}`,
      }),
    }),

    updateClubUsers: build.mutation({
      query: ({ clubId, newUserId, currentUsers, isRemove = false }) => {
        if (isRemove) {
          const updated = currentUsers.filter((id) => id !== newUserId);
          return {
            url: `/club/records/${clubId}`,
            method: "PATCH",
            body: {
              user_id: updated,
            },
          };
        }
        const updated = Array.from(
          new Set([...(currentUsers || []), newUserId])
        );
        return {
          url: `/club/records/${clubId}`,
          method: "PATCH",
          body: {
            user_id: updated,
          },
        };
      },
    }),

    getClubActivities: build.query({
      query: (clubId) => ({
        url: "/activity/records",
        params: {
          filter: `relation~"${clubId}"`,
          expand: "relation",
        },
      }),
      providesTags: ["Activity"],
    }),

    deleteClubActivity: build.mutation({
      query: (postId) => ({
        url: `/activity/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Activity"],
    }),

    addClubActivity: build.mutation({
      query: (postData) => ({
        url: `/activity/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Activity"],
    }),

    getClubWorkouts: build.query({
      query: (clubId) => ({
        url: "/workout/records",
        params: {
          filter: `club_id~"${clubId}"`,
          expand: "club_id",
        },
      }),
    }),

    getWorkoutActivities: build.query({
      query: (workoutId) => ({
        url: "/workoutActivity/records",
        params: {
          filter: `workout_id~"${workoutId}"`,
          expand: "workout_id",
        },
      }),
    }),

    getWorkoutActivity: build.query({
      query: (workoutId) => ({
        url: `/workout_id/records`,
        params: {
          filter: `workout_id="${workoutId}"`,
          perPage: 1,
        },
      }),
    }),

    getActivity: build.query({
      query: (workoutActivityId) => ({
        url: `/activity/records`,
        params: {
          filter: `workoutActivity~"${workoutActivityId}"`,
          perPage: 1,
        },
      }),
    }),

    updateWorkoutActivity: build.mutation({
      query: ({ id, ...fields }) => ({
        url: `/workoutActivity/records/${id}`,
        method: "PATCH",
        body: fields,
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

  useLazyGetUserClubsQuery,
  useLazyGetClubsQuery,

  useUpdateClubUsersMutation,
  useGetSingleClubQuery,

  useGetClubActivitiesQuery,
  useDeleteClubActivityMutation,
  useAddClubActivityMutation,

  useGetClubWorkoutsQuery,

  useGetWorkoutActivitiesQuery,

  useGetActivityQuery,
  useGetWorkoutActivityQuery,

  useUpdateWorkoutActivityMutation,
} = userAPI;
