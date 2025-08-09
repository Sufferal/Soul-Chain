import { LuCheck, LuX, LuMinus, LuHourglass } from 'react-icons/lu';
import type { HabitStatus } from '../types/habit';

type HabitStatusStyle =  {
  bg: string;
  color: string;
  icon: React.ElementType; 
}

export const HabitStyle: Record<HabitStatus, HabitStatusStyle> = {
  done: {
    bg: 'teal.solid',
    color: 'teal.contrast',
    icon: LuCheck
  },
  missed: {
    bg: 'red.solid',
    color: 'teal.contrast',
    icon: LuX 
  },
  skipped: {
    bg: 'gray.solid',
    color: 'black.contrast',
    icon: LuMinus
  },
  inProgress: {
    bg: 'yellow.solid',
    color: 'black.contrast',
    icon: LuHourglass
  }
};