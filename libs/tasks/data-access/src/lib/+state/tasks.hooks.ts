import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  TasksState,
  fetchTasks,
  selectAllTasks,
  selectTasksLoadingStatus,
  tasksActions,
} from './tasks.slice';
import { useUser } from '@taskaria-app/user-data-access';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export const useTasks = () => {
  const dispatch = useDispatch<ThunkDispatch<TasksState, unknown, AnyAction>>();
  const tasks = useSelector(selectAllTasks);
  const tasksLoadingStatus = useSelector(selectTasksLoadingStatus);

  useEffect(() => {
    if (tasksLoadingStatus === 'not loaded') {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasksLoadingStatus]);

  return tasks;
};

export const useCreateTask = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const [newTask, createTask] = useState<null | string>();

  useEffect(() => {
    if (newTask && user) {
      dispatch(
        tasksActions.add({
          userId: user.id,
          taskId: uuid(),
          summary: newTask,
          isCompleted: false,
          createdTimestamp: Date.now(),
        })
      );
      createTask(null);
    }
  }, [newTask, createTask, dispatch, user]);

  return createTask;
};
