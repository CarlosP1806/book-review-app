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
      openModal('#login-modal');
    }
  }
});

overlayElement.addEventListener('click', () => {
  closeModal('#login-modal');
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

const closeModalButton = document.querySelector('.modal-close');
closeModalButton.addEventListener('click', () => {
  closeModal('#login-modal');
});

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