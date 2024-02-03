import { fetchTasks, tasksAdapter, tasksReducer } from './tasks.slice';

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

    state = tasksReducer(
      state,
      fetchTasks.fulfilled([{ UserId: '1', TaskId: '1' }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { '1': { UserId: '1', TaskId: '1' } },
        ids: ['1'],
      })
    );

    state = tasksReducer(state, fetchTasks.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { '1': { UserId: '1', TaskId: '1' } },
        ids: ['1'],
      })
    );
  });
});
