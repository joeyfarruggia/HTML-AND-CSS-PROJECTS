
// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxThumbs = document.getElementById('lightbox-thumbs');
const images = document.querySelectorAll('.image-hover-wrapper .img');
let currentIndex = 0;

function setActiveThumb(index) {
    const thumbs = lightboxThumbs.querySelectorAll('.lightbox-thumb');
    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightboxCaption.textContent = images[index].alt;
    setActiveThumb(index);
    lightbox.classList.add('active');
}

function buildThumbnails() {
    lightboxThumbs.innerHTML = '';
    images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.className = 'lightbox-thumb';
        thumb.addEventListener('click', () => openLightbox(index));
        lightboxThumbs.appendChild(thumb);
    });
}

images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(index));
});

buildThumbnails();

document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

document.querySelector('.lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
});

document.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') document.querySelector('.lightbox-next').click();
    if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev').click();
    if (e.key === 'Escape') lightbox.classList.remove('active');
});
