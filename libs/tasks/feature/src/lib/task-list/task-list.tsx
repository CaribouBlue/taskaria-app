import { useTasks } from '@taskaria-app/tasks-data-access';
import TaskListItem from '../task-list-item/task-list-item';
import { List } from '@mui/material';

/* eslint-disable-next-line */
export interface TaskListProps {}

export function TaskList(props: TaskListProps) {
  const tasks = useTasks();

  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem key={task.taskId} task={task}></TaskListItem>
      ))}
    </List>
  );
}

export default TaskList;
