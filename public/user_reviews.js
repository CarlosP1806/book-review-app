import { getToken, loggedIn } from './auth.js';
const userDashboardElement = document.querySelector('.user-dashboard');

// Render view's elements to screen
async function render() {
  if (!loggedIn()) {
    document.location.href = '/';
    return;
  }
  const userData = await getUserData();

  const welcomeTitle = document.createElement('h2');
  welcomeTitle.textContent = userData.username;
  const dashboard = document.querySelector('.user-dashboard');
  dashboard.append(welcomeTitle);

  renderReviews();
}

// Display each review associated to current user
async function renderReviews() {
  const token = loggedIn() ? getToken() : null;
  let userReviews = await fetch('/user/reviews', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  userReviews = await userReviews.json();

  userReviews.forEach(review => {
    const reviewContainer = document.createElement('article');
    const reviewContent = document.createElement('p');
    reviewContent.textContent = review.textContent;
    reviewContainer.appendChild(reviewContent);
    userDashboardElement.appendChild(reviewContainer);
  });
}

// Fetch the information for current user
async function getUserData() {
  const token = loggedIn() ? getToken() : null;
  let response = await fetch('/user/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  response = await response.json();
  return response;
}

// Render elements when view loads
render();