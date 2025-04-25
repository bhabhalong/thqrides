export async function generateQRCode(data) {
  try {
    const qrContainer = document.getElementById("qrDisplay");
    qrContainer.innerHTML = ""; // Clear previous QR

    const qrCanvas = document.createElement("canvas");
    qrContainer.appendChild(qrCanvas);

    await QRCode.toCanvas(qrCanvas, data, { width: 200 });
  } catch (err) {
    console.error("QR Code generation failed:", err);
  }
}