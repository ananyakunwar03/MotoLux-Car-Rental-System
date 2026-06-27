document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent form from reloading the page

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      phone: formData.get("phone").trim(),
      message: formData.get("message").trim(),
    };

    // Basic client-side validation (mirrors backend)
    if (!data.name || !data.email || !data.message) {
      alert("Name, email, and message are required.");  // Simple alert for errors (or keep inline if preferred)
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      alert("Please enter a valid email.");  // Simple alert for errors
      return;
    }

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success modal instead of inline alert
        successModal.style.display = "flex";
        contactForm.reset();  // Clear the form on success
      } else {
        alert(result.message || "An error occurred. Please try again.");  // Keep simple alert for errors
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error. Please check your connection and try again.");  // Keep simple alert for errors
    }
  });

  // Close modal when "OK" button is clicked
  closeModalBtn.addEventListener("click", () => {
    successModal.style.display = "none";
  });

  // Optional: Close modal when clicking outside the content
  successModal.addEventListener("click", (event) => {
    if (event.target === successModal) {
      successModal.style.display = "none";
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
