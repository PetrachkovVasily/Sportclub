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

    getUserActivityGoals: build.query({
      query: (userId, activity_name) => ({
        url: "/goal/records",
        params: {
          filter: `user_id="${userId}" && activity_name="${activity_name}"`,
          expand: "user_id",
        },
      }),
      providesTags: ["Goal"],
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

    addUserGoals: build.mutation({
      query: (postData) => ({
        url: `/goal/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Goal"],
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

    getThisUserClubs: build.query({
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
      providesTags: ["Club"],
    }),

    getSingleClub: build.query({
      query: (clubId) => ({
        url: `/club/records/${clubId}`,
      }),
      providesTags: ["Club"],
    }),

    addClub: build.mutation({
      query: (postData) => ({
        url: `/club/records`,
        method: "POST",
        body: postData,
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
      invalidatesTags: ["Club"],
    }),

    updateClubRequests: build.mutation({
      query: ({ clubId, newUserId, currentUsers, isAdd = false }) => {
        if (!isAdd) {
          const updated = currentUsers.filter((id) => id !== newUserId);

          return {
            url: `/club/records/${clubId}`,
            method: "PATCH",
            body: {
              request_id: updated,
            },
          };
        } else {
          const updated = Array.from(
            new Set([...(currentUsers || []), newUserId])
          );
          return {
            url: `/club/records/${clubId}`,
            method: "PATCH",
            body: {
              request_id: updated,
            },
          };
        }
      },
      invalidatesTags: ["Club"],
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
      providesTags: ["Workout"],
    }),

    getWorkout: build.query({
      query: (workoutId) => ({
        url: `/workout/records/${workoutId}`,
      }),
    }),

    // getAllWorkouts: build.query({
    //   query: (clubId) => ({
    //     url: "/workout/records",
    //   }),
    // }),

    getEventWorkouts: build.query({
      query: (eventId) => ({
        url: "/workout/records",
        params: {
          filter: `event_id~"${eventId}"`,
          expand: "event_id",
        },
      }),
      providesTags: ["Event"],
    }),

    addWorkout: build.mutation({
      query: (postData) => ({
        url: `/workout/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Workout"],
    }),

    deleteWorkout: build.mutation({
      query: (postId) => ({
        url: `/workout/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workout"],
    }),

    getWorkoutActivities: build.query({
      query: (workoutId) => ({
        url: "/workoutActivity/records",
        params: {
          filter: `workout_id~"${workoutId}"`,
          expand: "workout_id",
        },
      }),
      providesTags: ["WActivity", "Event"],
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

    // getActivity: build.query({
    //   query: (workoutActivityId) => ({
    //     url: `/activity/records`,
    //     params: {
    //       filter: `workoutActivity~"${workoutActivityId}"`,
    //       perPage: 1,
    //     },
    //   }),
    // }),

    updateWorkoutActivity: build.mutation({
      query: ({ id, ...fields }) => ({
        url: `/workoutActivity/records/${id}`,
        method: "PATCH",
        body: fields,
      }),
    }),

    addWorkoutActivity: build.mutation({
      query: (postData) => ({
        url: `/workoutActivity/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["WActivity"],
    }),

    deleteWorkoutActivity: build.mutation({
      query: (postId) => ({
        url: `/workoutActivity/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WActivity"],
    }),

    getClubAchievements: build.query({
      query: (clubId) => ({
        url: "/achievement/records",
        params: {
          filter: `club_id~"${clubId}"`,
          expand: "club_id",
        },
      }),
      providesTags: ["Achievement"],
    }),

    addClubAchievement: build.mutation({
      query: (postData) => ({
        url: `/achievement/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Achievement"],
    }),

    deleteClubAchievement: build.mutation({
      query: (postId) => ({
        url: `/achievement/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Achievement"],
    }),

    getEvents: build.query({
      query: (clubId) => ({
        url: "/event/records",
        params: {
          filter: `club_id~"${clubId}"`,
          expand: "club_id,workout_id,user_id",
        },
      }),
      providesTags: ["Event"],
    }),

    addEvent: build.mutation({
      query: (postData) => ({
        url: `/event/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: build.mutation({
      query: ({ id, ...fields }) => ({
        url: `/event/records/${id}`,
        method: "PATCH",
        body: fields,
      }),
      invalidatesTags: ["Event", "WActivity"],
    }),

    deleteEvent: build.mutation({
      query: (postId) => ({
        url: `/event/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),

    getUserClubsForEvents: build.query({
      query: ({ userId }) => {
        return {
          url: "/club/records",
          params: {
            filter: `user_id~"${userId}"`,
            expand: "user_id",
          },
        };
      },
    }),

    getEventsForUserClubs: build.query({
      query: (clubIds) => {
        const filter = clubIds.map((id) => `club_id = "${id}"`).join(" || ");
        return {
          url: "/event/records",
          params: {
            filter,
            expand: "club_id,workout_id,user_id",
          },
        };
      },
      providesTags: ["Event"],
    }),

    getEventsForUserClubsToday: build.query({
      query: (userId) => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        return {
          url: "/event/records",
          params: {
            filter:
              // filter +
              `date >= "${todayStr} 00:00:00" && date <= "${todayStr} 23:59:59" && user_id~"${userId}"`,
            expand: "club_id,workout_id,user_id",
          },
        };
      },
      providesTags: ["Event", "WActivity"],
    }),

    getClubAdmins: build.query({
      query: (clubId) => ({
        url: "/admin/records",
        params: {
          filter: `club_id~"${clubId}"`,
          expand: "club_id",
        },
      }),
      providesTags: ["Club"],
    }),

    deleteAdmin: build.mutation({
      query: (postId) => ({
        url: `/admin/records/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Club"],
    }),

    addAdmin: build.mutation({
      query: (postData) => ({
        url: `/admin/records`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Club"],
    }),

    getClubUsers: build.query({
      query: (clubId) => ({
        url: `/club/records/${clubId}`,
        params: {
          expand: "user_id",
        },
      }),
      providesTags: ["Club"],
    }),

    getRequestUsers: build.query({
      query: (clubId) => ({
        url: `/club/records/${clubId}`,
        params: {
          expand: "request_id",
        },
      }),
      providesTags: ["Club"],
    }),

    addUserEvent: build.mutation({
      query: (postData) => ({
        url: `/userEvent/records`,
        method: "POST",
        body: postData,
      }),
    }),

    getUserEvents: build.query({
      query: ({ userId, eventId }) => ({
        url: `/userEvent/records`,
        params: {
          filter: `user_id="${userId}" && event_id="${eventId}"`,
          expand: "event_id",
        },
      }),
      providesTags: ["UserEv"],
    }),

    addUserWorkoutActivity: build.mutation({
      query: (postData) => ({
        url: `/userWorkoutActivity/records`,
        method: "POST",
        body: postData,
      }),
    }),

    createEventAndActivity: build.mutation({
      async queryFn(
        { eventData, activityData, userId },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        try {
          // 1. Создаем userEvent
          const eventResult = await fetchWithBQ({
            url: "/userEvent/records",
            method: "POST",
            body: eventData,
          });
          if (eventResult.error) return { error: eventResult.error };

          const createdEvent = eventResult.data;

          // 2. Создаем userActivity с привязкой к созданному userEvent
          const activityResult = await Promise.all(
            activityData.map((activity) =>
              fetchWithBQ({
                url: "/userWorkoutActivity/records",
                method: "POST",
                body: {
                  ...activity,
                  // user_id: userId,
                  userEvent_id: createdEvent.id,
                },
              })
            )
          );

          if (activityResult.error) {
            // ❗ При желании можно сделать откат (удалить созданный event)
            await fetchWithBQ({
              url: `/userEvent/records/${createdEvent.id}`,
              method: "DELETE",
            });
            return { error: activityResult.error };
          }

          return {
            data: { createdEvent, createdActivity: activityResult.data },
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["UserEv"],
    }),

    getUserClubActivities: build.query({
      // Можно передать userId
      async queryFn(userId, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // 1. Получаем клубы пользователя
          const clubsRes = await fetchWithBQ({
            url: `/club/records`,
            params: {
              filter: `user_id~"${userId}"`,
              perPage: 200,
            },
          });

          if (clubsRes.error) return { error: clubsRes.error };

          const clubs = clubsRes.data.items || [];
          if (clubs.length === 0) return { data: [] };

          const clubIds = clubs.map((c) => c.id);
          const filter = clubIds.map((id) => `relation~"${id}"`).join(" || ");
          console.log(filter);

          // 2. Получаем activity по клубам
          const activitiesRes = await fetchWithBQ({
            url: `/activity/records`,
            params: {
              filter,
              expand: "relation",
              perPage: 200,
            },
          });

          if (activitiesRes.error) return { error: activitiesRes.error };

          return { data: activitiesRes.data.items };
        } catch (error) {
          return { error };
        }
      },
    }),

    getUserWorkoutsActivities: build.query({
      query: (userId) => ({
        url: `userWorkoutActivity`,
        params: {
          filter: `user_id="${userId}"`,
          expand: "userEvent_id.user_id,event_id",
        },
      }),
      // providesTags: ["Club"],
    }),
  }),
});
export const {
  useLazyGetThisUserClubsQuery,
  useAddClubMutation,

  useGetUserEventsQuery,
  useGetUserWorkoutsActivitiesQuery,

  useAddUserGoalsMutation,

  useGetUserClubActivitiesQuery,

  useCreateEventAndActivityMutation,
  useAddUserEventMutation,

  useGetEventsForUserClubsTodayQuery,

  useUpdateClubRequestsMutation,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useGetClubUsersQuery,
  useGetClubAdminsQuery,

  useGetEventsForUserClubsQuery,
  useGetUserClubsForEventsQuery,
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
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
  useGetEventWorkoutsQuery,

  useGetWorkoutActivitiesQuery,

  // useGetActivityQuery,
  useGetWorkoutActivityQuery,

  useUpdateWorkoutActivityMutation,
  useAddWorkoutActivityMutation,
  useDeleteWorkoutActivityMutation,

  useGetClubAchievementsQuery,
  useAddClubAchievementMutation,
  useDeleteClubAchievementMutation,

  useGetEventsQuery,
  useAddEventMutation,
  useGetWorkoutQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = userAPI;
