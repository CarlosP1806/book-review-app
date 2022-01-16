const searchBookForm = document.querySelector('.search-book-form');
const searchBookInput = document.querySelector('#book-name-input');
const cardContainerElement = document.querySelector('.card-container');

// Handle new search request
searchBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.location.href = `/search/${searchBookInput.value}/1`;
});

// Handle clicks on 'view more' buttons via event delegation
cardContainerElement.addEventListener('click', event => {
  event.preventDefault();
  if(event.target.classList.contains('view-more-btn')) {
    document.location.href = `/book/${event.target.id}`;
  }
});