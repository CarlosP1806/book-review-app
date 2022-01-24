import { getToken, loggedIn, logout } from './auth.js';

const navbarElement = document.querySelector('.navbar');
const toggleMenuElement = document.querySelector('.toggle-menu');
const activeToggleMenuElement = document.querySelector('.active-toggle-menu');
const overlayElement = document.querySelector('.overlay');

// Respond to menu click (responsive nav)
toggleMenuElement.addEventListener('click', () => {
  navbarElement.classList.add('active');
});

// Respond to menu click when responsive nav is active
activeToggleMenuElement.addEventListener('click', () => {
  navbarElement.classList.remove('active');
});

// Respond to clicks on links in navbar
navbarElement.addEventListener('click', (event) => {
  if(loggedIn()) {
    if(event.target.id === 'logout') {
      logout();
    }
  } else {
    if(event.target.classList.contains('login')) {
      openModal('#login-modal');
    }
    if(event.target.id === 'sign-up') {
      openModal('#signup-modal');
    }
  }
});

// Respond to clicks on screen to close modal
overlayElement.addEventListener('click', () => {
  closeModal('#login-modal');
  closeModal('#signup-modal');
})

// Handle open and close modal
function openModal(modal) {
  const currentModal = document.querySelector(modal);
  currentModal.classList.add('active');
  overlayElement.classList.add('active');
}

function closeModal(modal) {
  const currentModal = document.querySelector(modal);
  const modalMessage = currentModal.querySelector('.modal-message');
  currentModal.classList.remove('active');
  modalMessage.classList.remove('active');
  overlayElement.classList.remove('active');
}

const closeLoginModalButton = document.querySelector('.login-modal-close');
closeLoginModalButton.addEventListener('click', () => {
  closeModal('#login-modal');
});

const closeSignupModalButton = document.querySelector('.signup-modal-close');
closeSignupModalButton.addEventListener('click', () => {
  closeModal('#signup-modal');
});

// Hanlde login system
const loginModal = document.querySelector('#login-modal');
const loginForm = document.querySelector('.login-form');
const loginUsernameInput = document.querySelector('#username-input');
const loginPasswordInput = document.querySelector('#password-input');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userData = {
    "username": loginUsernameInput.value,
    "password": loginPasswordInput.value
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

// Handle sign up system
const signupModal = document.querySelector('#signup-modal');
const signupForm = document.querySelector('.signup-form');
const signEmailInput = document.querySelector('#sign-email-input');
const signUserInput = document.querySelector('#sign-username-input');
const signPasswordInput = document.querySelector('#sign-password-input');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userData = {
    "email": signEmailInput.value,
    "username": signUserInput.value,
    "password": signPasswordInput.value
  };

  try {
    const response = await fetch('/user/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if(!response.ok) {
      const message = signupModal.querySelector('.modal-message');
      message.classList.add('active');
      throw new Error('Invalid Fields');
    }

    const { token, user } = await response.json();
    console.log(user);

    localStorage.setItem('id_token', token);
    window.location.href= '/';

  } catch(error) {
    console.log(error);
  }
});

// Render navbar elements depending on user logged in
function renderNavbar() {
  if(loggedIn()) {
    navbarElement.classList.add('logged');
  }
  else {
    navbarElement.classList.remove('logged');
  }
}

// Render navbar on each load of view
renderNavbar();