import { Box } from '@chakra-ui/react';
import { HabitList } from './components/common/HabitList';
import { HabitActions } from './components/common/HabitActions';

function App() {
  return (
    <Box px="100px">
      <HabitActions />
      <HabitList />
    </Box>
  );
}

export default App;
