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

async function renderNavbar() {

  const token = localStorage.getItem('id_token');
  if (!token) {
    navbarElement.innerHTML = 'not logged';
    return;
  }

  const decoded = jwtDecode(token).payload;
  console.log(decoded);
  let isExpired
  
  console.log(decoded.exp);
  console.log(Date.now()/1000);
  try {
    if (decoded.exp < Date.now() / 1000) {
      console.log('expired');
      isExpired = true;
    }
    else {
      isExpired = false
    }
  } catch (err) {
    isExpired = false;
  }

  if (!!token && !isExpired)
    navbarElement.innerHTML = 'logged in!';
  else
    navbarElement.innerHTML = 'not logged :(';
}

function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return (token)
}

renderNavbar();