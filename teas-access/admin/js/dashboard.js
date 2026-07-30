// ========================================
// ADMIN DASHBOARD
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
    setupLogout();
});

// ========================================
// LOAD DASHBOARD
// ========================================

async function loadDashboard() {
    await Promise.all([
        loadStatistics(),
        loadRecentOrders()
    ]);
}

// ========================================
// LOAD STATISTICS
// ========================================

async function loadStatistics() {

    const { data: orders, error } = await supabaseClient
        .from("orders")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const today = new Date().toISOString().split("T")[0];

    let todayOrders = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    let revenue = 0;

    orders.forEach(order => {

        if (order.created_at) {

            const orderDate =
                order.created_at.split("T")[0];

            if (orderDate === today) {
                todayOrders++;
            }
        }

        if (order.status === "Pending Payment") {
            pendingOrders++;
        }

        if (order.status === "Completed") {
            completedOrders++;
        }

        revenue += Number(order.total || 0);

    });

    document.getElementById("todayOrders").textContent =
        todayOrders;

    document.getElementById("pendingOrders").textContent =
        pendingOrders;

    document.getElementById("completedOrders").textContent =
        completedOrders;

    document.getElementById("revenue").textContent =
        `$${revenue.toFixed(2)}`;

}

// ========================================
// RECENT ORDERS
// ========================================

async function loadRecentOrders() {

    const tbody =
        document.getElementById("recentOrders");

    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

    if (error) {
        console.error(error);

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    Unable to load orders.
                </td>
            </tr>
        `;

        return;
    }

    if (!data.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    No orders found.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = "";

    data.forEach(order => {

        let badge = "status-pending";

        if (order.status === "Completed") {
            badge = "status-completed";
        }

        if (order.status === "Cancelled") {
            badge = "status-cancelled";
        }

        tbody.innerHTML += `
            <tr>

                <td>${order.order_number}</td>

                <td>
                    ${order.first_name}
                    ${order.last_name}
                </td>

                <td>
                    <span class="status-badge ${badge}">
                        ${order.status}
                    </span>
                </td>

                <td>
                    $${Number(order.total).toFixed(2)}
                </td>

            </tr>
        `;

    });

}

// ========================================
// LOGOUT
// ========================================

function setupLogout() {

    const logout =
        document.getElementById("logoutBtn");

    if (!logout) return;

    logout.addEventListener("click", e => {

        e.preventDefault();

        sessionStorage.removeItem("adminLoggedIn");

        window.location.href = "login.html";

    });

}