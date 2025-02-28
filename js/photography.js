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
      opacity: 0, duration: 2, ease: "outSmooth"
    }, "=-2");

    const allJsonUrls = [
      "https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/pets.JSON",
      "https://raw.githubusercontent.com/PlanRift/driveImagesToHTML/main/street.JSON"
    ];

    let rows = []
    Promise.all(allJsonUrls.map(url => fetch(url).then(response => response.json())))
      .then(allData => {
        // Combine all data into a single object using the file name as the key
        const imageMap = {};
        allData.flat().forEach(item => {
          imageMap[item.name] = item.url;
        });
    
        // Define rows using filenames instead of array indexes
        rows = [
          [imageMap["23.jpg"], imageMap["22.jpg"], imageMap["8.jpg"]],
          [imageMap["18.jpg"], imageMap["27.jpg"]],
          [imageMap["DSC01728.jpg"], imageMap["2-DSC01677.jpg"], imageMap["1-DSC01720.jpg"]],
          [imageMap["1-DSC02356.jpg"], imageMap["2-DSC02347.jpg"], imageMap["7.jpg"], imageMap["DSC09287.jpg"]],
          [imageMap["DSC00053.jpg"], imageMap["DSC00104.jpg"]],
          [imageMap["6-DSC01541.jpg"], imageMap["5-DSC01577.jpg"], imageMap["7-DSC01475.jpg"]],
          [imageMap["DSC00233.jpg"], imageMap["13.jpg"]],
          [imageMap["DSC04618.jpg"], imageMap["DSC04583.jpg"], imageMap["DSC04614.jpg"]],
          [imageMap["DSC08523.jpg"], imageMap["DSC08464(1)     .jpg"], imageMap["DSC08547.jpg"]]
        ];
    
        rows.forEach((row, index) => {
          const rowElement = document.getElementById(`row-${index + 1}`);
          row.forEach(url => {
            if (url) {
              const img = document.createElement("img");
              img.src = url;
              rowElement.appendChild(img);
            }
          });
        });
      })
      .catch(error => console.error("Error fetching JSON:", error));
    

  document.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
      const mainImage = e.target.src;
      const imageModal = document.getElementById("image-modal");
      const content = document.getElementById("content-modal");
      const modalImage = document.getElementById("modal-image");
      modalImage.src = mainImage;
      content.classList.add("open-content");
      imageModal.classList.add("open-modal");
    } else if (e.target.classList.contains("modal")) {
      const content = document.getElementById("content-modal");
      const imageModal = document.getElementById("image-modal");
      content.classList.remove("open-content");
      imageModal.classList.remove("open-modal");
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("lBtn")) {
      navigateDownOneArray(rows)
    } else if (e.target.classList.contains("rBtn")) {
      navigateUpOneArray(rows)
    }
  })

//problematic part lol where the animation doesnt work but the image did change

  function changeImageWithFade(newSrc) {
    const modalImage = document.getElementById("modal-image");
  
    if (modalImage) {
      gsap.to(".modal-image-class", {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
          modalImage.src = newSrc;
          gsap.to(".modal-image-class", { duration: 0.3, opacity: 1 });
        }
      });
    }
  }

  function navigateUpOneArray(rows) {
    const modalImage = document.getElementById("modal-image");
  
    if (modalImage) {
      const currentSrc = modalImage.src;
  
      let found = false;
      let nextUrl = null;
  
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
          const itemUrl = rows[i][j];
  
          if (found) {
            nextUrl = itemUrl;
            break;
          }
  
          if (modalImage.src.includes(itemUrl)) {
            found = true;
          }
        }
  
        if (nextUrl) break;
      }
      if (!nextUrl && rows.length > 0 && rows[0].length > 0) {
        nextUrl = rows[0][0].url;
      }

      if (nextUrl) {
        changeImageWithFade(nextUrl)
    }
    } else {
      console.log("modalImage element not found.");
    }
  }
  
  function navigateDownOneArray(rows) {
    const modalImage = document.getElementById("modal-image");
  
    if (modalImage) {
      const currentSrc = modalImage.src;
      let found = false;
      let prevUrl = null;
  
      for (let i = rows.length - 1; i >= 0; i--) {
        for (let j = rows[i].length - 1; j >= 0; j--) {
          const itemUrl = rows[i][j];
  
          if (found) {
            prevUrl = itemUrl;
            break;
          }
  
          if (modalImage.src.includes(itemUrl)) {
            found = true; 
          }
        }
  
        if (prevUrl) break;
      }
  
      if (!prevUrl) {
        const lastRow = rows[rows.length - 1];
        const lastItem = lastRow[lastRow.length - 1];
        if (lastItem && lastItem.url) {
          prevUrl = lastItem.url;
        }
      }
  

      if (prevUrl) {
        modalImage.src = prevUrl;
      }
    } else {
      console.log("modalImage element not found.");
    }
  }
  
  
  
  
  



  const mainHeader = document.querySelector(".gohome");
  if (mainHeader) {
    mainHeader.addEventListener("click", () => {
      gsap.to(".overlay", {
        duration: 2,
        opacity: 1,
        ease: "outSmooth",
      }).then(() => {
        window.location.href = "../";
      });
    });
  }
});


