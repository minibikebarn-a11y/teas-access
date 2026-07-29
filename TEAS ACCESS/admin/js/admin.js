// ==========================================
// ADMIN DASHBOARD
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
    await loadDashboard();
});

// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        // Get all orders
        const { data: orders, error } = await supabaseClient
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        updateStatistics(orders);
        populateRecentOrders(orders);

    } catch (err) {
        console.error(err);
    }

}

// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics(orders) {

    const today = new Date().toDateString();

    const todayOrders = orders.filter(order =>
        new Date(order.created_at).toDateString() === today
    );

    const pending = orders.filter(order =>
        order.status === "Pending Payment"
    );

    const completed = orders.filter(order =>
        order.status === "Completed"
    );

    const revenue = completed.reduce((sum, order) => {
        return sum + Number(order.total || 0);
    }, 0);

    document.getElementById("todayOrders").textContent =
        todayOrders.length;

    document.getElementById("pendingOrders").textContent =
        pending.length;

    document.getElementById("completedOrders").textContent =
        completed.length;

    document.getElementById("revenue").textContent =
        "$" + revenue.toFixed(2);

}

// ==========================================
// RECENT ORDERS
// ==========================================

function populateRecentOrders(orders) {

    const tbody = document.getElementById("recentOrders");

    tbody.innerHTML = "";

    if (orders.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">No orders found.</td>
            </tr>
        `;

        return;
    }

orders.slice(0, 5).forEach(order => {

    let statusClass = "";

    switch (order.status) {
        case "Pending Payment":
            statusClass = "status-pending";
            break;

        case "Completed":
            statusClass = "status-completed";
            break;

        case "Cancelled":
            statusClass = "status-cancelled";
            break;

        default:
            statusClass = "status-pending";
    }

    tbody.innerHTML += `
        <tr>
            <td>${order.order_number}</td>
            <td>${order.first_name} ${order.last_name}</td>
            <td>
                <span class="status-badge ${statusClass}">
                    ${order.status}
                </span>
            </td>
            <td>$${Number(order.total).toFixed(2)}</td>
        </tr>
    `;

});
async function loadOrders() {

    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    renderOrders(data);

}
function renderOrders(orders){

    const table=document.getElementById("ordersTable");

    table.innerHTML="";

    orders.forEach(order=>{

        let statusClass="status-pending";

        if(order.status==="Completed")
            statusClass="status-completed";

        if(order.status==="Cancelled")
            statusClass="status-cancelled";

        table.innerHTML+=`

<tr>

<td>${order.order_number}</td>

<td>${order.first_name} ${order.last_name}</td>

<td>${order.email}</td>

<td>${order.payment_method}</td>

<td>$${Number(order.total).toFixed(2)}</td>

<td>

<span class="status-badge ${statusClass}">

${order.status}

</span>

</td>

<td>

<a
class="view-btn"
href="order-details.html?id=${order.id}">

View

</a>

</td>

</tr>

`;

    });

}
}