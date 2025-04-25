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

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("dropoff").value;
    const seats = parseInt(document.getElementById("seats").value);
    const passengerId = document.getElementById("passengerId").value;
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
      const docRef = await db.collection("bookings").add(bookingData);
      alert("Booking submitted successfully!");

      // Generate shorter QR (only booking ID + passengerId)
      const qrPayload = {
        bookingId: docRef.id,
        passengerId: passengerId
      };

      qrDisplay.innerHTML = "<h4>Booking QR Code:</h4>";
      const qrCanvas = document.createElement("div");
      qrDisplay.appendChild(qrCanvas);

      new QRCode(qrCanvas, {
        text: JSON.stringify(qrPayload),
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

    } catch (err) {
      console.error("Booking failed", err);
      alert("Booking failed. Check console.");
    }
  });
});

function loginUser() {
  alert("Login button clicked! Future login feature goes here.");
}
