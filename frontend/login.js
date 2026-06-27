document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message-container');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Safety check: Ensure elements exist
    if (!loginForm) {
        console.error('Error: Login form not found. Check if login.html has <form id="login-form">.');
        return;
    }
    if (!messageContainer) {
        console.error('Error: Message container not found. Check if login.html has <div id="message-container">.');
        return;
    }
    if (!successModal || !closeModalBtn) {
        console.error('Error: Success modal elements not found.');
        return;
    }

    // Handle modal close and redirect
    closeModalBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        window.location.href = 'index.html';  // Redirect to home
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();  // Prevent default form submission
        console.log('Login form submitted');  // Debug: Confirm event fires

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        console.log('Email:', email, 'Password:', password);  // Debug: Check values

        // Clear previous messages
        messageContainer.innerHTML = '';

        // Basic client-side validation
        if (!email || !password) {
            messageContainer.innerHTML = '<div class="message error-message">Email and password are required.</div>';
            return;
        }

        try {
            console.log('Sending fetch to /api/auth/login');  // Debug: Before fetch
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);  // Debug: Check status

            const data = await response.json();
            console.log('Response data:', data);  // Debug: Check JSON

            if (response.ok) {
                // Save token (if present)
                if (data.token) {
                    localStorage.setItem("token", data.token);

                }
                // NEW: Store user ID in localStorage for booking functionality
                if (data.user && data.user.id) {
                    localStorage.setItem('userId', data.user.id);
                }

                if (data.user && data.user.name) {
                    localStorage.setItem("name", data.user.name);
                }

                if (data.user && data.user.name) {
                    localStorage.setItem("username", data.user.name); // <-- for navbar
                }

                if (data.user && data.user.isAdmin !== undefined) {
                    localStorage.setItem("isAdmin", data.user.isAdmin);
                }

                // Show success modal
                successModal.style.display = 'flex';

                setTimeout(() => {
                    successModal.style.display = 'none';
                    window.location.href = "./index.html";
                }, 1500);
            } else {
                // Error: Display message
                messageContainer.innerHTML = `<div class="message error-message">${data.message || 'Login failed.'}</div>`;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            messageContainer.innerHTML = '<div class="message error-message">Network error. Please check your connection and try again.</div>';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");

    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");

    if (username) {
        // Replace Login/Signup → Hi, username
        userBtn.textContent = `Hi, ${username}`;
        userBtn.href = "./user-dashboard.html";

        // Replace Admin Panel → Logout
        adminBtn.textContent = "Logout";
        adminBtn.href = "#";
        adminBtn.removeAttribute("target");

        // Logout feature
        adminBtn.addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("userId"); 
            window.location.reload();
        });
    }
});
