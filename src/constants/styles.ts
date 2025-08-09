import { LuCheck, LuX, LuMinus, LuHourglass, LuHash } from 'react-icons/lu';
import { type HabitStatus } from '../types/habit';

type HabitStatusStyle = {
  palette: string;
  icon: React.ElementType;
};

type HabitIcon = React.ElementType;

export const HabitIcons: Record<HabitStatus, HabitIcon> = {
  done: LuCheck,
  missed: LuX,
  skipped: LuMinus,
  inProgress: LuHourglass,
  unknown: LuHash
};

export const HabitStyle: Record<HabitStatus, HabitStatusStyle> = {
  done: {
    palette: 'green',
    icon: LuCheck,
  },
  missed: {
    palette: 'red',
    icon: LuX,
  },
  skipped: {
    palette: 'gray',
    icon: LuMinus,
  },
  inProgress: {
    palette: 'yellow',
    icon: LuHourglass,
  },
  unknown: {
    palette: 'blue',
    icon: LuHash,
  },
};
