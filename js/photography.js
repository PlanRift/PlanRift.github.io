document.addEventListener("DOMContentLoaded", function () {
  // CustomEase animations
  CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
  CustomEase.create("outSmooth", "M0,0 C0.139,0.336 0.202,1 1,1 ");
  
  gsap.timeline()
    .to(".overlay", { duration: 2, opacity: 0, ease: "outSmooth" }, "+=0.5");

  // Main header click event
  // const mainHeader = document.querySelector(".gohome");
  // if (mainHeader) {
  //   mainHeader.addEventListener("click", () => {
  //     gsap.to(".overlay", {
  //       duration: 2,
  //       opacity: 1,
  //       ease: "outSmooth",
  //     }).then(() => {
  //       window.location.href = "index.html"; // Redirect to the home page
  //     });
  //   });
  // }
  const allPhoto = document.querySelector(".splide__list__all");
  if (allPhoto) {
    allPhoto.addEventListener("click", () => {
      gsap.to(".overlay", {
        duration: 2,
        opacity: 1,
        ease: "outSmooth",
      }).then(() => {
        window.location.href = "./allPic/index.html"; // Redirect to the home page
      });
    });
  }

  // Function to initialize Splide sliders
  function initializeSplide(selector, autoScrollSpeed) {
    const element = document.querySelector(selector);
    if (element) {
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
    } else {
      console.error(`Element with selector "${selector}" not found.`);
    }
  }

const splide3 = initializeSplide('.splide3', 0.24);

  // Fetch and display JSON data for Pets
  const petsJsonUrl = 'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/pets.JSON';
  fetch(petsJsonUrl)
    .then(response => response.json())
    .then(data => {
      const splideList = document.getElementById('splide-list');

      if (splideList) {
        data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.className = 'splide__slide splide__pet';

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

  // Fetch and display JSON data for Street
  const streetJsonUrl = 'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/street.JSON';
  fetch(streetJsonUrl)
    .then(response => response.json())
    .then(data => {
      const splideListStreet = document.getElementById('splide-list-street');

      if (splideListStreet) {
        data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.className = 'splide__slide splide__street';

          const img = document.createElement('img');
          img.src = item.url;
          img.alt = item.name;

          listItem.appendChild(img);
          splideListStreet.appendChild(listItem);
        });

        // Re-initialize Splide after slides are added
        const splide2 = initializeSplide('.splide2', -0.24);
        splide2.refresh(); // Refresh the Splide instance to apply new slides
      } else {
        console.error('Element with id "splide-list-street" not found.');
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));

    const allJsonUrls = [
      'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/pets.JSON',
      'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/street.JSON'
    ];
  
    Promise.all(allJsonUrls.map(url => fetch(url).then(response => response.json())))
      .then(allData => {
        const splideListAll = document.getElementById('splide-list-all');
  
        if (splideListAll) {
          // Flatten the array of arrays into a single array
          const combinedData = allData.flat();
  
          combinedData.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'splide__slide splide__all';
  
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.name;
  
            listItem.appendChild(img);
            splideListAll.appendChild(listItem);
          });
  
          const splide1 = initializeSplide('.splide1', 0.21);
          splide1.refresh(); // Refresh the Splide instance to apply new slides
        } else {
          console.error('Element with id "splide-list-all" not found.');
        }
      })
      .catch(error => console.error('Error fetching JSON:', error));
});


