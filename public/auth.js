/* EXPORT FUNCTIONS FOR AUTH SERVICE IN CLIENT SIDE */

// Determine if user is logged in based on token
export function loggedIn() {
    const token = getToken();
    return !!token && !isTokenExpired(token);
}

// Decode given JWT token
export function jwtDecode(token) {
  let decoded = {};
  decoded.raw = token;
  decoded.header = JSON.parse(window.atob(token.split('.')[0]));
  decoded.payload = JSON.parse(window.atob(token.split('.')[1]));
  return (decoded)
}

// Determine if given JWT has expired
export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token).payload;
    if (decoded.exp < Date.now() / 1000) return true;
    return false;
  } catch (err) {
    return false;
  }
}

// Return token from local storage
export function getToken() {
    return localStorage.getItem('id_token');
}