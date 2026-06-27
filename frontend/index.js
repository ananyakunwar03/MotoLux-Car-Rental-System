document.addEventListener("DOMContentLoaded", () => {
    const userBtn = document.getElementById("userBtn");  // Login/Signup → Hi Username
    const adminBtn = document.getElementById("adminBtn"); // Admin Panel → Logout
    const navLinks = document.querySelector(".nav-links"); // For adding Dashboard link

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (token && username) {

        // Change Login/Signup → Hi Username
        userBtn.textContent = `Hi, ${username}`;
        userBtn.href = "./user-dashboard.html";

        // Change Admin button → Logout
        adminBtn.textContent = "Logout";
        adminBtn.href = "#";
        adminBtn.removeAttribute("target");

        adminBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.reload();
        });
    }
});
