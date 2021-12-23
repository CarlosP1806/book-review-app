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
    window.location.href = '/';    

  } catch (err) {
    console.log(err);
  }
});