/* eslint-disable */
import * as actions from './index';

describe("LOGIN_USER", () => {
  it('should return a type of LOGIN_USER', () => {
    const mockUser = {user: 'I AM A USER'}
    const expected = {
      type: "LOGIN_USER",
      user: mockUser
    }

    expect(actions.loginUser(mockUser)).toEqual(expected);
  })
})