// ========================================
// ADD / EDIT FAQ
// ========================================

const params = new URLSearchParams(window.location.search);

const faqId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {

    if (faqId) {

        loadFAQ();

    }

    document

        .getElementById("faqForm")

        .addEventListener("submit", saveFAQ);

});

// ========================================
// LOAD FAQ
// ========================================

async function loadFAQ() {

    const { data, error } = await supabaseClient

        .from("faqs")

        .select("*")

        .eq("id", faqId)

        .single();

    if (error) {

        console.error(error);

        alert("Unable to load FAQ.");

        return;

    }

    document.getElementById("question").value =
        data.question;

    document.getElementById("answer").value =
        data.answer;

}

// ========================================
// SAVE FAQ
// ========================================

async function saveFAQ(e) {

    e.preventDefault();

    const button =
        document.querySelector(".login-btn");

    button.disabled = true;

    button.textContent = "Saving...";

    const faq = {

        question:
            document.getElementById("question").value,

        answer:
            document.getElementById("answer").value

    };

    let error;

    if (faqId) {

        ({ error } = await supabaseClient

            .from("faqs")

            .update(faq)

            .eq("id", faqId));

    } else {

        ({ error } = await supabaseClient

            .from("faqs")

            .insert(faq));

    }

    if (error) {

        console.error(error);

        alert(error.message);

        button.disabled = false;

        button.textContent = "Save FAQ";

        return;

    }

    alert("FAQ saved successfully!");

    window.location.href = "faq.html";

}