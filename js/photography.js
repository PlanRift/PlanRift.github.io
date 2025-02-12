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
      rows = [
        [allData[1][4], allData[1][1], allData[0][7]],
        [allData[1][20], allData[1][38]],
        [allData[1][30], allData[1][31], allData[1][33]],
        [allData[0][6], allData[1][9], allData[1][8], allData[1][7]],
        [allData[1][6], allData[0][4]],
        [allData[0][1], allData[1][21], allData[1][5]]
      ];

      rows.forEach((row, index) => {
        const rowElement = document.getElementById(`row-${index + 1}`);
        row.forEach(item => {
          const img = document.createElement("img");
          img.src = item.url;
          img.alt = item.name;
          rowElement.appendChild(img);
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

  function navigateUpOneArray(rows) {
    const modalImage = document.getElementById("modal-image");
  
    if (modalImage) {
      const currentSrc = modalImage.src;
  
      let found = false;
      let nextUrl = null;
  
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
          const item = rows[i][j];
  
          if (found && item.url) {
            nextUrl = item.url;
            break;
          }
  
          if (item.url === currentSrc) {
            found = true;
          }
        }
  
        if (nextUrl) break;
      }
      if (!nextUrl && rows.length > 0 && rows[0].length > 0) {
        nextUrl = rows[0][0].url;
      }

      if (nextUrl) {
        modalImage.src = nextUrl;
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
          const item = rows[i][j];
  
          if (found && item.url) {
            prevUrl = item.url;
            break;
          }
  
          if (item.url === currentSrc) {
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


