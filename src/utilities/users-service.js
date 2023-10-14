// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from './users-api'

export async function signUp(userData) { // signUp waiting for token
  const token = await usersAPI.signUp(userData);
  // TODO: return user from token instead
  return token;
}