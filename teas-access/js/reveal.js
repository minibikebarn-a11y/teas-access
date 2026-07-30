// Scroll Reveal Animation
// Watches for elements with .reveal, .reveal-left, .reveal-right, .reveal-scale
// and adds .active once they enter the viewport.

document.addEventListener("DOMContentLoaded", () => {

    const revealEls = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // animate once, then stop watching
                }
            });
        },
        {
            threshold: 0.15,      // trigger when ~15% of element is visible
            rootMargin: "0px 0px -50px 0px" // trigger slightly before it fully enters
        }
    );

    revealEls.forEach((el) => observer.observe(el));

});