document.addEventListener("DOMContentLoaded", function () {
  var dot = document.getElementById('dot');
  dot.addEventListener('click', function () {
    this.classList.toggle('open');
  });
});

// script.js

document.addEventListener('DOMContentLoaded', function () {
  const dot = document.getElementById('dot');
  const drawer = document.querySelector('.drawer');
  const blackTint = document.querySelector(".black-tint")
  const originalBottom = getComputedStyle(drawer).bottom; // Store the original bottom value
  let drawerOpen = false;

  dot.addEventListener('click', function () {
    if (drawerOpen) {
      drawer.style.bottom = originalBottom;
      blackTint.style.opacity = '0'; // Move drawer back to its original position
    } else {
      drawer.style.bottom = '0';
      blackTint.style.opacity = '1'; // Move drawer up
    }
    drawerOpen = !drawerOpen;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('.splide', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    arrows: boolean = false,
    perPage: 3,
    autoWidth: boolean = true,
    pagination: boolean = false,
    pauseOnHover: boolean = true,
    autoScroll: {
      pauseOnHover: boolean = false,
      pauseOnFocus: boolean = false,
      speed: 0.5,
    },
  });

  splide.mount(window.splide.Extensions);
});

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.splide__slide a');

  slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => {
      slides.forEach(otherSlide => {
        if (otherSlide !== slide) {
          otherSlide.classList.add('dimmed');
        }
      });
    });

    slide.addEventListener('mouseleave', () => {
      slides.forEach(otherSlide => {
        otherSlide.classList.remove('dimmed');
      });
    });
  });
});