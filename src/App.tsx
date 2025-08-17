import { Box } from '@chakra-ui/react';
import { HabitList } from './components/common/HabitList';
import { MOCK_HABITS_3 } from './mocks/habits';
import { HabitActions } from './components/common/HabitActions';

function App() {
  return (
    <Box px="100px">
      <HabitActions />
      <HabitList habits={MOCK_HABITS_3} />
    </Box>
  );
}

export default App;
