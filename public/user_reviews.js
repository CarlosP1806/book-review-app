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
  reviewContainer.classList.add('card');
  reviewContainer.classList.add('card--vertical');

  // Create card content
  const cardContent = document.createElement('div');
  cardContent.classList.add('card__content');
  reviewContainer.appendChild(cardContent);

  // Create card header
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card__header');
  cardContent.appendChild(cardHeader);

  // Add book title
  const reviewBookTitle = document.createElement('h2');
  reviewBookTitle.textContent = review.bookTitle;
  reviewBookTitle.classList.add('text');
  reviewBookTitle.classList.add('text--dark');
  reviewBookTitle.classList.add('text--med');
  cardHeader.appendChild(reviewBookTitle);

  // Add review score
  const reviewScore = document.createElement('div');
  reviewScore.classList.add('review-card__score');
  reviewScore.textContent = review.userScore;
  if(review.userScore <= 5) reviewScore.classList.add('low');
  else if(review.userScore <= 7) reviewScore.classList.add('med');
  else reviewScore.classList.add('high');
  cardHeader.appendChild(reviewScore);

  // Add headline
  const reviewHeader = document.createElement('h3');
  reviewHeader.textContent = review.headline;
  reviewHeader.classList.add('text');
  reviewHeader.classList.add('text--light');
  cardContent.appendChild(reviewHeader);

  // Add review text
  const reviewContent = document.createElement('p');
  reviewContent.textContent = review.textContent;
  reviewContent.classList.add('text');
  cardContent.appendChild(reviewContent);

  // Add edit button
  const reviewButton = document.createElement('button');
  reviewButton.id = review._id;
  reviewButton.onclick = () => { document.location.href = `review/edit/${review._id}` };
  reviewButton.textContent = 'Edit review';
  reviewButton.classList.add('btn');
  reviewButton.classList.add('btn--primary');
  reviewButton.classList.add('btn--rounded-bottom');
  reviewContainer.appendChild(reviewButton);
  
  return reviewContainer;
}

// Render elements when view loads
render();