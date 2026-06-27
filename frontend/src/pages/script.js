document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('car-container');

  // Detect the page (2, 5, or 7 seater)
  const currentPage = window.location.pathname;
  let seaterType = "two-seater";

  if (currentPage.includes("five-seaterPage")) {
    seaterType = "five-seater";
  } else if (currentPage.includes("seven-seaterPage")) {
    seaterType = "seven-seater";
  }

  console.log("Fetching:", seaterType);

  try {
    const response = await fetch(`http://localhost:5000/api/cars?type=${seaterType}&limit=0`);
    if (!response.ok) throw new Error('Failed to fetch cars');
    const cars = await response.json();

    container.innerHTML = "";

    if (cars.length === 0) {
      container.innerHTML = '<p class="no-cars">No cars available right now.</p>';
      return;
    }

    cars.forEach(car => {
      const html = `
        <div class="rento-card">
          <img src="${car.image}" alt="${car.name}">
          <h3 class="car-title">${car.name}</h3>
          <p class="car-brand">${car.brand}</p>

          <div class="car-icons">
            <span>🚘 ${car.category}</span>
            <span>⚙ ${car.transmission}</span>
            <span>👥 ${car.seater}-Seater</span>
          </div>

          <div class="car-bottom">
            <p class="car-price">₹ ${car.pricePerDay.toLocaleString()} <span>/day</span></p>
            <a href="../../booking.html?id=${car._id}&name=${encodeURIComponent(car.name)}" class="car-btn">Book Now</a>
          </div>
        </div>
      `;
      container.innerHTML += html;
    });

  } catch (error) {
    console.error('Error loading cars:', error);
    container.innerHTML = '<p>Failed to load cars.</p>';
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");

    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");

    if (username) {
        // Replace Login/Signup → Hi, username
        userBtn.textContent = `Hi, ${username}`;
        userBtn.href = "../../user-dashboard.html";

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