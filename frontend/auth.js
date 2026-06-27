// auth.js - Handles UI changes for logged in/out user

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const isAdmin = localStorage.getItem("isAdmin"); 
    const navButtons = document.querySelector(".nav-buttons");

    if (!navButtons) return;

    // USER LOGGED IN
    if (token && userId) {

        // NORMAL USER UI
        if (isAdmin !== "true") {
            navButtons.innerHTML = `
                <span class="welcome-user">👤 Hi, ${name}</span>
                <button class="btn btn-login" id="logout-btn">Logout</button>
            `;
        } 
        
        // ADMIN USER UI
        else {
            navButtons.innerHTML = `
                <span class="welcome-user">👤 Hi, ${name}</span>
                <a href="/frontend/admin/login.html" class="btn btn-secondary" target="_blank">Admin Panel</a>
                <button class="btn btn-login" id="logout-btn">Logout</button>
            `;
        }

        // LOGOUT HANDLER
        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.clear();
            alert("You have been logged out successfully.");
            window.location.href = "./index.html";
        });

    } else {
        // DEFAULT UI (not logged in)
        navButtons.innerHTML = `
            <a href="./login.html" class="btn btn-login">Login/Signup</a>
            <a href="/frontend/admin/login.html" class="btn btn-secondary" target="_blank">Admin Panel</a>
        `;
    }
});
