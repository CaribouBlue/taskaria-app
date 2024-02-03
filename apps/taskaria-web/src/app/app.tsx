import { TaskCreationInput, TaskList } from '@taskaria-app/tasks-feature';

export function App() {
  return (
    <div>
      <h1>Taskaria</h1>
      <TaskCreationInput></TaskCreationInput>
      <TaskList></TaskList>
    </div>
  );
}

export default App;
