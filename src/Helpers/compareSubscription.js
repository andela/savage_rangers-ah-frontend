/**
 * compare username to users to check
 * if there is a bidirectional subscription (following <==> follower)
 *
 * @param {String } username the username to fetch
 * @param {Array} users the users list to fetch
 * @param {String} compare the users property
 * @returns Boolean
 * @author Alain Burindi
 */
export default (username, users, compare) => users.find(user => user[compare] === username);
