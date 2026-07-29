// ========================================
// FAQ MANAGEMENT
// ========================================

let allFAQs = [];

document.addEventListener("DOMContentLoaded", () => {

    loadFAQs();

    const search = document.getElementById("searchFAQ");

    if (search) {
        search.addEventListener("input", filterFAQs);
    }

});

// ========================================
// LOAD FAQS
// ========================================

async function loadFAQs() {

    const table = document.getElementById("faqTable");

    table.innerHTML = `
        <tr>
            <td colspan="3">
                Loading FAQs...
            </td>
        </tr>
    `;

    const { data, error } = await supabaseClient

        .from("faqs")

        .select("*")

        .order("question", {
            ascending: true
        });

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="3">
                    Unable to load FAQs.
                </td>
            </tr>
        `;

        return;

    }

    allFAQs = data || [];

    renderFAQs(allFAQs);

}

// ========================================
// RENDER FAQS
// ========================================

function renderFAQs(faqs) {

    const table =
        document.getElementById("faqTable");

    if (!faqs.length) {

        table.innerHTML = `
            <tr>
                <td colspan="3">
                    No FAQs found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    faqs.forEach(faq => {

        table.innerHTML += `

            <tr>

                <td>

                    ${faq.question || "-"}

                </td>

                <td>

                    ${faq.answer || "-"}

                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="editFAQ('${faq.id}')">

                        Edit

                    </button>

                    <button
                        class="view-btn"
                        style="background:#dc2626;margin-left:8px;"
                        onclick="deleteFAQ('${faq.id}')">

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

function filterFAQs() {

    const search = document

        .getElementById("searchFAQ")

        .value

        .toLowerCase();

    const filtered = allFAQs.filter(faq => {

        return (

            (faq.question || "")

                .toLowerCase()

                .includes(search)

            ||

            (faq.answer || "")

                .toLowerCase()

                .includes(search)

        );

    });

    renderFAQs(filtered);

}

// ========================================
// EDIT FAQ
// ========================================

function editFAQ(id) {

    window.location.href =
        `edit-faq.html?id=${id}`;

}

// ========================================
// DELETE FAQ
// ========================================

async function deleteFAQ(id) {

    const confirmed = confirm(
        "Delete this FAQ?"
    );

    if (!confirmed) return;

    const { error } = await supabaseClient

        .from("faqs")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete FAQ.");

        return;

    }

    loadFAQs();

}