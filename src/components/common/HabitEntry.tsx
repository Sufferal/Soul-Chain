import { HabitIcons, HabitStyle } from '@/constants/styles';
import {
  HABIT_STATUSES,
  type HabitRecord,
  type HabitStatus,
} from '@/types/habit';
import { formatHabitDate } from '@/utils/date';
import { formatHabitStatus } from '@/utils/title';
import {
  Box,
  IconButton,
  Menu,
  Portal,
  Timeline,
  type MenuSelectionDetails,
} from '@chakra-ui/react';
import { useState } from 'react';

type HabitEntryProps = {
  item: HabitRecord;
  onSelect: () => void;
};

export const HabitEntry: React.FC<HabitEntryProps> = ({ item, onSelect }) => {
  const { status: initialStatus, date } = item;
  const [status, setStatus] = useState(initialStatus);
  const { palette, icon: HabitEntryIcon } = HabitStyle[status];

  const handleSelect = (details: MenuSelectionDetails) => {
    // TODO: Update parameters
    if (onSelect) onSelect();
    const currentStatus = details.value as HabitStatus;
    setStatus(currentStatus);
  };

  const habitMenu = (
    <Menu.Root onSelect={handleSelect}>
      <Menu.Trigger asChild>
        <IconButton size="xs" colorPalette={palette} rounded="full">
          <HabitEntryIcon />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {HABIT_STATUSES.map((hs) => {
              const HabitStatusIcon = HabitIcons[hs];

              return (
                <Menu.Item key={hs} value={hs}>
                  <HabitStatusIcon />
                  <Box flex="1">{formatHabitStatus(hs)}</Box>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );

  return (
    <Timeline.Item>
      <Timeline.Connector>
        <Timeline.Separator />
        <Timeline.Indicator>{habitMenu}</Timeline.Indicator>
      </Timeline.Connector>
      <Timeline.Content gap={1}>
        <Timeline.Title>{formatHabitStatus(status)}</Timeline.Title>
        <Timeline.Description>{formatHabitDate(date)}</Timeline.Description>
      </Timeline.Content>
    </Timeline.Item>
  );
};
