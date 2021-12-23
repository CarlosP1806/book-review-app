import { loggedIn, logout } from './auth.js';

const navbarElement = document.querySelector('.navbar');
const toggleMenuElement = document.querySelector('.toggle-menu');
const navToggleMenuElement = document.querySelector('.nav-toggle-menu');

// Respond to menu click (responsive nav)
toggleMenuElement.addEventListener('click', () => {
  navbarElement.classList.add('active');
});

navToggleMenuElement.addEventListener('click', () => {
  navbarElement.classList.remove('active');
});

navbarElement.addEventListener('click', (event) => {
  if(loggedIn()) {
    if(event.target.id === '#logout') {
      logout();
    }
  }
});

function renderNavbar() {
  if(loggedIn()) {
    navbarElement.classList.add('logged');
  }
  else {
    navbarElement.classList.remove('logged');
  }
}

renderNavbar();