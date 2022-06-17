"use strict";
import { changeActive, changeImage } from "./main.js";
// ============================= SELECT ELEMENTS
const setingsBox = document.getElementById("settingsBox"); // settings Widget
const iconSetings = document.querySelector(".icon"); // icon setings
const colorOption = Array.from(document.querySelectorAll(".colors-option li")); // color option
const backgroundOption = Array.from(
   document.querySelectorAll(".background-option span")
); // background option
const backgrounds = Array.from(document.querySelectorAll(".choose-background")); // select backgrounds images
let landingPage = document.getElementById("landingAreaPage"); // landing Page
const navOption = Array.from(document.querySelectorAll(".nav-option span")); // nav option yes or no
const navBulletsOpt = Array.from(document.querySelectorAll(".nav-bull span")); // nav bullets yes or no
const navBar = document.getElementById("navBar"); // nav bar
const navBullet = document.querySelector(".nav-bullets"); // nav bullet
// ============================= GLOBAL
let countTimeOut; // time out for mouse move in box option
let colorData; //color
let backgroundCheck = true; // for check back ground if true
let backgroundInterval; // background random
// ============================= WHEN START
(() => {
   // set color when start
   if (getStorage("main color") != null) {
      setColorStart();
   }
   // background check random or no
   if (getStorage("background check") != null) {
      if (getStorage("background check") == "true") {
        document.querySelector('.choose-background').style.display = `none`;
         backgroundCheck = true;
      } else {
         backgroundCheck = false;
        document.querySelector('.choose-background').style.display = `flex`;
      }
      changeActive(
         backgroundOption,
         backgroundOption.find((item) => {
            if (getStorage("background check") == item.dataset.background) {
               return item;
            }
         })
      );
      switchBackground();
   } else {
      switchBackground();
   }
   // set background choose
   if (getStorage("background choose") != null) {
      landingPage.style.backgroundImage = `${getStorage("background choose")}`;
   }
   // nav position check
   if (getStorage("nav position") != null) {
      if (getStorage("nav position") == "true") {
         switchNav(navOption[0].parentElement.querySelector(".Yes"));
      } else {
         switchNav(navOption[0].parentElement.querySelector(".No"));
      }
   }
   // nav bullets
   if (getStorage("navbullet check") != null) {
      if (getStorage("navbullet check") == "true") {
         showOrHideBull(navBulletsOpt[0].parentElement.querySelector(".Yes"));
      } else {
         showOrHideBull(navBulletsOpt[0].parentElement.querySelector(".No"));
      }
   }
})();
// ============================= FUNCTIONS
// ---- open icon settings
let openSeting = () => {
   setingsBox.classList.toggle("open");
   iconSetings.classList.toggle("fa-spin");
};
// ---- set color
let setColor = (e) => {
   colorData = e.target.dataset.color;
   document.documentElement.style.setProperty("--main-color", colorData); //Set Color On Root
};
// ---- set local storage
function setStorage(key, value) {
   localStorage.setItem(key, value);
}
function getStorage(key) {
   return localStorage.getItem(key);
}
// --- set Color When Start
function setColorStart() {
   colorData = getStorage("main color");
   document.documentElement.style.setProperty("--main-color", colorData); //Set Color On Root
   changeActive(
      colorOption,
      colorOption.find((item) => {
         if (item.dataset.color == colorData) {
            return item;
         }
      })
   );
}
// ---- switch background
function switchBackground() {
   if (backgroundCheck) {
      backgroundInterval = setInterval(changeImage, 6000);
   }
}
// --- set background image
let setBackGround = (backsrc) => {
   let curentBack = (landingPage.style.backgroundImage = `url(${backsrc})`);
   setStorage("background choose", curentBack);
};
// --- Switch nav option
function switchNav(item) {
   changeActive(navOption, item);
   if (item.dataset.nav == "true") {
      setStorage("nav position", "true");
      navBar.classList.add("fixed");
      navBar
         .querySelectorAll("ul.links a")
         .forEach((item) => item.classList.add("fixed"));
   } else {
      setStorage("nav position", "false");
      navBar.classList.remove("fixed");
      navBar
         .querySelectorAll("ul.links a")
         .forEach((item) => item.classList.remove("fixed"));
   }
}
// --- nav bullets switch
function showOrHideBull(ev) {
   changeActive(navBulletsOpt, ev);
   if (ev.dataset.bull == "true") {
      navBullet.style.display = `block`;
      setStorage("navbullet check", "true");
   } else {
      navBullet.style.display = `none`;
      setStorage("navbullet check", "false");
   }
}
// ============================= EVENTS
// ---- icon seting click
iconSetings.addEventListener("click", openSeting);
// ---- switch color option
colorOption.forEach((color) => {
   color.addEventListener("click", (e) => {
      changeActive(colorOption, color);
      setColor(e);
      setStorage("main color", colorData);
   });
});
// ---- color option mouse leave and enter
setingsBox.addEventListener("mouseleave", () => {
   countTimeOut = setTimeout(() => {
      setingsBox.classList.remove("open");
      iconSetings.classList.add("fa-spin");
   }, 2000);
});
setingsBox.addEventListener("mouseenter", () => {
   clearTimeout(countTimeOut);
});
// ---- switch background
backgroundOption.forEach((backgroundItem) => {
   backgroundItem.addEventListener("click", (e) => {
      changeActive(backgroundOption, e.target);
      if (e.target.textContent == "Yes") {
         // for check if checked yes or no and change backgroundcheck
         if (!backgroundCheck) {
            backgroundCheck = true;
            switchBackground();
         }
        document.querySelector('.choose-background').style.display = `none`;
      } else {
         backgroundCheck = false;
         clearInterval(backgroundInterval);
         document.querySelector('.choose-background').style.display = `flex`;
      }
      setStorage("background check", backgroundCheck);
   });
});
// --- chose background image
backgrounds.forEach((background) => {
   background.addEventListener("click", (e) => {
      setBackGround(e.target.src);
   });
});
// --- hide background if randon no
// --- Switch nav option
navOption.forEach((nav) => {
   nav.addEventListener("click", (e) => {
      changeActive(navOption, e.target);
      switchNav(e.target);
   });
});
// --- nav bullets switch
navBulletsOpt.forEach((nav) => {
   nav.addEventListener("click", (ev) => {
      showOrHideBull(ev.target);
   });
});
