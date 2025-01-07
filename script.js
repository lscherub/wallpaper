const widthRange = document.getElementById('width');
const heightRange = document.getElementById('height');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const colorInput = document.getElementById('color');
const patternSelect = document.getElementById('pattern');
const patternColorInput = document.getElementById('patternColor');
const patternSizeInput = document.getElementById('patternSize');
const patternRepeatInput = document.getElementById('patternRepeat');
const previewCanvas = document.getElementById('previewCanvas');
const downloadButton = document.getElementById('download');

const ctx = previewCanvas.getContext('2d');

function updateValues() {
    widthInput.value = widthRange.value;
    heightInput.value = heightRange.value;
}

function drawPattern(ctx, pattern, color, size, repeat, canvasWidth, canvasHeight) {
    ctx.fillStyle = color;
    const patternSpacing = canvasWidth / repeat;

    for (let i = 0; i < repeat; i++) {
        for (let j = 0; j < repeat; j++) {
            const x = i * patternSpacing;
            const y = j * patternSpacing;
            switch (pattern) {
                case 'stripes':
                    ctx.fillRect(x, y, size, canvasHeight);
                    break;
                case 'dots':
                    ctx.beginPath();
                    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'zigzag':
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size, y + size);
                    ctx.lineTo(x + size * 2, y);
                    ctx.fill();
                    break;
            }
        }
    }
}

function updatePreview() {
    const width = widthRange.value;
    const height = heightRange.value;
    const color = colorInput.value;
    const pattern = patternSelect.value;
    const patternColor = patternColorInput.value;
    const patternSize = parseInt(patternSizeInput.value, 10);
    const patternRepeat = parseInt(patternRepeatInput.value, 10);

    previewCanvas.width = width / 10;
    previewCanvas.height = height / 10;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

    if (pattern !== 'none') {
        drawPattern(ctx, pattern, patternColor, patternSize, patternRepeat, previewCanvas.width, previewCanvas.height);
    }
}

function downloadWallpaper() {
    const width = widthRange.value;
    const height = heightRange.value;
    const color = colorInput.value;
    const pattern = patternSelect.value;
    const patternColor = patternColorInput.value;
    const patternSize = parseInt(patternSizeInput.value, 10);
    const patternRepeat = parseInt(patternRepeatInput.value, 10);

    const fullCanvas = document.createElement('canvas');
    const fullCtx = fullCanvas.getContext('2d');

    fullCanvas.width = width;
    fullCanvas.height = height;
    fullCtx.fillStyle = color;
    fullCtx.fillRect(0, 0, fullCanvas.width, fullCanvas.height);

    if (pattern !== 'none') {
        drawPattern(fullCtx, pattern, patternColor, patternSize, patternRepeat, fullCanvas.width, fullCanvas.height);
    }

    const link = document.createElement('a');
    link.download = `wallpaper_${width}x${height}.png`;
    link.href = fullCanvas.toDataURL();
    link.click();
}

widthRange.addEventListener('input', updateValues);
heightRange.addEventListener('input', updateValues);
widthRange.addEventListener('input', updatePreview);
heightRange.addEventListener('input', updatePreview);
colorInput.addEventListener('input', updatePreview);
patternSelect.addEventListener('change', updatePreview);
patternColorInput.addEventListener('input', updatePreview);
patternSizeInput.addEventListener('input', updatePreview);
patternRepeatInput.addEventListener('input', updatePreview);
document.getElementById('generate').addEventListener('click', function() {
    updatePreview();
    downloadButton.style.display = 'block';
});
downloadButton.addEventListener('click', downloadWallpaper);
