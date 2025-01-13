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

document.getElementById('color').addEventListener('input', syncHexInput);
document.getElementById('colorHex').addEventListener('input', syncColorPicker);

document.getElementById('patternColor').addEventListener('input', generateWallpaper);
document.getElementById('patternType').addEventListener('change', generateWallpaper);
document.getElementById('patternSize').addEventListener('input', generateWallpaper);
document.getElementById('patternRepeat').addEventListener('change', generateWallpaper);
document.getElementById('iconInput').addEventListener('input', generateWallpaper);

function syncHexInput() {
    const colorPicker = document.getElementById('color');
    const hexInput = document.getElementById('colorHex');
    hexInput.value = colorPicker.value;
    generateWallpaper();
}

function syncColorPicker() {
    const colorPicker = document.getElementById('color');
    const hexInput = document.getElementById('colorHex');
    const hexValue = hexInput.value;

    if (/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
        colorPicker.value = hexValue;
        generateWallpaper();
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
