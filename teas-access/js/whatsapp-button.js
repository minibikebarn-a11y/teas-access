// ======================================================
// WHATSAPP TOOLTIP — auto-preview on load
// Shows the tooltip briefly on page load (mainly helps
// mobile visitors, who can't trigger a hover state),
// then fades it out. Hover still works normally afterward.
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const tooltip = document.querySelector(".whatsapp-tooltip");

    if (!tooltip) return;

    // Small delay so it doesn't appear instantly on page load
    setTimeout(() => {

        tooltip.classList.add("auto-show");

        // Fade it back out after a few seconds
        setTimeout(() => {

            tooltip.classList.remove("auto-show");

        }, 4000);

    }, 1200);

});