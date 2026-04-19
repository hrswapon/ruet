const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

// Load image
document.getElementById("upload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    uploadedImage = new Image();
    uploadedImage.src = URL.createObjectURL(file);

    uploadedImage.onload = () => {
        console.log("Image loaded ✅");
    };
});

function generate() {
    const id = document.getElementById("id").value || "2007004";
    const name = document.getElementById("name").value || "Your Name";

    if (!uploadedImage || !uploadedImage.complete) {
        alert("Image not loaded yet!");
        return;
    }

    // Canvas size
    canvas.width = 1200;
    canvas.height = 630;

    // Background
    ctx.fillStyle = "#ededed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image
    drawCurvedImage(uploadedImage);

    // Draw text
    drawText(id, name);
}

function drawCurvedImage(img) {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(650, 0);
    ctx.bezierCurveTo(900, 150, 900, 480, 650, 630);
    ctx.lineTo(1200, 630);
    ctx.lineTo(1200, 0);
    ctx.closePath();

    ctx.clip();

    const scale = Math.max(550 / img.width, 630 / img.height);
    const x = 650 - (img.width * scale - 550) / 2;
    const y = -(img.height * scale - 630) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    ctx.restore();
}

function drawText(id, name) {
    ctx.fillStyle = "#111";

    ctx.font = "bold 90px Georgia";
    ctx.fillText(id, 80, 140);

    ctx.beginPath();
    ctx.moveTo(80, 300);
    ctx.lineTo(500, 300);
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = "36px Georgia";
    ctx.fillText("Signing Out", 80, 380);

    ctx.font = "bold 48px Georgia";
    wrapText(name, 80, 450, 500, 55);
}

function wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const width = ctx.measureText(testLine).width;

        if (width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

function downloadImage() {
    const link = document.createElement("a");
    link.download = "signing-out.png";
    link.href = canvas.toDataURL();
    link.click();
}
