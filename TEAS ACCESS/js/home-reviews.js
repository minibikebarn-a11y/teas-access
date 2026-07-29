// ========================================
// HOME REVIEWS
// ========================================

document.addEventListener("DOMContentLoaded", loadReviews);

async function loadReviews() {

    const grid = document.getElementById("reviewsGrid");

    if (!grid) return;

    const { data, error } = await supabaseClient

        .from("reviews")

        .select("*")

        .eq("approved", true)

        .order("created_at", { ascending: false })

        .limit(6);

    if (error) {

        console.error(error);

        return;

    }

    if (!data.length) {

        grid.innerHTML = `
            <p style="text-align:center;">
                No reviews available yet.
            </p>
        `;

        return;

    }

    grid.innerHTML = "";

    data.forEach((review, index) => {

        const initials = getInitials(review.customer_name);

        const stars = "★".repeat(review.rating);

        grid.innerHTML += `

        <div class="review-card glass reveal delay-${(index % 6) + 1}">

            <div class="review-top">

                <div class="review-avatar">

                    ${initials}

                </div>

                <div>

                    <h4>${review.customer_name}</h4>

                    <span class="verified">

                        <i data-lucide="badge-check"></i>

                        Verified Student

                    </span>

                </div>

            </div>

            <div class="review-score">

                ${stars}

            </div>

            <p>

                ${review.review}

            </p>

        </div>

        `;

    });

    if (window.lucide) {

        lucide.createIcons();

    }

}

function getInitials(name) {

    if (!name) return "?";

    return name

        .split(" ")

        .map(word => word[0])

        .join("")

        .substring(0, 2)

        .toUpperCase();

}