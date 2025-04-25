// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDZTf5S-JFkyLk7rj72SNIyexPxHZnAEJU",
  authDomain: "thqrides--bimi-branding.firebaseapp.com",
  projectId: "thqrides--bimi-branding",
  storageBucket: "thqrides--bimi-branding.firebasestorage.app",
  messagingSenderId: "854332369699",
  appId: "1:854332369699:web:d0110240fe5fa3e4e57a96",
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const bookingsList = document.getElementById("bookingsList");
  const qrDisplay = document.getElementById("qrDisplay");
  const viewBookingsBtn = document.getElementById("viewBookingsBtn");

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pickup = document.getElementById("pickup").value.trim();
    const dropoff = document.getElementById("dropoff").value.trim();
    const seats = parseInt(document.getElementById("seats").value);
    const passengerId = document.getElementById("passengerId").value.trim();
    const price = seats * 12;

    const bookingData = {
      pickupPoint: pickup,
      dropoffPoint: dropoff,
      seatsBooked: seats,
      passengerId: passengerId,
      price: price,
      driverId: "user-01",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await db.collection("bookings").add(bookingData);
      alert("Booking submitted successfully!");

      // ✅ Generate QR Code with external link
      const bookingURL = `https://bhabhalong.github.io/thqrides/booking.html?passengerId=${encodeURIComponent(passengerId)}&pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&seats=${encodeURIComponent(seats)}`;

      qrDisplay.innerHTML = "<h4>Booking QR Code:</h4>";
      const canvas = document.createElement("canvas");
      qrDisplay.appendChild(canvas);

      new QRCode(canvas, bookingURL);
    } catch (err) {
      console.error("Booking failed", err);
      alert("Booking failed. Check console.");
    }
  });

  viewBookingsBtn.addEventListener("click", async () => {
    const passengerId = document.getElementById("viewPassengerId").value.trim();
    if (!passengerId) {
      alert("Enter a valid Passenger ID");
      return;
    }

    bookingsList.innerHTML = "<h4>Your Bookings:</h4>";

    try {
      const snapshot = await db
        .collection("bookings")
        .where("passengerId", "==", passengerId)
        .get();

      if (snapshot.empty) {
        bookingsList.innerHTML += "<p>No bookings found.</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const d = doc.data();
        bookingsList.innerHTML += `
          <div style="margin-bottom: 10px;">
            <strong>${d.pickupPoint} ➔ ${d.dropoffPoint}</strong><br/>
            Seats: ${d.seatsBooked} | Status: ${d.status} | Price: R${d.price}
          </div>
        `;
      });
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      alert("Failed to fetch bookings.");
    }
  });
});

function loginUser() {
  alert("Login button clicked! Future login feature goes here.");
}
