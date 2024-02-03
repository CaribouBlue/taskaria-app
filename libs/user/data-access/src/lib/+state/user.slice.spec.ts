import {
  UserState,
  fetchUser,
  initialUserState,
  userReducer,
} from './user.slice';

describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialUserState);
  });

  it('should handle fetchUser', () => {
    let state = userReducer(undefined, fetchUser.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        user: null,
      })
    );

    state = userReducer(state, fetchUser.fulfilled({ id: '1' }, ''));

    expect(state).toEqual(
      expect.objectContaining<UserState>({
        loadingStatus: 'loaded',
        error: null,
        user: {
          id: '1',
        },
      })
    );

    state = userReducer(state, fetchUser.rejected(new Error('Uh oh'), ''));

    expect(state).toEqual(
      expect.objectContaining<UserState>({
        loadingStatus: 'error',
        error: 'Uh oh',
        user: {
          id: '1',
        },
      })
    );
  });
});
