import { Task } from '@taskaria-app/tasks/util-types';
import styles from './task-list-item.module.css';
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@taskaria-app/app/data-access';
import { tasksActions } from '@taskaria-app/tasks-data-access';

/* eslint-disable-next-line */
export interface TaskListItemProps {
  task: Task;
}

export function TaskListItem({ task }: TaskListItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const labelId = `task-list-item-label-${task.taskId}`;

  const handleToggle: MouseEventHandler = () => {
    if (task.isCompleted) {
      dispatch(tasksActions.uncompleteTask(task));
    } else {
      dispatch(tasksActions.completeTask(task));
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.isCompleted}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={task.summary} />
      </ListItemButton>
    </ListItem>
  );
}

export default TaskListItem;
