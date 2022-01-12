const searchBookForm = document.querySelector('.search-book-form');
const searchBookInput = document.querySelector('#book-name-input');

searchBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.location.href = `/search/${searchBookInput.value}/1`;
});