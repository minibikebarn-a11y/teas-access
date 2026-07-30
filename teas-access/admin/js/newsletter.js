// ========================================
// NEWSLETTER MANAGEMENT
// ========================================

let allSubscribers = [];

document.addEventListener("DOMContentLoaded", () => {

    loadSubscribers();

    const search =
        document.getElementById("searchSubscriber");

    if (search) {
        search.addEventListener("input", filterSubscribers);
    }

});

// ========================================
// LOAD SUBSCRIBERS
// ========================================

async function loadSubscribers() {

    const table =
        document.getElementById("newsletterTable");

    table.innerHTML = `
        <tr>
            <td colspan="4">
                Loading subscribers...
            </td>
        </tr>
    `;

    const { data, error } = await supabaseClient

        .from("newsletter")

        .select("*")

        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    Unable to load subscribers.
                </td>
            </tr>
        `;

        return;

    }

    allSubscribers = data || [];

    renderSubscribers(allSubscribers);

}

// ========================================
// RENDER TABLE
// ========================================

function renderSubscribers(subscribers) {

    const table =
        document.getElementById("newsletterTable");

    if (!subscribers.length) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    No subscribers found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    subscribers.forEach(subscriber => {

        const badge =
            subscriber.status === "Unsubscribed"
            ? "status-cancelled"
            : "status-completed";

        const date =
            new Date(subscriber.created_at)
            .toLocaleDateString();

        table.innerHTML += `

            <tr>

                <td>

                    ${subscriber.email}

                </td>

                <td>

                    <span class="status-badge ${badge}">

                        ${subscriber.status}

                    </span>

                </td>

                <td>

                    ${date}

                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="toggleStatus('${subscriber.id}','${subscriber.status}')">

                        ${subscriber.status === "Subscribed"
                            ? "Unsubscribe"
                            : "Subscribe"}

                    </button>

                    <button
                        class="view-btn"
                        style="background:#dc2626;margin-left:8px;"
                        onclick="deleteSubscriber('${subscriber.id}')">

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

function filterSubscribers() {

    const search =
        document
        .getElementById("searchSubscriber")
        .value
        .toLowerCase();

    const filtered =
        allSubscribers.filter(subscriber =>

            (subscriber.email || "")
            .toLowerCase()
            .includes(search)

        );

    renderSubscribers(filtered);

}

// ========================================
// CHANGE STATUS
// ========================================

async function toggleStatus(id, currentStatus) {

    const newStatus =
        currentStatus === "Subscribed"
        ? "Unsubscribed"
        : "Subscribed";

    const { error } = await supabaseClient

        .from("newsletter")

        .update({

            status: newStatus

        })

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to update subscriber.");

        return;

    }

    loadSubscribers();

}

// ========================================
// DELETE
// ========================================

async function deleteSubscriber(id) {

    const confirmed =
        confirm("Delete this subscriber?");

    if (!confirmed) return;

    const { error } = await supabaseClient

        .from("newsletter")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete subscriber.");

        return;

    }

    loadSubscribers();

}

// ========================================
// EXPORT CSV
// ========================================

function exportCSV() {

    if (!allSubscribers.length) {

        alert("No subscribers found.");

        return;

    }

    let csv =
        "Email,Status,Subscribed Date\n";

    allSubscribers.forEach(subscriber => {

        csv += `"${subscriber.email}","${subscriber.status}","${new Date(subscriber.created_at).toLocaleDateString()}"\n`;

    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "newsletter-subscribers.csv";

    a.click();

    URL.revokeObjectURL(url);

}