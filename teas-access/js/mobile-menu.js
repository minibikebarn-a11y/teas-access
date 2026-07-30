// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

});

// Close menu when clicking a link
document.querySelectorAll("#mobileMenu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");

    });

});

// Close when resizing to desktop
window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");

    }

});