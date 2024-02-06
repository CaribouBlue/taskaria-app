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

/* eslint-disable-next-line */
export interface TaskListItemProps {
  task: Task;
}

export function TaskListItem({ task }: TaskListItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const labelId = `task-list-item-label-${task.taskId}`;

  const handleToggle: MouseEventHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isChecked}
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
