document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".header");
  var didScroll = false;

  window.addEventListener("scroll", function () {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      handleScroll();
      didScroll = false;
    }
  }, 250);

  function handleScroll() {
    var scrollTop = window.scrollY;

    if (scrollTop > 50) {
      header.classList.add("hide-header");
    } else {
      header.classList.remove("hide-header");
    }
  }
});

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});
