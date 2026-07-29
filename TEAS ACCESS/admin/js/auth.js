// ========================================
// AUTH PROTECTION
// ========================================

async function checkAuth() {

    const {
        data: { session },
        error
    } = await window.supabaseClient.auth.getSession();

    if (error) {

        console.error(error);
        window.location.href = "login.html";
        return;

    }

    if (!session) {

        window.location.href = "login.html";
        return;

    }

}

// Check authentication when page loads
checkAuth();


// ========================================
// LOGOUT
// ========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        const { error } = await window.supabaseClient.auth.signOut();

        if (error) {

            console.error(error);
            return;

        }

        window.location.href = "login.html";

    });

}


// ========================================
// SESSION LISTENER
// ========================================

window.supabaseClient.auth.onAuthStateChange((event, session) => {

    if (event === "SIGNED_OUT") {

        window.location.href = "login.html";

    }

});