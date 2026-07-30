// ========================================
// MESSAGE DETAILS
// ========================================

const params = new URLSearchParams(window.location.search);

const messageId = params.get("id");

// ========================================
// LOAD MESSAGE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    if (!messageId) {

        alert("No message selected.");

        window.location.href = "messages.html";

        return;

    }

    loadMessage();

});

// ========================================
// LOAD
// ========================================

async function loadMessage() {

    const { data, error } = await supabaseClient

        .from("messages")

        .select("*")

        .eq("id", messageId)

        .single();

    if (error) {

        console.error(error);

        alert("Unable to load message.");

        window.location.href = "messages.html";

        return;

    }

    document.getElementById("full_name").value =
        data.full_name || "";

    document.getElementById("email").value =
        data.email || "";

    document.getElementById("order_number").value =
        data.order_number || "";

    document.getElementById("subject").value =
        data.subject || "";

    document.getElementById("message").value =
        data.message || "";

    document.getElementById("status").value =
        data.status || "New";

}

// ========================================
// SAVE STATUS
// ========================================

async function saveStatus() {

    const status =
        document.getElementById("status").value;

    const { error } = await supabaseClient

        .from("messages")

        .update({

            status: status

        })

        .eq("id", messageId);

    if (error) {

        console.error(error);

        alert("Unable to update message.");

        return;

    }

    alert("Message updated successfully!");

    loadMessage();

}