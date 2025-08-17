import type { Habit, HabitRecord } from '@/types/habit';
import { apiSlice } from './apiSlice';

export const habitsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query<Habit[], void>({
      query: () => '/habits',
      providesTags: ['Habit'],
    }),
    createHabit: builder.mutation<Habit, Partial<Habit>>({
      query: (newHabit) => ({
        url: '/habits',
        method: 'POST',
        body: newHabit,
      }),
      invalidatesTags: ['Habit'],
    }),
    updateHabitStatus: builder.mutation<HabitRecord, Required<HabitRecord>>({
      query: ({ id, date, status }) => ({
        url: `/habits/${id}/status`,
        method: 'POST',
        body: { date, status },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHabitsQuery,
  useCreateHabitMutation,
  useUpdateHabitStatusMutation,
} = habitsApi;
