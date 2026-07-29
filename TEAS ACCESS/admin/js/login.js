// ========================================
// PASSWORD TOGGLE
// ========================================

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "👁";

        }

    });

}

// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginError.textContent = "";
    loginBtn.disabled = true;
    loginBtn.textContent = "Signing In...";

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    try {

        const { data, error } =await window.supabaseClient.auth.signInWithPassword({

            email,
            password

        });

        if (error) {

            loginError.textContent = error.message;
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
            return;

        }

        if (data.session) {

            window.location.href = "dashboard.html";

        }

    } catch (err) {

        console.error(err);

        loginError.textContent =
            "Something went wrong. Please try again.";

        loginBtn.disabled = false;
        loginBtn.textContent = "Login";

    }

});
}