const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeNavIcon = document.querySelector(".close-nav-icon");
const navMenu = document.querySelector(".header-nav");

hamburgerIcon.addEventListener("click", showNavMenu);
closeNavIcon.addEventListener("click", closeNavMenu);

function showNavMenu(){
    navMenu.style.display = "block"; 
}

function closeNavMenu(){
    navMenu.style.display = "none";
}