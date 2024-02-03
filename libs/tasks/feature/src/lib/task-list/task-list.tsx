import { useTasks } from '@taskaria-app/tasks-data-access';
import TaskListItem from '../task-list-item/task-list-item';

/* eslint-disable-next-line */
export interface TaskListProps {}

export function TaskList(props: TaskListProps) {
  const tasks = useTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.taskId} task={task}></TaskListItem>
      ))}
    </ul>
  );
}

export default TaskList;
