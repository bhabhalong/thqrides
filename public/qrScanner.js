export function setupQRScanner(onScanSuccess) {
    const video = document.createElement('video');
    const canvasElement = document.createElement('canvas');
    const canvas = canvasElement.getContext('2d');
    const outputDiv = document.getElementById('qrScanResult');
  
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // iOS
        video.play();
        requestAnimationFrame(tick);
      });
  
    function tick() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
        if (code) {
          video.srcObject.getTracks().forEach(track => track.stop());
          onScanSuccess(code.data);
          return;
        }
      }
      requestAnimationFrame(tick);
    }
  
    document.body.appendChild(video);
    document.body.appendChild(canvasElement);
  }
  