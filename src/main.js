import iziToast from "izitoast"; // Библиотека для отображения уведомлений
import SimpleLightbox from "simplelightbox";

      
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api'




const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more-btn');

let page = 1;
let searchedQuery = '';
let totalPages = 0; 

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


const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
searchedQuery = event.currentTarget.user_query.value.trim();
    toggleLoader(true);
    if (searchedQuery === '') {
      iziToast.error({
        position: 'topRight', 
        message: "Sorry, field must be filled in!" 
      })
      toggleLoader(false);
      return;
    }
    page = 1;
    const { data } = await fetchPhotosByQuery(searchedQuery, page);
    if (data.total === 0) {
      iziToast.error({
        position: 'topRight', 
        message: "Sorry, there are no images matching your search query. Please try again!" 
        })
      galleryEl.innerHTML = '';
      toggleLoader(false);
      loadMoreBtnEl.classList.add('visually-hidden');
      searchFormEl.reset();

      return;
    } 
    totalPages = Math.ceil(data.totalHits / 15); 
    if (totalPages > 1) {
      loadMoreBtnEl.classList.remove('visually-hidden');
      toggleLoader(false);

      loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
    }

 const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
    toggleLoader(false);
    galleryEl.innerHTML = galleryTemplate;
    lightbox.refresh();
  } catch (err) {
    console.log(err);
    toggleLoader(false);
  }
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


const onLoadMoreBtnClick = async event => {
  try {
    page++;
toggleLoader(true);
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
  // Найдем последний элемент галереи
    const lastLiElement = galleryEl.querySelector('.gallery-card:last-child');

    // Если последний элемент найден, прокручиваем страницу к нему
    if (lastLiElement) {
      const domRect = lastLiElement.getBoundingClientRect();
      const height = domRect.height * 2;  // Прокрутка на дважды высоту элемента
      scrollBy({ top: height, left: 0, behavior: 'smooth' });
    }
        if (page === totalPages) {
          loadMoreBtnEl.classList.add('visually-hidden');
          iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight' ,
  });

      loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
    }
    
    toggleLoader(false);
    lightbox.refresh();
  } catch (err) {
     iziToast.error({
      position: 'topRight' ,
      message: 'Sorry, data processing error. Please try again!',
     })
    toggleLoader(false);
  }
};

