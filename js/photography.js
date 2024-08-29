document.addEventListener("DOMContentLoaded", function () {
  CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
  CustomEase.create("outSmooth", "M0,0 C0.139,0.336 0.202,1 1,1 ");
  gsap.timeline()
    .to(".overlay", { duration: 2, opacity: 0, ease: "outSmooth", },"+=0.5")
});

const mainHeader = document.querySelector(".main-header");
const letters = document.querySelectorAll(".main-header span");

mainHeader.addEventListener("mouseenter", () => {
    letters.forEach((letter, index) => {
        gsap.to(letter, {
            rotationX: 360,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power1.inOut",
            onComplete: () => {
                gsap.set(letter, { rotationX: 0 });
            }
        });
    });
});

mainHeader.addEventListener("click", () => {
  gsap.to(".overlay", {
      duration: 2,
      opacity: 1,
      ease: "outSmooth",
  }).then(() => {
      window.location.href = "index.html"; // Redirect to the home page
  });
});


