// Navbar Hamburger Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let counter = 0;
const slideWidth = slides[0].clientWidth; // Get width of first slide

// Position the slides correctly initially
carousel.style.transform = `translateX(${-slideWidth * counter}px)`;


nextBtn.addEventListener('click', () => {
    if (counter >= slides.length - 1) return; // Prevent going past the last slide
    carousel.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carousel.style.transform = `translateX(${-slideWidth * counter}px)`;
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return; // Prevent going before the first slide
    carousel.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carousel.style.transform = `translateX(${-slideWidth * counter}px)`;
});


carousel.addEventListener('transitionend', () => {
    // Optional:  If you want to loop the carousel back to the beginning
    // when it reaches the end.
    // if (slides[counter].id === 'lastClone') {
    //     carousel.style.transition = "none";
    //     counter = slides.length - 2;
    //     carousel.style.transform = `translateX(${-slideWidth * counter}px)`;
    // }
    // if (slides[counter].id === 'firstClone') {
    //     carousel.style.transition = "none";
    //     counter = slides.length - counter;
    //     carousel.style.transform = `translateX(${-slideWidth * counter}px)`;
    // }
});


// Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = header.nextElementSibling;

        // Toggle the 'active' class on the header (for arrow rotation)
        header.classList.toggle('active');

        // Toggle the max-height of the content (for animation)
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;  // Close it
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Open it
        }

        // Close other open accordions (optional)
        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header && otherHeader.classList.contains('active')) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = null;
            }
        });
    });
});