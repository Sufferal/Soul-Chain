import { Heading, Stack, Timeline } from '@chakra-ui/react';
import type { Habit as HabitType } from '../../types/habit';
import { HabitEntry } from './HabitEntry';

type HabitProps = {
  habit: HabitType;
};

export const Habit: React.FC<HabitProps> = ({ habit }) => {
  const { id, name, history } = habit;

  let habitHistory;

  if (!history.length) {
    habitHistory = (
      <Heading size="sm" fontStyle="italic">
        No data to display
      </Heading> 
    );
  }

  if (history.length) {
    habitHistory = history.map((entry) => {
      const entryId = `${id}-${entry.date}`;

      return (
        <HabitEntry key={entryId} habitId={id} item={entry} onSelect={() => {}} />
      );
    });
  }

  return (
    <Stack gap={2} minWidth="200px">
      <Heading textAlign="center">{name}</Heading>
      <Timeline.Root
        maxW="400px"
        borderWidth={1}
        borderColor="teal.contrast"
        rounded="sm"
        p={4}
        pb={!history.length ? 4 : 0}
      >
        {habitHistory}
      </Timeline.Root>
    </Stack>
  );
};
