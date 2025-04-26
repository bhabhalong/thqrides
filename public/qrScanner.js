import QrScanner from "./qr.js";

const video = document.createElement("video");
document.body.appendChild(video);

const qrScanner = new QrScanner(video, result => {
    console.log("QR Code Detected:", result);
    try {
        const data = JSON.parse(result);
        if (data.bookingId && data.passengerId) {
            window.location.href = `booking.html?bookingId=${data.bookingId}&passengerId=${data.passengerId}`;
        } else {
            alert("Invalid QR code data.");
        }
    } catch (e) {
        alert("QR code is not valid JSON.");
    }
});

qrScanner.start();
