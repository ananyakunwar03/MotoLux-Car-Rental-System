document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  const errorMessage = document.getElementById("error-message");
  const successModal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous messages
    errorMessage.style.display = "none";
    successModal.style.display = "none";

    const name = document.querySelector("#signup-name").value.trim();
    const email = document.querySelector("#signup-email").value.trim();
    const phone = document.querySelector("#signup-phone").value.trim();
    const password = document.querySelector("#signup-password").value.trim();

    // Basic client-side validation
    if (!name || !email || !phone || !password) {
      showError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters long.");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
      showError("Password must contain both letters and numbers.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      showError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      showError("Name must contain only alphabets");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess();
      } else {
        showError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showError("Network error. Please check your connection and try again.");
    }
  });

  // Function to show error message
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  // Function to show success modal
  function showSuccess() {
    successModal.style.display = "flex";
  }

  // Close modal and redirect
  closeModalBtn.addEventListener("click", () => {
    window.location.href = "login.html";
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
