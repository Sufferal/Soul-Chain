import { Box, Flex } from '@chakra-ui/react';
import type { Habit as HabitType } from '../../types/habit';
import { Habit } from './Habit';

type HabitListProps = {
  habits: HabitType[];
};

export const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  return (
    <Box px={"100px"}>
      <Flex gap={10}>
        {habits.map((habit) => (
          <Habit key={habit.id} habit={habit} />
        ))}
      </Flex>
    </Box>
  );
};
