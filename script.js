"use strict";

////////////////////////////////////////////////////////////
//imgs lazy loading

//selections
const AllSections = document.querySelectorAll(".section");
const AllImgs = document.querySelectorAll(".section img");
const specialImg = document.querySelector(".landing img");
//change img src and blur
AllImgs.forEach((img) => {
  img.classList.add("blur");
  const src = img.getAttribute("src");
  img.dataset.src = src;
  img.src = `compressed-imgs${src.slice(4)}`;
});

//load special landing image after window load event fires
window.addEventListener("load", () => {
  specialImg.src = specialImg.dataset.src;
  specialImg.addEventListener("load", function () {
    specialImg.classList.remove("blur");
  });
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
// mega menu on click event

//selection
const megaMenu = document.querySelector(".mega-menu");
const megaMenuHyperlink = document.querySelector(".mega-menu-a");
const megaMenuLink = document.querySelector(
  "header .container nav > ul > li:last-child"
);
const overlay = document.querySelector(".overlay");
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
//sticky header implementation

//selections
const header = document.querySelector("header");
const headerNav = document.querySelector(".header-nav");
const landing = document.querySelector(".landing");

// get height of element
const headerHeight = header.getBoundingClientRect().height;
// callback function for observer

//parent function for implementation of sticky nav with different element and class name
function stickyNavParentFunction(element, className, match = false) {
  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      element.classList.add(className);
      overlay.style.top = "74px";
      megaMenu.classList.remove("show-mega-menu-media");
    } else {
      element.classList.remove(className);
      overlay.style.top = match && entry.isIntersecting ? "148px" : "74px";
      match ? megaMenu.classList.add("show-mega-menu-media") : "";
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
    stickyNavParentFunction(headerNav, "sticky-nav-of-header", true);
  } else {
    stickyNavParentFunction(header, "sticky-header");
  }
}
const mediaNav = window.matchMedia("(max-width: 767px)");
stickyNavMedia(mediaNav); // Call listener function at run time
mediaNav.addEventListener("change", stickyNavMedia); // Attach listener function on state changes

////////////////////////////////////////////////////////////
//countDown timer

//selections
const daysElement = document.querySelector(".days span");
const hoursElement = document.querySelector(".hours span");
const minutesElement = document.querySelector(".minutes span");
const secondsElement = document.querySelector(".seconds span");

// get future year dynamically from current year
let year = new Date().getFullYear() + 1;
// future ISO String time
const futureDate = `${year}-03-05T18:05:47.557Z`;
//callback function fot set intveral
function timer() {
  const date2 = new Date(futureDate).getTime();
  const date = Date.now();
  const durationInS = (date2 - date) / 1000;
  const timeInDays = Math.trunc(durationInS / (60 * 60 * 24));
  const timeInHours = Math.trunc((durationInS % (60 * 60 * 24)) / (60 * 60));
  const timeInMinutes = Math.trunc((durationInS % (60 * 60)) / 60);
  const timeInSeconds = Math.trunc(durationInS % 60);
  if (durationInS <= 0) {
    clearInterval(countDownInterval);
  }
  daysElement.textContent = timeInDays;
  hoursElement.textContent = timeInHours;
  minutesElement.textContent = timeInMinutes;
  secondsElement.textContent = timeInSeconds;
}
//set interval timer
const countDownInterval = setInterval(timer, 1000);
////////////////////////////////////////////////////////////
//implementing section loading on scroll

//adding section loading class to all sections
const AllSectionsExceptHeaderLandingFooter = [...AllSections].slice(2, -1);

AllSectionsExceptHeaderLandingFooter.forEach((section) => {
  section.classList.add("section-loading");
});

//callback function for intersection observer
const loadSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const section = entry.target;
  //remove section-loading class
  section.classList.remove("section-loading");
  observer.unobserve(section);
};

//section observer function
const sectionObserver2 = new IntersectionObserver(loadSection, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

//implement observe() method
AllSectionsExceptHeaderLandingFooter.forEach((section) =>
  sectionObserver2.observe(section)
);
