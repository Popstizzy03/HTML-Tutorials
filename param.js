// Example using Canvas API (conceptual)
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100; // Scale factor

ctx.beginPath();

for (let i = 0; i <= 100; i++) { // Iterate through t
    const t = i / 100;
    const angle = 2 * Math.PI * (1 - t);
    const x = centerX + radius * Math.sin(angle);
    const y = centerY + radius * Math.cos(angle);

    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
}

ctx.stroke();
