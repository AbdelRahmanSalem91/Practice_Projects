// Selectors
let bgImages = document.querySelector(".landing-page"),
gear = document.querySelector(".gear-box i"),
coloresList = document.querySelectorAll(".colors li"),
randomInterval = true,
bgInterval,
randomOption = document.querySelectorAll(".imgs-options span"),
navBullets = document.querySelector(".nav-bullets")
myBullets = document.querySelectorAll(".nav-bullets .bullet"),
myLinks = document.querySelectorAll("li a"),
navOptions = document.querySelectorAll(".nav-options span");


// getting options from local storage
let colorOption = localStorage.getItem("color-option");

// checking if the local storage has value of color option
if(colorOption !== null){
  document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"));

  document.querySelectorAll(".colors li").forEach(element => {
    element.classList.remove("active");

    if(element.dataset.color == colorOption){
      element.classList.add("active")
    }
  })
}

// Links 
myLinks.forEach(link => {
  link.addEventListener("click", (e) =>{
    e.target.parentElement.parentElement.querySelectorAll(".active").forEach(element =>{
      element.classList.remove("active");
    })
    e.target.classList.add("active");
  })
})

// hamburger Menu
let hMenuBtn = document.querySelector(".nav-button");
let hMenu = document.querySelector(".nav-ul");

hMenuBtn.addEventListener("click", e => {
  e.stopPropagation();
  hMenu.classList.toggle("open");
})

// Close Hamburger Menu when I Click anywhere
document.addEventListener("click", e =>{
  if(e.target !== hMenuBtn){
    hMenu.classList.remove("open");
  }
  
})


// getting options from local storage
let bgOption = localStorage.getItem("background-option");

// checking if the local storage has value of color option
if(bgOption !== null){
  document.querySelectorAll(".imgs-options span").forEach(element => {
  element.classList.remove("active");
})
  if(bgOption === 'true'){
    randomInterval = true;
    document.querySelector(".imgs-options .yes").classList.add("active");
  }else{
    randomInterval = false;
    document.querySelector(".imgs-options .no").classList.add("active");
  }
}



// opening the settings box
gear.addEventListener('click', function(){
  gear.classList.toggle("fa-spin");
  document.querySelector(".overlay .settings-box").classList.toggle("open");
})



// changing the color theme
coloresList.forEach(color =>{
  color.addEventListener("click", (e) =>{
    // e.target.getAttribute("data-color");
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color);

    // add color to local storage
    localStorage.setItem("color-option", e.target.dataset.color);
    
    // remove all active classes
    activeClass(e);
  })
})

// control random background images
randomOption.forEach(spanButt => {
  spanButt.addEventListener("click", (e) => {
    activeClass(e);

    if(e.target.dataset.background === "yes"){
      randomInterval = true;
      randomBgInterval();
      localStorage.setItem("background-option", true)
    }else{
      randomInterval = false;
      clearInterval(bgInterval);
      localStorage.setItem("background-option", false)
    }
    
  })
})

// Navigation Options

let navLocalItem = localStorage.getItem("navigation-options");

if(navLocalItem !== null){
  navOptions.forEach(span => {
    span.classList.remove("active");
  })
  if(navLocalItem === 'yes'){
    navBullets.style.display = 'block'
    document.querySelector(".nav-options .yes").classList.add("active");
  }else{
    navBullets.style.display = 'none'
    document.querySelector(".nav-options .no").classList.add("active");
  }
}

navOptions.forEach(option => {
  option.addEventListener("click", (e) =>{
    activeClass(e);
    if(e.target.dataset.nav === 'yes'){
      navBullets.style.display = 'block'
      localStorage.setItem("navigation-options", "yes");
    } else {
      navBullets.style.display = 'none'
      localStorage.setItem("navigation-options", "no");
    }
  })
})

// looping random backgroung images
let bgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

bgImages.style.backgroundImage = 'url("/images/01.jpg")';

function randomBgInterval(){
  if(randomInterval === true){
    bgInterval = setInterval( () => {
      let randomImage = Math.floor(Math.random() * bgArray.length);
      bgImages.style.backgroundImage = 'url("/images/' + bgArray[randomImage] + '")';
    }, 5000)
  }
}
randomBgInterval();

// Start Progress Section

let skillSec = document.querySelector(".skills .skills-box");

window.onscroll = function(){
  let skillsOffsetTop = skillSec.offsetTop;

  let skillsOuterHeight = skillSec.offsetHeight;

  let windowHeight = this.innerHeight;

  let mypageYOffset = this.pageYOffset;

  if(mypageYOffset > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
    document.querySelectorAll(".bg-prog .prog").forEach(element =>{
      element.style.width = element.dataset.width;
    })
  }
}

// End Progress Section


// Start Galary Section

let galary = document.querySelectorAll(".galary-img img");

galary.forEach(img => {
  img.addEventListener("click", function(){
  
    let imgOverlay = document.createElement("div");
    imgOverlay.className = "img-overlay";

    let imgPrev = document.createElement("div");
    imgPrev.className = "img-prev";

      if(img.alt !==null){
        
        let imgH2 = document.createElement("h2");
  
        let imgText = document.createTextNode(img.alt);
  
        imgH2.appendChild(imgText);
        imgPrev.appendChild(imgH2);

      }
    
    let createImg = document.createElement("img");
    createImg.setAttribute("src", img.src);
    
    let closeButton = document.createElement("span");
    closeButton.className = "close";

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);
    imgPrev.appendChild(closeButton);
    
    
    imgPrev.appendChild(createImg);
    imgOverlay.appendChild(imgPrev);
    document.body.appendChild(imgOverlay);
    
    
  })
})

// close overlay and popup

document.addEventListener("click", function (e){
  if(e.target.className === "close"){
    e.target.parentElement.parentElement.remove();
  }
})

// End Galary Section

// Start bullets Navigation Section

// Scroll Function
function scrolltowhere(elements){
  elements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
}

scrolltowhere(myBullets);
scrolltowhere(myLinks);

// End bullets Navigation Section

// Add Active Class Function
function activeClass(ev){
  ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
    element.classList.remove("active")
  })
  ev.target.classList.add("active");
}

// Reset Button

document.querySelector(".reset-options").onclick = function(){
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("navigation-options");

  window.location.reload();
}