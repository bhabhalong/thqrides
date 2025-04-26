// qrScanner.js
import QrScanner from "./qr-scanner.min.js";

const video = document.createElement("video");
document.body.appendChild(video);

const scanner = new QrScanner(video, result => {
  try {
    const data = JSON.parse(result.data || result);
    const url = `booking.html?bookingId=${data.bookingId}&passengerId=${data.passengerId}`;
    window.location.href = url;
  } catch (e) {
    alert("Invalid QR Code format");
  }
}, {
  returnDetailedScanResult: true
});

scanner.start();
