// ========================================
// MESSAGE MANAGEMENT
// ========================================

let allMessages = [];

document.addEventListener("DOMContentLoaded", () => {

    loadMessages();

    const search = document.getElementById("searchMessages");

    if (search) {
        search.addEventListener("input", filterMessages);
    }

});

// ========================================
// LOAD MESSAGES
// ========================================

async function loadMessages() {

    const table = document.getElementById("messagesTable");

    table.innerHTML = `
        <tr>
            <td colspan="5">
                Loading messages...
            </td>
        </tr>
    `;

    const { data, error } = await supabaseClient

        .from("messages")

        .select("*")

        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    Unable to load messages.
                </td>
            </tr>
        `;

        return;

    }

    allMessages = data || [];

    renderMessages(allMessages);

}

// ========================================
// RENDER
// ========================================

function renderMessages(messages) {

    const table =
        document.getElementById("messagesTable");

    if (!messages.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No messages found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    messages.forEach(msg => {

        const date = new Date(msg.created_at)
            .toLocaleDateString();

        table.innerHTML += `

            <tr>

                <td>${msg.full_name}</td>

                <td>${msg.email}</td>

                <td>${msg.subject}</td>

                <td>${date}</td>

                <td>

                    <button
                        class="view-btn"
                        onclick="viewMessage('${msg.id}')">

                        View

                    </button>

                    <button
                        class="view-btn"
                        style="background:#dc2626;margin-left:8px;"
                        onclick="deleteMessage('${msg.id}')">

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

function filterMessages() {

    const search =
        document
        .getElementById("searchMessages")
        .value
        .toLowerCase();

    const filtered =
        allMessages.filter(msg =>

            (msg.full_name || "")
            .toLowerCase()
            .includes(search)

            ||

            (msg.email || "")
            .toLowerCase()
            .includes(search)

            ||

            (msg.subject || "")
            .toLowerCase()
            .includes(search)

            ||

            (msg.message || "")
            .toLowerCase()
            .includes(search)

        );

    renderMessages(filtered);

}

// ========================================
// VIEW
// ========================================

function viewMessage(id) {

    window.location.href =
        `message-details.html?id=${id}`;

}

// ========================================
// DELETE
// ========================================

async function deleteMessage(id) {

    const confirmed =
        confirm("Delete this message?");

    if (!confirmed) return;

    const { error } = await supabaseClient

        .from("messages")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete message.");

        return;

    }

    loadMessages();

}