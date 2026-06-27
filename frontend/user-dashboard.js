document.addEventListener("DOMContentLoaded", async () => {

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    // 🔹 Navbar update
    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");

    if(username){
        userBtn.textContent = `Hi, ${username}`;
        userBtn.href = "./user-dashboard.html"; // Click → dashboard
        adminBtn.textContent = "Logout";
        adminBtn.href = "#";
        adminBtn.onclick = () => { localStorage.clear(); location.reload(); };
    }

    // 🔹 If user not logged in → block access
    if(!userId){
        alert("Please login first");
        location.href = "./login.html";
        return;
    }

    // 🔹 Fetch User + Booking details
    try{
        const res = await fetch(`http://localhost:5000/api/user/dashboard/${userId}`);
        const data = await res.json();

        // User Info
        document.getElementById("name").textContent  = data.user?.name ?? "N/A";
        document.getElementById("email").textContent = data.user?.email ?? "N/A";
        document.getElementById("phone").textContent = data.user?.phone ?? "N/A";

        // Booking table
        const rows = data.bookings?.length ? 
            data.bookings.map(b => `
                <tr>
                    <td>${b.car?.name ?? "N/A"}</td>
                    <td>${b.pickupDate.slice(0,10)}</td>
                    <td>${b.returnDate.slice(0,10)}</td>
                    <td>${b.status.toUpperCase()}</td>
                </tr>`).join("")
            : `<tr><td colspan="4">No bookings yet</td></tr>`;

        document.getElementById("booking-list").innerHTML = rows;
    }
    catch(err){
        console.log(err);
        alert("Error loading dashboard");
    }
});
