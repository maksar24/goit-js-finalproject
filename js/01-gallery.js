import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');
let modal = null;

function markUp(arr) {
    return arr
        .map(
            ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
        )
        .join('');
};

gallery.insertAdjacentHTML("afterbegin", markUp(galleryItems));

function handleGetLink(event) {
    event.preventDefault();
    
    if (event.currentTarget === event.target) {
        return;
    };

    const { source } = event.target.dataset;
    const currentImage = galleryItems.find(({ original }) =>
        original === source
    );
    showImageModal(currentImage);
};

function showImageModal({ original, description }) {
    modal = createImageModal(original, description);
    modal.show();

    document.addEventListener('keydown', closeModalByEsc);
};

function createImageModal(link, desk) {
    return basicLightbox.create(`
        <img
            src="${link}" 
            data-source="${link}"
            alt="${desk}
            "width="1000" 
            height="800"
        >
    `);
};

function closeModalByEsc(event) {
    if(event.code === "Escape") {
        modal.close();
        document.removeEventListener('keydown', closeModalByEsc);
    };
};

gallery.addEventListener("click", handleGetLink);