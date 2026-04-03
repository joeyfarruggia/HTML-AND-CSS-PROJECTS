
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

const contactModal = document.getElementById('contact-modal');
const openContactModalBtn = document.getElementById('open-contact-modal');
const closeContactModalBtn = document.getElementById('close-contact-modal');
const contactForm = document.getElementById('contact-form');

function openContactModal() {
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
}

function closeContactModal() {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
}

openContactModalBtn.addEventListener('click', openContactModal);
closeContactModalBtn.addEventListener('click', closeContactModal);

contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeContactModal();
    }
});

function validateForm() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all fields.');
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }
    alert('Thank you for submitting your contact information!');
    return true;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        contactForm.reset();
        closeContactModal();
    }
});