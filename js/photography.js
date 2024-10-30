document.addEventListener("DOMContentLoaded", function () {
  // CustomEase animations
  CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
  CustomEase.create("outSmooth", "M0,0 C0.139,0.336 0.202,1 1,1 ");

  gsap.timeline()
    .to(".overlay", { duration: 2, opacity: 0, ease: "outSmooth" }, "+=0.5")
    .from(".navbar", { duration: 1.5, y: -100, ease: "outSmooth" }, "-=2")
    .from(".main-header", { duration: 1.5, x: 1000, ease: "outSmooth" }, "-=2")
    .from(".second-header", { duration: 1.5, x: 1000, ease: "outSmooth" }, "-=1.9")
    .from(".header", {
      backgroundPosition: "bottom left calc(-500px)", opacity: 0, duration: 2, ease: "outSmooth"
    }, "=-2");
    
  const allJsonUrls = [
    'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/pets.JSON',
    'https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/street.JSON'
  ];

  Promise.all(allJsonUrls.map(url => fetch(url).then(response => response.json())))
    .then(allData => {
      const columns = [
        document.getElementById('column-1'),
        document.getElementById('column-2'),
        document.getElementById('column-3'),
      ];

      // Flatten the array of arrays into a single array
      const combinedData = allData.flat();

      combinedData.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.name;

        // Distribute images evenly across the columns
        const columnIndex = index % columns.length;
        columns[columnIndex].appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching JSON:', error));

  const mainHeader = document.querySelector(".gohome");
  if (mainHeader) {
    mainHeader.addEventListener("click", () => {
      gsap.to(".overlay", {
        duration: 2,
        opacity: 1,
        ease: "outSmooth",
      }).then(() => {
        window.location.href = "../index.html"; // Redirect to the home page
      });
    });
  }
});


