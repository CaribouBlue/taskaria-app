import { useTasks } from '@taskaria-app/tasks-data-access';
import TaskListItem from '../task-list-item/task-list-item';
import { Box, Button, List } from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import { Task } from '@taskaria-app/tasks/util-types';

/* eslint-disable-next-line */
export interface TaskListProps {
  taskSorter?: (a: Task, b: Task) => number;
}

export function TaskList(props: TaskListProps) {
  const tasks = useTasks();
  const sortedTasks = tasks.sort(props.taskSorter || (() => 0));
  const incompleteTasks = sortedTasks.filter((task) => !task.isCompleted);
  const completeTasks = sortedTasks.filter((task) => task.isCompleted);

  const [isCompleteTaskListEnabled, setIsCompleteTaskListEnabled] =
    useState(false);

  const renderCompleteTaskList = () => (
    <List>
      {completeTasks.map((task) => (
        <TaskListItem key={task.taskId} task={task}></TaskListItem>
      ))}
    </List>
  );

  const toggleIsCompleteTaskListEnabled: MouseEventHandler = () => {
    setIsCompleteTaskListEnabled(!isCompleteTaskListEnabled);
  };

  return (
    <>
      <List>
        {incompleteTasks.map((task) => (
          <TaskListItem key={task.taskId} task={task}></TaskListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={toggleIsCompleteTaskListEnabled}>
          {isCompleteTaskListEnabled ? 'Hide' : 'Show'} completed
        </Button>
      </Box>
      {isCompleteTaskListEnabled && renderCompleteTaskList()}
    </>
  );
}

export default TaskList;
