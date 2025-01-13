document.getElementById('widthSlider').addEventListener('input', function () {
    const width = this.value;
    document.getElementById('width').value = width;
    generateWallpaper();
});

document.getElementById('heightSlider').addEventListener('input', function () {
    const height = this.value;
    document.getElementById('height').value = height;
    generateWallpaper();
});

document.getElementById('width').addEventListener('input', function () {
    const width = this.value;
    document.getElementById('widthSlider').value = width;
    generateWallpaper();
});

document.getElementById('height').addEventListener('input', function () {
    const height = this.value;
    document.getElementById('heightSlider').value = height;
    generateWallpaper();
});

document.getElementById('color').addEventListener('input', generateWallpaper);
document.getElementById('patternColor').addEventListener('input', generateWallpaper);
document.getElementById('patternType').addEventListener('change', generateWallpaper);
document.getElementById('patternSize').addEventListener('input', generateWallpaper);
document.getElementById('patternRepeat').addEventListener('change', generateWallpaper);
document.getElementById('iconInput').addEventListener('input', generateWallpaper);

function syncHexInput() {
    const colorPicker = document.getElementById('color');
    const hexInput = document.getElementById('colorHex');
    hexInput.value = colorPicker.value;
}

function syncColorPicker() {
    const colorPicker = document.getElementById('color');
    const hexInput = document.getElementById('colorHex');
    const hexValue = hexInput.value;

    if (/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
        colorPicker.value = hexValue;
    } else {
        alert('Invalid hex code');
    }
}

function generateWallpaper() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const color = document.getElementById('colorHex').value;
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const color = document.getElementById('color').value;
    const icon = document.getElementById('iconInput').value;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    applyPattern(ctx, width, height);

    if (icon) {
        ctx.font = '100px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, width / 2, height / 2);
    }
}

function applyPattern(ctx, width, height) {
    const patternType = document.getElementById('patternType').value;
    const patternColor = document.getElementById('patternColor').value;
    const patternSize = parseInt(document.getElementById('patternSize').value);
    const patternRepeat = document.getElementById('patternRepeat').value;

    if (patternType !== 'none') {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = patternSize;
        patternCanvas.height = patternSize;
        const patternCtx = patternCanvas.getContext('2d');

        patternCtx.fillStyle = patternColor;

        if (patternType === 'circle') {
            patternCtx.beginPath();
            patternCtx.arc(patternSize / 2, patternSize / 2, patternSize / 4, 0, 2 * Math.PI);
            patternCtx.fill();
        } else if (patternType === 'square') {
            patternCtx.fillRect(0, 0, patternSize, patternSize);
        }

        const pattern = ctx.createPattern(patternCanvas, patternRepeat);
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
    }
}

function downloadWallpaper() {
    const canvas = document.getElementById('previewCanvas');
    const link = document.createElement('a');
    link.download = 'wallpaper.png';
    link.href = canvas.toDataURL();
    link.click();
}

function generateWallpaper() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');

    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const color = document.getElementById('color').value;
    const icon = document.getElementById('iconInput').value;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    applyPattern(ctx, width, height);

    if (icon) {
        placeIcons(ctx, width, height, icon);
    }
}

function applyPattern(ctx, width, height) {
    const patternType = document.getElementById('patternType').value;
    const patternColor = document.getElementById('patternColor').value;
    const patternSize = parseInt(document.getElementById('patternSize').value);
    const patternCount = parseInt(document.getElementById('patternCount').value);

    ctx.fillStyle = patternColor;

    for (let i = 0; i < patternCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        switch (patternType) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(x, y, patternSize / 2, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 'square':
                ctx.fillRect(x - patternSize / 2, y - patternSize / 2, patternSize, patternSize);
                break;
            case 'zigzag':
                drawZigzag(ctx, x, y, patternSize);
                break;
            case 'line':
                drawLine(ctx, x, y, patternSize);
                break;
            case 'spiral':
                drawSpiral(ctx, x, y, patternSize);
                break;
            case 'star':
                drawStar(ctx, x, y, patternSize / 2, 5, 0.5);
                break;
        }
    }
}

function placeIcons(ctx, width, height, icon) {
    const patternCount = parseInt(document.getElementById('patternCount').value);
    ctx.font = `${parseInt(document.getElementById('patternSize').value)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < patternCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillText(icon, x, y);
    }
}

function drawZigzag(ctx, x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(x + size * (i % 2), y + (size / 5) * i);
    }
    ctx.stroke();
}

function drawLine(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.stroke();
}

function drawSpiral(ctx, x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 2 * Math.PI; i += 0.1) {
        const px = x + (size * i / (2 * Math.PI)) * Math.cos(i);
        const py = y + (size * i / (2 * Math.PI)) * Math.sin(i);
        ctx.lineTo(px, py);
    }
    ctx.stroke();
}

function drawStar(ctx, cx, cy, outerRadius, points, inset) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + outerRadius);
    for (let i = 1; i <= points * 2; i++) {
        const angle = i * Math.PI / points;
        const r = i % 2 === 0 ? outerRadius : outerRadius * inset;
        ctx.lineTo(cx + r * Math.sin(angle), cy - r * Math.cos(angle));
    }
    ctx.closePath();
    ctx.fill();
}

