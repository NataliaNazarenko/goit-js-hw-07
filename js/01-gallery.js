import { galleryItems } from './gallery-items.js';
// Change code below this line
const listEl = document.querySelector('.gallery');

const makeGalleryMarkup = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href='${original}'>
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</li>`;
};

const makeGalleryMarkupEl = galleryItems.map(makeGalleryMarkup).join('');
listEl.insertAdjacentHTML('beforeend', makeGalleryMarkupEl);
listEl.addEventListener('click', onClickGalleryEl);
listEl.addEventListener('keydown', closeModal);

function onClickGalleryEl(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  createModal(event.target.dataset.source);
}

function createModal(src) {
  const instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">`);

  instance.show();
  closeModal(instance);
}

function closeModal(instance) {
  listEl.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      instance.close();
    }
  });
}
