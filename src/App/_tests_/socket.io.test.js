import io from '../../Helpers/Notifications/socket.io';

describe('Socket', () => {
  it('should return the socket', () => {
    const socket = io;
    expect(typeof socket).toBe('object');
  });
});
