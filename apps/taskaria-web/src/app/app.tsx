import { AppDispatch } from '@taskaria-app/app/data-access';
import {
  selectAllTasks,
  tasksActions,
  useCreateTask,
} from '@taskaria-app/tasks-data-access';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUser,
  selectUserLoadingStatus,
} from '@taskaria-app/user-data-access';

export function App() {
  const tasks = useSelector(selectAllTasks);
  const userLoadingStatus = useSelector(selectUserLoadingStatus);
  const dispatch = useDispatch<AppDispatch>();
  const [newTaskString, setNewTaskString] = useState('');
  const createTask = useCreateTask();

  useEffect(() => {
    if (userLoadingStatus === 'not loaded') {
      dispatch(fetchUser());
    }
  }, [dispatch, userLoadingStatus]);

  return (
    <div>
      <h1>Taskaria</h1>
      <input
        value={newTaskString}
        onChange={(e) => setNewTaskString(e.target.value)}
      ></input>
      <button
        onClick={() => {
          if (newTaskString) {
            createTask(newTaskString);
            setNewTaskString('');
          }
        }}
      >
        Submit
      </button>
      <ul>
        {tasks.map(({ TaskId }) => (
          <li key={TaskId}>{TaskId}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
