import { loggedIn, jwtDecode }  from './auth.js';

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

function renderNavbar() {
  console.log(loggedIn());
}

renderNavbar();