document.addEventListener("DOMContentLoaded", function () {
  // CustomEase animations
  CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
  CustomEase.create("outSmooth", "M0,0 C0.139,0.336 0.202,1 1,1 ");
  
  gsap.timeline()
    .to(".overlay", { duration: 2, opacity: 0, ease: "outSmooth" }, "+=0.5");

  // Main header click event
  const mainHeader = document.querySelector(".gohome");
  if (mainHeader) {
    mainHeader.addEventListener("click", () => {
      gsap.to(".overlay", {
        duration: 2,
        opacity: 1,
        ease: "outSmooth",
      }).then(() => {
        window.location.href = "index.html"; // Redirect to the home page
      });
    });
  }

  // Initialize Splide sliders
  function initializeSplide(selector, autoScrollSpeed) {
    return new Splide(selector, {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      arrows: false, // Ensure arrows are disabled
      perPage: 6,
      pagination: false, // Ensure pagination is disabled
      pauseOnHover: true,
      autoScroll: {
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: autoScrollSpeed,
      },
    }).mount(window.splide.Extensions);
  }

  // Initialize each Splide slider
  const splide1 = initializeSplide('.splide', 0.2);
  const splide2 = initializeSplide('.splide2', 0.3);
  const splide3 = initializeSplide('.splide3', 0.24);

  // Fetch and display JSON data
  const jsonUrl = 'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/pets.JSON';
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      const splideList = document.getElementById('splide-list');

      if (splideList) {
        data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.className = 'splide__slide';

          const img = document.createElement('img');
          img.src = item.url;
          img.alt = item.name;

          listItem.appendChild(img);
          splideList.appendChild(listItem);
        });

        // Re-initialize Splide after slides are added
        splide3.refresh(); // Refresh the Splide instance to apply new slides
      } else {
        console.error('Element with id "splide-list" not found.');
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));
});
