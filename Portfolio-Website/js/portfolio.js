//These functions open and close the contact form
function openForm() {
    var form = document.getElementById("myForm");
    if (form) {
        form.style.display = "block";
    }
}

function closeForm() {
    var form = document.getElementById("myForm");
    if (form) {
        form.style.display = "none";
    }
}

//This function displays the first image in the slideshow when the page loads
var slideIndex = 1;
showSlides(slideIndex);

//This function changes the slide when the user clicks the next or previous buttons
function plusSlides(n) {
    showSlides(slideIndex += n);
}

//This function changes the slide when the dots are clicked
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides"); //This takes all elements with the class name "mySlides" and stores them in a variable called "slides"
    var dots = document.getElementsByClassName("dot"); //This takes all elements with the class name "dot" and stores them in a variable called "dots"
    if (n > slides.length) { slideIndex = 1 } //If the slide index is greater than the number of slides, it resets to the first slide
    if (n < 1) { slideIndex = slides.length } //If the slide index is less than 1, it resets to the last slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //This loop takes each item in the array "slides" and sets the display to none
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); //This loop takes each item in the array "dots" and removes the class "active"
    }
    slides[slideIndex - 1].style.display = "block"; //This displays the current slide
    dots[slideIndex - 1].className += " active"; //This adds the class "active" to the current dot
}

//This code will create close the contact form when the user clicks outside of it
//The first step is to add an for any clicks on the website
document.addEventListener('click', function (event) {
    //Here we state that if the click happens on the cancel button OR anywhere that is not the contact for AND the click does not happen on
    //any element with the contact class the call the closeForm function
    if (event.target.matches('.cancel') || (!event.target.closest('.form-popup') && !event.target.closest('.Pop_Up_Button') && !event.target.closest('.contact'))) {
        closeForm();
    }
}, false);