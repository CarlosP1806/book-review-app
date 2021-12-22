const navbarElement = document.querySelector('.navbar');

const searchBookForm = document.querySelector('.search-book-form');
const searchBookInput = document.querySelector('#book-name-input');

const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

searchBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.location.href = `/search/${searchBookInput.value}`;
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userData = {
    "username": usernameInput.value,
    "password": passwordInput.value
  };

  try {
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('something went wrong');
    }

    const { token, user } = await response.json();
    console.log(user);

    localStorage.setItem('id_token', token);
    window.location.assign('/');
  } catch (err) {
    console.log(err);
  }
});

function renderNavbar() {
  const token = localStorage.getItem('id_token');
  if (!token) {
  //  navbarElement.innerHTML = 'not logged';
    return;
  }
  // if (!!token && !isExpired(token))
  //   navbarElement.innerHTML = 'logged in!';
  // else
  //   navbarElement.innerHTML = 'not logged :(';
}

// Decode a given JWT token
function jwtDecode(token) {
  let decoded = {};
  decoded.raw = token;
  decoded.header = JSON.parse(window.atob(token.split('.')[0]));
  decoded.payload = JSON.parse(window.atob(token.split('.')[1]));
  return (decoded)
}

// Determine if given JWT has expired
function isExpired(token) {
  try {
    const decoded = jwtDecode(token).payload;
    if (decoded.exp < Date.now() / 1000) return true;
    return false;
  } catch (err) {
    return false;
  }
}

renderNavbar();