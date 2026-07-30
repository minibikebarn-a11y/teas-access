// ========================================
// ORDERS MANAGEMENT
// ========================================

let allOrders = [];

document.addEventListener("DOMContentLoaded", () => {
    loadOrders();

    const searchInput = document.getElementById("searchOrders");
    const statusFilter = document.getElementById("statusFilter");

    if (searchInput) {
        searchInput.addEventListener("input", filterOrders);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", filterOrders);
    }
});

// ========================================
// LOAD ORDERS
// ========================================

async function loadOrders() {

    const table = document.getElementById("ordersTable");

    table.innerHTML = `
        <tr>
            <td colspan="7">Loading orders...</td>
        </tr>
    `;

    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    Unable to load orders.
                </td>
            </tr>
        `;

        return;
    }

    allOrders = data || [];

    renderOrders(allOrders);
}

// ========================================
// RENDER TABLE
// ========================================

function renderOrders(orders) {

    const table = document.getElementById("ordersTable");

    if (!orders.length) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No orders found.
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML = "";

    orders.forEach(order => {

        let badge = "status-pending";

        if (order.status === "Completed") {
            badge = "status-completed";
        }

        if (order.status === "Cancelled") {
            badge = "status-cancelled";
        }

        table.innerHTML += `
            <tr>

                <td>${order.order_number || "-"}</td>

                <td>
                    ${order.first_name || ""}
                    ${order.last_name || ""}
                </td>

                <td>${order.email || "-"}</td>

                <td>${order.payment_method || "-"}</td>

                <td>$${Number(order.total || 0).toFixed(2)}</td>

                <td>
                    <span class="status-badge ${badge}">
                        ${order.status || "Pending"}
                    </span>
                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="viewOrder('${order.id}')">

                        View

                    </button>

                </td>

            </tr>
        `;

    });

}

// ========================================
// SEARCH & FILTER
// ========================================

function filterOrders() {

    const search =
        document
        .getElementById("searchOrders")
        .value
        .toLowerCase();

    const status =
        document
        .getElementById("statusFilter")
        .value;

    const filtered = allOrders.filter(order => {

        const customer =
            `${order.first_name || ""} ${order.last_name || ""}`
            .toLowerCase();

        const orderNumber =
            (order.order_number || "").toLowerCase();

        const searchMatch =
            customer.includes(search) ||
            orderNumber.includes(search);

        const statusMatch =
            status === "All" ||
            order.status === status;

        return searchMatch && statusMatch;

    });

    renderOrders(filtered);

}

// ========================================
// VIEW ORDER
// ========================================

function viewOrder(id) {

    window.location.href =
        `order-details.html?id=${id}`;

}

// ========================================
// DELETE ORDER
// ========================================

async function deleteOrder(id) {

    if (!confirm("Delete this order?")) {
        return;
    }

    const { error } = await supabaseClient
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete order.");

        return;

    }

    loadOrders();

}

// ========================================
// UPDATE STATUS
// ========================================

async function updateStatus(id, status) {

    const { error } = await supabaseClient
        .from("orders")
        .update({
            status: status
        })
        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to update status.");

        return;

    }

    loadOrders();

}