import { Flex, Heading } from '@chakra-ui/react';
import { Habit } from './Habit';
import { useGetHabitsQuery } from '@/api/habitsApi';

export const HabitList: React.FC = () => {
  const { data: habits, error, isLoading } = useGetHabitsQuery();

  // States
  if (isLoading)
    return (
      <Heading size="lg" fontStyle="italic">
        Loading habits...
      </Heading>
    );
  if (error)
    return (
      <Heading size="lg" fontStyle="italic">
        There was an error loading habits. Please try again later.
      </Heading>
    );

  // No habits
  if (!habits?.length)
    return (
      <Heading size="lg" fontStyle="italic">
        No habits to display. Create one to get started.
      </Heading>
    );

  return (
    <Flex gap={10}>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </Flex>
  );
};
