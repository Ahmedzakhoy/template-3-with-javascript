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
