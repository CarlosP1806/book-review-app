import { loggedIn, logout } from './auth.js';

const navbarElement = document.querySelector('.navbar');
const toggleMenuElement = document.querySelector('.toggle-menu');
const navToggleMenuElement = document.querySelector('.nav-toggle-menu');
const overlayElement = document.querySelector('.overlay');

// Respond to menu click (responsive nav)
toggleMenuElement.addEventListener('click', () => {
  navbarElement.classList.add('active');
});

// Respond to menu click when responsive nav is displayed
navToggleMenuElement.addEventListener('click', () => {
  navbarElement.classList.remove('active');
});

navbarElement.addEventListener('click', (event) => {
  if(loggedIn()) {
    if(event.target.id === 'logout') {
      logout();
    }
  } else {
    if(event.target.id === 'login') {
      overlayElement.classList.add('active');
      const loginModal = document.querySelector('#login-modal');
      loginModal.classList.add('active');
    }
  }
});

overlayElement.addEventListener('click', () => {
  const loginModal = document.querySelector('#login-modal');
  loginModal.classList.remove('active');
  overlayElement.classList.remove('active');
})

// Render navbar depending on user logged in
function renderNavbar() {
  if(loggedIn()) {
    navbarElement.classList.add('logged');
  }
  else {
    navbarElement.classList.remove('logged');
  }
}

renderNavbar();