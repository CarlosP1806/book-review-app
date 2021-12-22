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