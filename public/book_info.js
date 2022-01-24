import { loggedIn } from './auth.js';

const titleElement = document.querySelector('.section__header');

// Get data of book being reviewed
function getBookId() {
  // Retrieve google book id from url
  const bookId = document.location.href.split('/')[4];
  return bookId;
}

function renderWriteReviewBtn() {
  if (loggedIn()) {
    const writeReviewBtn = document.createElement('a');
    writeReviewBtn.classList.add('text--hover-highlight');
    writeReviewBtn.classList.add('text');
    writeReviewBtn.textContent = 'Review this book';
    
    const bookId = getBookId();
    writeReviewBtn.href = `/book/${bookId}/review`;

    titleElement.appendChild(writeReviewBtn);
  }
}

renderWriteReviewBtn();