const API_BASE = "http://localhost:5000/api";

// Define specific car IDs for each category (replace with your actual IDs from DB)
const featuredCars = {
  "two-seater":
    "692379f65be9206f7f79c373,692379f65be9206f7f79c375,692379f65be9206f7f79c377",
  "five-seater":
    "692379f65be9206f7f79c37d,692379f65be9206f7f79c37c,692379f65be9206f7f79c37f",
  "seven-seater":
    "692379f65be9206f7f79c38a,692379f65be9206f7f79c388,692379f65be9206f7f79c38d",
};

async function loadCars(type, containerId) {
  try {
    const ids = featuredCars[type]; // Get the specific IDs for this type
    const response = await fetch(`${API_BASE}/cars?ids=${ids}`);
    if (!response.ok) throw new Error("Failed to load cars");

    const cars = await response.json();
    const container = document.getElementById(containerId);

    if (cars.length === 0) {
      container.innerHTML = "<p>No cars available.</p>";
      return;
    }

    container.innerHTML = cars
      .map(
        (car) => `
      <div class="car-card">
        <img src="${car.image}" alt="${car.name}">
        <h3>${car.name}</h3>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error(err);
    document.getElementById(containerId).innerHTML =
      "<p>Failed to load cars.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCars("two-seater", "two-seater-container");
  loadCars("five-seater", "five-seater-container");
  loadCars("seven-seater", "seven-seater-container");
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
