const author = document.querySelector('#author');
const title = document.querySelector('#title');
const genre = document.querySelector('#genre');
const year = document.querySelector('#year');

const form_create = document.querySelector('#form-create');

console.log('author: ', author);
console.log('title: ', title);
console.log('genre: ', genre);
console.log('year: ', year);

function createValidation() {
  if (
    author.value !== '' &&
    title.value !== '' &&
    genre.value !== '' &&
    year.value !== ''
  ) {
    form_create.submit();
  } else {
    alert('Alla fälten måste vara ifyllda!');
  }
}
