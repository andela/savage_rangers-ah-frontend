/**
 * Socket creation file
 * @name socketIO
 */

import io from 'socket.io-client';

const socket = io.connect('https://authors-heaven.herokuapp.com');

export default socket;
