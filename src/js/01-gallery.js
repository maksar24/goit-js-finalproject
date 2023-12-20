import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');

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
    }

    const { source } = event.target.dataset;
    const currentImage = galleryItems.find(({ original }) =>
        original === source
    );
    showImageModal(currentImage);
};

function showImageModal({original, description}) {
    const instance = basicLightbox.create(`
        <img
            src="${original}" 
            data-source="${original}"
            alt="${description}
            "width="1000" 
            height="800"
        >
    `);

    instance.show();

    document.addEventListener('keydown', event => {
        if(event.code === "Escape") {
            instance.close();
        }
    });
};

gallery.addEventListener("click", handleGetLink);