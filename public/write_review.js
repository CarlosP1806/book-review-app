import { getToken, loggedIn } from './auth.js';

const reviewForm = document.querySelector('.review-form');
const scoreInput = document.querySelector('#review-score');
const headlineInput = document.querySelector('#review-headline');
const reviewInput = document.querySelector('#review-text');

function render() {
  if(!loggedIn()) {
    document.location.href = '/'; // Login required
    return;
  }
}

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

// Get data of book being reviewed
async function getBookData() {
  // Retrieve google book id from url
  const bookId = document.location.href.split('/')[4];

  let bookFetchResponse =
    await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
  bookFetchResponse = await bookFetchResponse.json();
  const title = bookFetchResponse.volumeInfo.title


  return { bookId, title };
}


reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if(!scoreInput.value || !reviewInput.value || !headlineInput.value) {
    return; // Must fill all inputs
  }

  const {bookId, title} = await getBookData();
  const user = await getUserData();

  const reviewData = {
    bookId: bookId,
    bookTitle: title,
    authorId: user._id,
    userScore: parseInt(scoreInput.value),
    headline: headlineInput.value,
    textContent: reviewInput.value
  };

  const response = await fetch('/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  });

  document.location.href = `/book/${bookId}`;
});

render();