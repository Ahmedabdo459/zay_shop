// navbar
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
});