import { CorePageContainer } from '@taskaria-app/app-feature';
import { TaskCreationInput, TaskList } from '@taskaria-app/tasks-feature';

export function App() {
  return (
    <CorePageContainer>
      <TaskCreationInput style={{ width: '100%' }}></TaskCreationInput>
      <TaskList></TaskList>
    </CorePageContainer>
  );
}

export default App;
