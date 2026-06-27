// feedback.js
document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedbackForm');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');

  // Safety check: Ensure elements exist
  if (!feedbackForm) {
    console.error('Error: Feedback form not found.');
    return;
  }
  if (!successModal || !closeModalBtn) {
    console.error('Error: Success modal elements not found.');
    return;
  }

  // Function to load cars into the carModel dropdown
  async function loadCars() {
    try {
      const response = await fetch('http://localhost:5000/api/cars?limit=0'); // Fetch all cars
      if (!response.ok) throw new Error(`Failed to fetch cars: ${response.status} ${response.statusText}`);
      const cars = await response.json();
      const select = document.getElementById('carModel');
      select.innerHTML = '<option value="" disabled selected>Select Car Model</option>'; // Reset options
      cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.name; // Use car name as value (matches backend expectation)
        option.textContent = car.name; // Display car name
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading cars:', error);
      alert('Failed to load car models. Please refresh the page.');
    }
  }

  // Load cars on page load
  loadCars();

  // Handle modal close and redirect
  closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
    window.location.href = './index.html'; // Redirect to home
  });

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      bookingId: document.getElementById('bookingId').value.trim(),
      carModel: document.getElementById('carModel').value, // Now from select
      overallExp: document.getElementById('overallExp').value,
      carCondition: document.getElementById('carCondition').value,
      easeBooking: document.getElementById('easeBooking').value,
      pickupDrop: document.getElementById('pickupDrop').value,
      customerSupport: document.getElementById('customerSupport').value,
      valueMoney: document.getElementById('valueMoney').value,
      issuesCar: document.getElementById('issuesCar').value,
      improve: document.getElementById('improve').value.trim(),
      recommend: document.getElementById('recommend').value
    };

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.bookingId || !formData.carModel) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Show success modal
        successModal.style.display = 'flex';
        // Optionally reset the form
        feedbackForm.reset();
      } else {
        const error = await response.json();
        alert(`Submission failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred. Please try again.');
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