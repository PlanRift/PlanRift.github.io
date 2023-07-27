const vid = document.getElementById("street");

window.addEventListener("scroll", function() {
    const scrollPosition = window.pageYOffset;
    vid.style.transform = `translateY(${scrollPosition * 0.3}px)`;
});
