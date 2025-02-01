import iziToast from "izitoast"; // Библиотека для отображения уведомлений
import SimpleLightbox from "simplelightbox";

      
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api'




const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: `alt`, 
  captionDelay: 250,
});
const toggleLoader = (isLoading) => {
  if (isLoading) {
    loaderEl.classList.remove('visually-hidden'); // Показываем загрузчик
  } else {
    loaderEl.classList.add('visually-hidden'); // Скрываем загрузчик
  }
};

const onSearchFormSubmit = event => {
  // loader.classList.toggle(`visually-hidden`);
  event.preventDefault();
  const searchedQuery = event.currentTarget.user_query.value.trim();
  toggleLoader(true);
  fetchPhotosByQuery(searchedQuery)
    .then(data => {
      toggleLoader(false);
      if (data.total === 0) {
        

        iziToast.error({
        position: 'topRight', 
        message: "Sorry, there are no images matching your search query. Please try again!" 
        })

        galleryEl.innerHTML = '';

        searchFormEl.reset();

        return;
      }

      const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
      galleryEl.innerHTML = galleryTemplate;
      // Оновлюємо SimpleLightbox після додавання нових карток
      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      toggleLoader(false);
    });
};

const input = document.querySelector('.js-search-input');


input.addEventListener('input', () => {
  if (input.value !== "") {
    input.classList.add('input-typing');  // Синяя рамка при вводе текста
  } else {
    input.classList.remove('input-typing');  // Убираем синий цвет, если поле пустое
  }
});





searchFormEl.addEventListener('submit', onSearchFormSubmit);

