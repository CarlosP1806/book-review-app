import { getToken, loggedIn } from './auth.js';

const reviewForm = document.querySelector('.review-form');
const scoreInput = document.querySelector('#review-score');
const headlineInput = document.querySelector('#review-headline');
const reviewInput = document.querySelector('#review-text');
const deleteReviewBtn = document.querySelector('#btn--delete');

// Only render if current user owns review
async function render() {
  if(!loggedIn()) {
    document.location.href = "/";
    return;
  }

  const user = await getUserData();
  const review = await getReviewData();
  if(review[0].authorId !== user._id) {
    document.location.href = "/";
    return;
  }
}

reviewForm.addEventListener('submit', async event => {
  event.preventDefault();
  if(!scoreInput.value || !reviewInput.value || !headlineInput.value) {
    return; // Must fill all inputs
  } 

  const reviewData = {
    userScore: parseInt(scoreInput.value),
    headline: headlineInput.value,
    textContent: reviewInput.value
  };

  const review = await getReviewData();
  const reviewId = review[0]._id;

  const response = await fetch(`/review/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  });

  window.location.replace(`/user`);
});

// Get the information from current user
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

// Get the information from the current review
async function getReviewData() {
  const reviewId = document.location.href.split('/')[5];
  let review = await fetch(`/review/${reviewId}`);
  review = await review.json();
  return review;
}

deleteReviewBtn.addEventListener('click', async event => {
  event.preventDefault();
  const review = await getReviewData();
  const reviewId = review[0]._id;

  const response = await fetch(`/review/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  window.location.replace('/user');
});

render();