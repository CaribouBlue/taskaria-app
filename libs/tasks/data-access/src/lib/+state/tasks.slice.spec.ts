import { fetchTasks, tasksAdapter, tasksReducer } from './tasks.slice';
import { mockTask } from './__mocks__/mock-tasks-data';

describe('tasks reducer', () => {
  it('should handle initial state', () => {
    const expected = tasksAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(tasksReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchTasks', () => {
    let state = tasksReducer(undefined, fetchTasks.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = tasksReducer(state, fetchTasks.fulfilled([mockTask], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { [mockTask.taskId]: mockTask },
        ids: [mockTask.taskId],
      })
    );

    state = tasksReducer(state, fetchTasks.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { [mockTask.taskId]: mockTask },
        ids: [mockTask.taskId],
      })
    );
  });
});
