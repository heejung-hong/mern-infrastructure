// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from './users-api'

export async function signUp(userData) { // signUp waiting for token
  const token = await usersAPI.signUp(userData);
  // Persist the 'token'
  localStorage.setItem('token', token);
  // TODO: return user from token instead
  // return token;
  return getUser;
}

export async function logIn(credentials) { // signUp waiting for token
  const token = await usersAPI.logIn(credentials);
  localStorage.setItem('token', token);
  // TODO: return user from token instead
  return getUser;
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  // getItem will return null if the key does not exist
  const token = localStorage.getItem('token')
  if (!token) return null;
  // obtain the payload of the token. JSON.parse changes into to object
  const payload = JSON.parse(atob(token.split('.')[1]))
  // a JWT's exp is expressed in seconds, not miliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expred - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

