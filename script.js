const lightbox = document.createElement('div');
lightbox.id = 'lightbox';

// Add close, previous, and next buttons to lightbox
const closeButton = createButton('closeButton', 'X', () => {
    lightbox.classList.remove('active');
});
const prevButton = createButton('prevButton', '<', showPrevImage);
const nextButton = createButton('nextButton', '>', showNextImage);

lightbox.appendChild(closeButton);
lightbox.appendChild(prevButton);
lightbox.appendChild(nextButton);

document.body.appendChild(lightbox);

const images = document.querySelectorAll('img');
let currentImageIndex = 0;

images.forEach((image, index) => {
    // Check if the image has a data-lightbox-ignore attribute
    if (!image.hasAttribute('data-lightbox-ignore')) {
        image.addEventListener('click', e => {
            currentImageIndex = index;
            updateImage();
            lightbox.classList.add('active');
        });
    }
});

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
});

function createButton(id, text, clickHandler) {
    const button = document.createElement('div');
    button.id = id;
    button.innerHTML = text;
    button.addEventListener('click', clickHandler);
    return button;
}

function updateImage() {
    const img = document.createElement('img');
    img.src = images[currentImageIndex].src;
    while (lightbox.firstChild && lightbox.firstChild !== closeButton) {
        lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.insertBefore(img, closeButton);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
}
