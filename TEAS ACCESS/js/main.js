// ========================================
// HOME STUDENT RESULTS
// ========================================

let galleryImages = [];
let currentImage = 0;

document.addEventListener("DOMContentLoaded", loadStudentResults);

async function loadStudentResults() {

    const gallery = document.getElementById("studentGallery");

    if (!gallery) return;

    const { data, error } = await supabaseClient

        .from("student_results")

        .select("*")

        .eq("featured", true)

        .order("display_order", { ascending: true });

    if (error) {

        console.error(error);

        return;

    }

    if (!data.length) {

        gallery.innerHTML = `
            <p style="text-align:center;">
                No student results available.
            </p>
        `;

        return;

    }

    gallery.innerHTML = "";

    data.forEach((student, index) => {

        gallery.innerHTML += `

        <div class="gallery-card glass reveal delay-${(index % 6) + 1}">

            <img
                src="${student.image_url}"
                class="gallery-image"
                alt="${student.student_name}"

                data-name="${student.student_name}"
                data-score="${student.score}"
                data-program="${student.program}"
                data-attempt="${student.attempt}"
                data-review="${student.review}">

            <div class="gallery-overlay">

                <span class="score-badge">

                    ${student.score}

                </span>

                <h4>Passed ATI TEAS</h4>

            </div>

        </div>

        `;

    });

    if (window.lucide) {

        lucide.createIcons();

    }

    initializeGallery();

}
// ========================================
// LIGHTBOX
// ========================================

function initializeGallery() {

    galleryImages = document.querySelectorAll(".gallery-image");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const viewerName = document.getElementById("viewerName");
    const viewerScore = document.getElementById("viewerScore");
    const viewerProgram = document.getElementById("viewerProgram");
    const viewerAttempt = document.getElementById("viewerAttempt");
    const viewerReview = document.getElementById("viewerReview");

    galleryImages.forEach((img, index) => {

        img.addEventListener("click", () => {

            currentImage = index;

            updateViewer();

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    function updateViewer() {

        const img = galleryImages[currentImage];

        lightboxImage.src = img.src;

        viewerName.textContent = img.dataset.name;

        viewerScore.textContent = img.dataset.score;

        viewerProgram.textContent = img.dataset.program;

        viewerAttempt.textContent = img.dataset.attempt;

        viewerReview.textContent = img.dataset.review;

    }

    document.getElementById("nextImage").onclick = () => {

        currentImage++;

        if (currentImage >= galleryImages.length) {

            currentImage = 0;

        }

        updateViewer();

    };

    document.getElementById("prevImage").onclick = () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage = galleryImages.length - 1;

        }

        updateViewer();

    };

    document.getElementById("closeLightbox").onclick = closeViewer;

    lightbox.onclick = (e) => {

        if (e.target === lightbox) {

            closeViewer();

        }

    };

    function closeViewer() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

}


   

    document.getElementById("nextImage").onclick = () => {

        currentImage++;

        if (currentImage >= galleryImages.length) {

            currentImage = 0;

        }

        updateViewer();

    };

    document.getElementById("prevImage").onclick = () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage = galleryImages.length - 1;

        }

        updateViewer();

    };

    document.getElementById("closeLightbox").onclick = closeViewer;

    lightbox.onclick = (e) => {

        if (e.target === lightbox) {

            closeViewer();

        }

    };

    function closeViewer() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }
    // ========================================
// COUNTER ANIMATION
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 100;

        function updateCounter(){

            current += increment;

            if(current < target){

                counter.textContent = Math.ceil(current);

                requestAnimationFrame(updateCounter);

            }else{

                counter.textContent = target;

            }

        }

        updateCounter();

    });

});

           