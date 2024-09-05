document.addEventListener("DOMContentLoaded", function () {
  // CustomEase animations
  CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
  CustomEase.create("outSmooth", "M0,0 C0.139,0.336 0.202,1 1,1 ");
  
  gsap.timeline()
    .to(".overlay", { duration: 2, opacity: 0, ease: "outSmooth" }, "+=0.5");

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
          document.getElementById('column-4')
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
  });


