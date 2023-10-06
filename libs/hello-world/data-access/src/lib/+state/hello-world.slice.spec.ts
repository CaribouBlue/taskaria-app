import {
  fetchHelloWorld,
  helloWorldAdapter,
  helloWorldReducer,
} from './hello-world.slice';

describe('helloWorld reducer', () => {
  it('should handle initial state', () => {
    const expected = helloWorldAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(helloWorldReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchHelloWorld', () => {
    let state = helloWorldReducer(undefined, fetchHelloWorld.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = helloWorldReducer(
      state,
      fetchHelloWorld.fulfilled([{ id: 1 }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = helloWorldReducer(
      state,
      fetchHelloWorld.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
