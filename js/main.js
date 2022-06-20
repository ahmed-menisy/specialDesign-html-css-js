"use strict";
import "./settingModule.js";
// ============================= SELECT ELEMENTS
let landingPage = document.getElementById("landingAreaPage"); // landing Page
const navLinks = document.querySelectorAll("header .links .nav-link"); //nav links
const ulLinks = document.querySelector(".nav-link ul.links"); //ul links
const sectionSkils = document.getElementById("skils"); // section skils
const allSections = document.querySelectorAll("section"); // section  all
const progresPars = document.querySelectorAll(".progress .progress-par");
const gallaryImages = Array.from(document.querySelectorAll(".our-area img")); // all images
const lightBox = document.querySelector(".our-gallary .light-box"); // light box
const boxImg = document.querySelector(".our-gallary .box-img"); //  box img
const close = document.querySelector(".our-gallary .light-box .close"); //close box
const preve = document.querySelector(".our-gallary .light-box .preve"); //preve box
const next = document.querySelector(".our-gallary .light-box .next"); //next box
const navBullets = document.querySelectorAll(".nav-bullets .bullet");
const menuBtn = document.getElementById("menuBtn");
const loader = document.querySelector(".loader");
// ============================= GLOBAL
const imagesArray = [
   // images pathes
   "landing-1",
   "landing-2",
   "landing-3",
   "landing-4",
   "landing-5",
];
let startCount = false; // skils when scroll
let curentIndexImg = 0; // index image gallary
let curentSection; // curent section using in scroll
// ============================= FUNCTIONS
// ---- change images landing page
export function changeImage() {
   let randomNum = Math.floor(Math.random() * imagesArray.length);
   landingPage.style.backgroundImage = ` url(images/${imagesArray[randomNum]}.jpg)`;
}
// --- change Active
export function changeActive(items, elemnt) {
   items.forEach((item) => item.classList.remove("active")); // items loop to remove active
   elemnt.classList.add("active"); // element to add active
}
// --- count skils
let startCountSkil = (item) => {
   let prog = item.dataset.prog;
   let num = item.dataset.num;
   setTimeout(() => {
      let count = setInterval(() => {
         item.style.width = num++ + "%";
         item.dataset.num++;
         if (num == prog) {
            clearInterval(count);
         }
      }, 15);
   }, 1500);
};
// --- show light box
let showLightBox = (curentSrc) => {
   boxImg.style.backgroundImage = `url(${curentSrc})`;
   lightBox.style.display = "flex";
};
// --- close light box
let closeLigthBox = () => {
   lightBox.style.display = "none";
};
// --- next gallary
let nextGallary = () => {
   curentIndexImg++;
   if (curentIndexImg == gallaryImages.length) {
      curentIndexImg = 0;
   }
   let curentSrc = gallaryImages[curentIndexImg].src;
   boxImg.style.backgroundImage = `url(${curentSrc})`;
};
// --- prev gallary
let preveGallary = () => {
   curentIndexImg--;
   if (curentIndexImg < 0) {
      curentIndexImg = gallaryImages.length - 1;
   }
   let curentSrc = gallaryImages[curentIndexImg].src;
   boxImg.style.backgroundImage = `url(${curentSrc})`;
};
// --- scroll behavir
function scrollBehavir(elements) {
   elements.forEach((elm) => {
      elm.addEventListener("cick", (e) => {
         document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth",
         });
      });
   });
}
// ============================= EVENTS
// ---- nav change active
// navLinks.forEach((link) => {
//    link.addEventListener("click", () => {
//       changeActive(navLinks, link);
//    });
// });
// ---- skils when skroll
addEventListener("scroll", () => {
   if (scrollY >= sectionSkils.offsetTop - 200) {
      if (!startCount) {
         progresPars.forEach((item) => startCountSkil(item));
      }
      startCount = true;
   }
});
// --- images open light
gallaryImages.forEach((image) => {
   image.addEventListener("click", (e) => {
      curentIndexImg = gallaryImages.indexOf(e.target);
      let curentSrc = e.target.src;
      showLightBox(curentSrc);
   });
});
// --- close light box
close.addEventListener("click", () => {
   closeLigthBox();
});
// --- next image
next.addEventListener("click", () => {
   nextGallary();
});
// --- preve image
preve.addEventListener("click", () => {
   preveGallary();
});
// --- key down for gallary
document.addEventListener("keydown", (e) => {
   if (e.key == "Escape") {
      closeLigthBox();
   } else if (e.key == "ArrowLeft") {
      preveGallary();
   } else if (e.key == "ArrowRight") {
      nextGallary();
   }
});
// --- navBullets scroll behavir
scrollBehavir(navBullets);
// --- navbar scroll click behavir
scrollBehavir(navLinks);
// --- nav bullets set active in nav
// --- change nav link when scroll
addEventListener("scroll", () => {
   allSections.forEach((section) => {
      if (scrollY >= section.offsetTop - 100) {
         curentSection = section.getAttribute("id");
      }
   });
   navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.href.includes(curentSection)) {
         link.classList.add("active");
      }
   });
   navBullets.forEach((bullet) => {
      bullet.classList.remove("active");
      if (bullet.href.includes(curentSection)) {
         bullet.classList.add("active");
      }
   });
});
// --- navbar show
menuBtn.onclick = function () {
   ulLinks.classList.toggle("show-nav");
};
addEventListener("click", (e) => {
   if (e.target.parentElement.parentElement != ulLinks && e.target != menuBtn) {
      // to check if don't click in ul links or menu button
      ulLinks.classList.remove("show-nav");
   }
});
// --- wow anaimation
new WOW().init();
// --- typed js
var typed = new Typed(".typed", {
   strings: ["Creative", "Vibrant", "Dynamic", "Inventive", "passionate"],
   typeSpeed: 130,
   backDelay: 2000,
   backSpeed: 60,
   smartBackspace: true,
   loop: true,
});
// --- loader
addEventListener("load", () => {
   loader.style.opacity = `0`;
   setTimeout(() => {
      document.body.style.overflow = `visible`;
      loader.style.display = `none`;
   }, 1500);
});
