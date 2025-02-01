export const createGalleryCardTemplate = imgInfo => {
  return `
    <li class="gallery-card">
    <a href="${imgInfo.largeImageURL}">
    <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"  />
    </a>
    <div class="gallery-container">
    <ul class="gallery-list">
    <li class="gallery-item">
    <p class="gallery-text">Likes</p>
    <p class="gallery-quantity">${imgInfo.likes}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Views</p>
    <p class="gallery-quantity">${imgInfo.views}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Comments</p>
    <p class="gallery-quantity">${imgInfo.comments}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Downloads</p>
    <p class="gallery-quantity">${imgInfo.downloads}</p>
    </li>
    </ul>
    </div>
    </li>
  `;
};