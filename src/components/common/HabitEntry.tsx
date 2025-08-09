import { HabitIcons } from '@/constants/styles';
import { HABIT_STATUSES } from '@/types/habit';
import { formatHabitStatus } from '@/utils/title';
import { Box, IconButton, Menu, Portal } from '@chakra-ui/react';

type HabitEntryProps = {
  palette: string;
  icon: React.ElementType;
};

export const HabitEntry: React.FC<HabitEntryProps> = ({ palette, icon }) => {
  const HabitEntryIcon = icon;

  return (
    <Menu.Root>
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
};
