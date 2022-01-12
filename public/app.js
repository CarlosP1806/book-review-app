const searchBookForm = document.querySelector('.search-book-form');
const searchBookInput = document.querySelector('#book-name-input');

const loginModal = document.querySelector('#login-modal');

const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

searchBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.location.href = `/search/${searchBookInput.value}/1`;
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
      const message = loginModal.querySelector('.modal-message');
      message.classList.add('active');
      throw new Error('Invalid Credentials');
    }

    const { token, user } = await response.json();
    console.log(user);

    localStorage.setItem('id_token', token);
    window.location.href = '/';    

  } catch (err) {
    console.log(err);
  }
});