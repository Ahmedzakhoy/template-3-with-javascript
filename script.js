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
////////////////////////////////////////////////////////////
//implementing progress bar filling on scroll

//selections
const bar1 = document.querySelector(
  ".skills .skills-container .skills-elements .skills-element .bar1"
);
const bar2 = document.querySelector(
  ".skills .skills-container .skills-elements .skills-element .bar2"
);
const bar3 = document.querySelector(
  ".skills .skills-container .skills-elements .skills-element .bar3"
);
const bar4 = document.querySelector(
  ".skills .skills-container .skills-elements .skills-element .bar4"
);
const allBars = document.querySelectorAll(
  ".skills .skills-container .skills-elements .skills-element .skills-prog div"
);

//callback function for intersection observer
const loadBar = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const bar = entry.target;
  //add style width to bar
  bar.style.width = bar.closest(".skills-prog").dataset.percent;
  observer.unobserve(bar);
};

//bar observer function
const barObserver = new IntersectionObserver(loadBar, {
  root: null,
  threshold: 0,
  rootMargin: "-150px",
});

//implement observe() method on bar
allBars.forEach((bar) => barObserver.observe(bar));
////////////////////////////////////////////////////////////
//implementing videos from youtube Iframe API

//selections and videos ID array
const videosArray = [
  `Z-zNHHpXoMM`,
  `ukLnPbIffxE`,
  `qiYDYsPslrc`,
  `lyJqgL3Zp4E`,
  `tu9h8LTFkKk`,
  `zIYC6zG265E`,
  `u0KVJ0lj8rw`,
];
const videoList = document.querySelector(".videos-list");
const videoLists = document.querySelectorAll(".videos-list .list-item");
const videoPreview = document.querySelector(".video-preview");

//youtube API call start
// 1. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(id = "Z-zNHHpXoMM") {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: `${id}`,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
function onPlayerReady() {}
function onPlayerStateChange() {}
//youtube API call end

/////////////////////////////////////////////////////
const previewReset = function () {
  videoPreview.innerHTML = "";
  videoPreview.innerHTML = `
  <div id="player"></div>
  <p>Nice Videos You Might Need To Watch</p>
  `;
};
videoList.addEventListener("click", function (event) {
  const vid = event.target.closest(".list-item");
  if (!vid) return;
  const vidNum = +vid.dataset.num;
  if (!vid.classList.contains("active")) {
    previewReset();
    onYouTubeIframeAPIReady(videosArray[vidNum]);
    videoLists.forEach(function (el) {
      el.classList.remove("active");
    });
    vid.classList.add("active");
  }
});
