import { getToken, loggedIn } from './auth.js';
const userDashboardElement = document.querySelector('.user-dashboard');

// Render view's elements to screen
async function render() {
  if (!loggedIn()) {
    document.location.href = '/';
    return;
  }
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
    const reviewCard = createReviewCard(review);
    userDashboardElement.appendChild(reviewCard);
  });
}

function createReviewCard(review) {
  const reviewContainer = document.createElement('article');

  // Add headline
  const reviewHeader = document.createElement('h3');
  reviewHeader.textContent = review.headline;
  reviewContainer.appendChild(reviewHeader);

  // Add review text
  const reviewContent = document.createElement('p');
  reviewContent.textContent = review.textContent;
  reviewContainer.appendChild(reviewContent);

  // Add edit button
  const reviewButton = document.createElement('button');
  reviewButton.id = review._id;
  reviewButton.onclick = () => { document.location.href = `review/edit/${review._id}` };
  reviewContainer.appendChild(reviewButton);
  
  return reviewContainer;
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