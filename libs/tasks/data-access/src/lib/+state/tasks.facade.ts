import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { tasksActions } from './tasks.slice';
import { selectUser } from '@taskaria-app/user-data-access';

export const useCreateTask = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [newTaskString, createTask] = useState<null | string>();

  useEffect(() => {
    console.log(user);
    if (newTaskString && user) {
      dispatch(
        tasksActions.add({
          UserId: user.id,
          TaskId: uuid(),
        })
      );
      createTask(null);
    }
  }, [newTaskString, createTask, dispatch, user]);

  return createTask;
};
