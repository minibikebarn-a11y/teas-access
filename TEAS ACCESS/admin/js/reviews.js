// ========================================
// REVIEWS MANAGEMENT
// ========================================

let allReviews = [];

document.addEventListener("DOMContentLoaded", () => {

    loadReviews();

    const search = document.getElementById("searchReviews");

    if (search) {
        search.addEventListener("input", filterReviews);
    }

});

// ========================================
// LOAD REVIEWS
// ========================================

async function loadReviews() {

    const table = document.getElementById("reviewsTable");

    table.innerHTML = `
        <tr>
            <td colspan="5">Loading reviews...</td>
        </tr>
    `;

    const { data, error } = await supabaseClient
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    Unable to load reviews.
                </td>
            </tr>
        `;

        return;

    }

    allReviews = data || [];

    renderReviews(allReviews);

}

// ========================================
// RENDER REVIEWS
// ========================================

function renderReviews(reviews) {

    const table = document.getElementById("reviewsTable");

    if (!reviews.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No reviews found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    reviews.forEach(review => {

        const status = review.approved
            ? "Approved"
            : "Pending";

        const badge = review.approved
            ? "status-completed"
            : "status-pending";

        table.innerHTML += `

            <tr>

                <td>${review.customer_name || "-"}</td>

                <td>${"⭐".repeat(review.rating || 0)}</td>

                <td>${review.customer_name || "-"}</td>

                <td>

                    <span class="status-badge ${badge}">
                        ${status}
                    </span>

                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="toggleReview('${review.id}', ${review.approved})">

                        ${review.approved ? "Hide" : "Approve"}

                    </button>

                    <button
                        class="view-btn"
                        style="background:#dc2626;margin-left:8px;"
                        onclick="deleteReview('${review.id}')">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

// ========================================
// SEARCH
// ========================================

function filterReviews() {

    const search = document
        .getElementById("searchReviews")
        .value
        .toLowerCase();

    const filtered = allReviews.filter(review =>

        (review.customer_name || "")
            .toLowerCase()
            .includes(search)

        ||

        (review.customer_name || "")
            .toLowerCase()
            .includes(search)

    );

    renderReviews(filtered);

}

// ========================================
// APPROVE / HIDE
// ========================================

async function toggleReview(id, approved) {

    const { error } = await supabaseClient

        .from("reviews")

        .update({
            approved: !approved
        })

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to update review.");

        return;

    }

    loadReviews();

}

// ========================================
// DELETE REVIEW
// ========================================

async function deleteReview(id) {

    if (!confirm("Delete this review?")) {
        return;
    }

    const { error } = await supabaseClient

        .from("reviews")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete review.");

        return;

    }

    loadReviews();

}