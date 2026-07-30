// ========================================
// HOME FAQ
// ========================================

document.addEventListener("DOMContentLoaded", loadFAQs);

async function loadFAQs() {

    const faqList = document.getElementById("faqList");

    if (!faqList) return;

    const { data, error } = await supabaseClient

        .from("faqs")

        .select("*")

        .order("question");

    if (error) {

        console.error(error);

        return;

    }

    if (!data.length) {

        faqList.innerHTML = `
            <p style="text-align:center;">
                No FAQs available.
            </p>
        `;

        return;

    }

    faqList.innerHTML = "";

    data.forEach((faq, index) => {

        faqList.innerHTML += `

        <div class="faq-item reveal delay-${(index % 6) + 1}">

            <button class="faq-question">

                <span>${faq.question}</span>

                <i data-lucide="plus"></i>

            </button>

            <div class="faq-answer">

                <p>${faq.answer}</p>

            </div>

        </div>

        `;

    });

    // Refresh Lucide icons
    if (window.lucide) {

        lucide.createIcons();

    }

    // FAQ accordion
    initializeFAQ();

}

// ========================================
// FAQ ACCORDION
// ========================================

function initializeFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}