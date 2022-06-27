"use strict";

//selections
const AllSections = document.querySelectorAll(".section");
const AllImgs = document.querySelectorAll(".section img");

////////////////////////////////////////////////////////////
//imgs lazy loading

//change img src and blur
AllImgs.forEach((img) => {
  img.classList.add("blur");
  const src = img.getAttribute("src");
  img.dataset.src = src;
  img.src = `compressed-imgs${src.slice(4)}`;
});

//callback function for intersection observer
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const sectionImgs = entry.target.querySelectorAll("img");
  //replace src attribute with data-src
  sectionImgs.forEach((img) => {
    img.src = img.dataset.src;
    img.addEventListener("load", function () {
      img.classList.remove("blur");
    });
  });
  observer.unobserve(entry.target);
};

//section observer function
const sectionObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

//implement observe() method
AllSections.forEach((section) => sectionObserver.observe(section));
////////////////////////////////////////////////////////////
//selection
const megaMenu = document.querySelector(".mega-menu");
const megaMenuHyperlink = document.querySelector(".mega-menu-a");
const megaMenuLink = document.querySelector(
  "header .container nav > ul > li:last-child"
);
const overlay = document.querySelector(".overlay");
// mega menu on click event
//prevent hyperlink default behaviour
megaMenuHyperlink.addEventListener("click", function (event) {
  event.preventDefault();
});
// toggle classes
const toggleMenuAndOverlay = function () {
  megaMenu.classList.toggle("show-mega-menu");
  megaMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

//event listeners on megamenu and overlay
megaMenuLink.addEventListener("click", toggleMenuAndOverlay);
overlay.addEventListener("click", toggleMenuAndOverlay);

//media for mega menu
function megaMenuMedia(media) {
  if (media.matches) {
    // If media query matches
    megaMenu.classList.add("mega-menu-media");
    megaMenu.classList.add("show-mega-menu-media");
    overlay.style.top = "148px";
  } else {
    megaMenu.classList.remove("mega-menu-media");
    megaMenu.classList.remove("show-mega-menu-media");
    overlay.style.top = "";
  }
}
//media function calls
const media = window.matchMedia("(max-width: 767px)");
megaMenuMedia(media); // Call listener function at run time
media.addEventListener("change", megaMenuMedia); // Attach listener function on state changes

////////////////////////////////////////////////////////////
//selections
const header = document.querySelector("header");
const headerNav = document.querySelector(".header-nav");
const landing = document.querySelector(".landing");
//sticky header implementation

// get height of element
const headerHeight = header.getBoundingClientRect().height;
// callback function for observer

//parent function for implementation of sticky nav with different element and class name
function stickyNavParentFunction(element, className) {
  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      element.classList.add(className);
      overlay.style.top = "74px";
      megaMenu.classList.remove("show-mega-menu-media");
    } else {
      element.classList.remove(className);
      overlay.style.top = "148px";
      megaMenu.classList.add("show-mega-menu-media");
    }
  };
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight + 20}px`,
  });
  headerObserver.observe(landing);
}

//media for sticky nav function call for different screen sizes
function stickyNavMedia(media) {
  if (media.matches) {
    // If media query matches
    stickyNavParentFunction(headerNav, "sticky-nav-of-header");
  } else {
    stickyNavParentFunction(header, "sticky-header");
  }
}
const mediaNav = window.matchMedia("(max-width: 767px)");
stickyNavMedia(mediaNav); // Call listener function at run time
mediaNav.addEventListener("change", stickyNavMedia); // Attach listener function on state changes
