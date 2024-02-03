import { Task } from '@taskaria-app/tasks/util-types';
import styles from './task-list-item.module.css';

/* eslint-disable-next-line */
export interface TaskListItemProps {
  task: Task;
}

export function TaskListItem({ task }: TaskListItemProps) {
  return <li>{task.summary}</li>;
}

export default TaskListItem;
