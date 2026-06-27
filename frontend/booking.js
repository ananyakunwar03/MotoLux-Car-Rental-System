document.addEventListener("DOMContentLoaded", async () => {

    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Please login first to book a car.");
        window.location.href = "./login.html";
        return;
    }

    const username = localStorage.getItem("username");
    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCarId = urlParams.get("id");
    const selectedCarName = urlParams.get("name");

    // 🔹 Navbar login UI + dashboard redirection
    if (username) {
        userBtn.textContent = `Hi, ${username}`;
        userBtn.href = "./user-dashboard.html";

        adminBtn.textContent = "Logout";
        adminBtn.href = "#";
        adminBtn.removeAttribute("target");
        adminBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "./login.html";
        });
    }

    // 📌 Load Cars & Auto-select clicked car
    async function loadCars() {
        try {
            const response = await fetch("http://localhost:5000/api/cars?limit=0");
            const cars = await response.json();

            const select = document.getElementById("car-select");
            select.innerHTML = `<option value="">Choose Car</option>`;

            cars.forEach(car => {
                const selected = car._id === selectedCarId ? "selected" : "";
                select.innerHTML += `<option value="${car._id}" ${selected}>${car.name}</option>`;
            });

        } catch {
            alert("Unable to load cars. Try again.");
        }
    }

    await loadCars();  // 🔥 Very important (you missed this earlier)

    // ================= BOOKING SUBMIT =================
    document.querySelector(".booking-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const pickup = new Date(form.get("pickupDate"));
        const drop = new Date(form.get("returnDate"));
        let today = new Date();

        today.setHours(0,0,0,0);

        if (pickup < today) return alert("Pickup date cannot be in the past.");
        if (drop < pickup) return alert("Return date cannot be before pickup.");
        if ((drop - pickup)/(1000*60*60*24) > 15) return alert("Booking cannot exceed 15 days.");

        const data = {
            userId,
            carId: form.get("car-select"),
            pickupLocation: form.get("pickupLocation"),
            dropLocation: form.get("dropLocation"),
            pickupDate: form.get("pickupDate"),
            pickupTime: form.get("pickupTime"),
            returnDate: form.get("returnDate"),
            returnTime: form.get("returnTime")
        };

        const res = await fetch("http://localhost:5000/api/bookings", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(data)
        });

        if(res.ok){
            document.getElementById("success-modal").style.display = "flex";
        } else alert("Booking Failed");
    });

    document.getElementById("close-modal")?.addEventListener("click",()=> window.location.href="./index.html");
});
