import { HabitList } from './components/common/HabitList';
import MOCK_HABITS from './mocks/habits';

function App() {
  return (
    <>
      <HabitList habits={MOCK_HABITS} />
    </>
  );
}

export default App;
