import { useCreateTask } from '@taskaria-app/tasks-data-access';
import styles from './task-creation-input.module.css';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { TextField } from '@mui/material';

/* eslint-disable-next-line */
export interface TaskCreationInputProps {}

export function TaskCreationInput(props: TaskCreationInputProps) {
  const createTask = useCreateTask();
  const [newTask, setNewTask] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTask(e.target.value);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      createTask(newTask);
      setNewTask('');
    }
  };

  return (
    <TextField
      id="task-creation-input"
      label="Create task ..."
      variant="filled"
      value={newTask}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
    />
  );
}

export default TaskCreationInput;
