import { Heading, Stack, Timeline } from '@chakra-ui/react';
import type { Habit as HabitType } from '../../types/habit';
import { HabitStyle } from '../../constants/styles';
import { formatHabitDate } from '@/utils/date';
import { formatHabitStatus } from '@/utils/title';
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
      const { status, date } = entry;
      const { palette, icon } = HabitStyle[status];
      const entryId = `${id}-${date}`;

      return (
        <Timeline.Item key={entryId}>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator>
              <HabitEntry palette={palette} icon={icon} />
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content gap={1}>
            <Timeline.Title>{formatHabitStatus(status)}</Timeline.Title>
            <Timeline.Description>{formatHabitDate(date)}</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
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
