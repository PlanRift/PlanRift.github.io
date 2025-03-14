function initializeAnimations() {
  CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
  CustomEase.create("outSmooth", "M0,0 C0.139,0.336 0.202,1 1,1 ");

  gsap.timeline()
    .to('header', { duration: 0.1, scale: 1, opacity: 1, ease: "power1.in" })
    .to(".overlay", { duration: 0.2, opacity: 0, ease: "inOut" })
    .to(".preloader-text-1", { duration: 2, opacity: 1, y: -50, ease: "inOut" })
    .to(".preloader-text-2", { duration: 2.3, opacity: 1, y: -50, ease: "inOut" }, "-=1.5")
    .from(".background", { duration: 3, opacity: 0, y: -1000, ease: "outSmooth" })
    .from(".logo-main", { duration: 3, opacity: 0, y: -1000, ease: "outSmooth" }, "-=3")
    .from(".header-title", { duration: 2.5, opacity: 0, x: -2000, ease: "outSmooth" }, "-=3")
    .from(".header-title-2", { duration: 2.5, opacity: 0, x: 2000, ease: "outSmooth" }, "-=3")
    .from(".disclaimer", { duration: 2.5, opacity: 0, y: -200, ease: "outSmooth" }, "-=1.5")
    .from(".bottom-header-text", { duration: 2.5, opacity: 0, y: 1000, ease: "outSmooth" }, "-=3.7")
    .from(".bottom-header-img", { duration: 2.5, opacity: 0, y: 1000, ease: "outSmooth" }, "-=3.6")
    .from(".bottom-header-desc", { duration: 2.5, opacity: 0, y: 1000, ease: "outSmooth" }, "-=3.5")
    .to(".preloader-text-1", { duration: 2, opacity: 0 }, "-=2.5")
    .to(".preloader-text-2", { duration: 2, opacity: 0 }, "-=2")
    .from(".drawer", { duration: 2.5, opacity: 0, y: 1000, ease: "outSmooth" }, "-=3.5")
    .from(".splide", { duration: 2, opacity: 0, ease: "outSmooth" }, "-=1");
}


window.addEventListener("pageshow", (event) => {
  if (event.persisted && !sessionStorage.getItem("refreshed")) {
    sessionStorage.setItem("refreshed", "true");
    window.location.reload();
  } else {
    sessionStorage.removeItem("refreshed");
  }
  initializeAnimations();
});



document.querySelector('.photography-box').addEventListener('click', function () {
  gsap.to('.overlay', { duration: 1, opacity: 1 })
  gsap.to('header', {
    duration: 1, scale: 0.40, opacity: 0, ease: "power1.in", onComplete: function () { window.location.href = '../photo'; }
  }, "-=1")
});


document.querySelectorAll('.videography-box, .about-box').forEach(element => {
  element.addEventListener('click', function () {
    CustomEase.create("inOut", "M0,0 C0.7,0 0.198,1 1,1 ");
    gsap.to('.overlay-comingSoon', { duration: 1, opacity: 1, ease: "inOut" })
    gsap.to('.overlay-comingSoon', { duration: 1, opacity: 0, delay: 2, ease: "inOut" })
  })
});
