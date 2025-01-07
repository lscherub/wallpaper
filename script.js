const widthRange = document.getElementById('width');
const heightRange = document.getElementById('height');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const widthUnit = document.getElementById('widthUnit');
const heightUnit = document.getElementById('heightUnit');
const colorInput = document.getElementById('color');
const previewCanvas = document.getElementById('previewCanvas');
const downloadButton = document.getElementById('download');

const ctx = previewCanvas.getContext('2d');

function updateValues() {
    widthInput.value = widthRange.value;
    heightInput.value = heightRange.value;
}

function updatePreview() {
    const width = widthRange.value;
    const height = heightRange.value;
    const color = colorInput.value;

    previewCanvas.width = width / 10;
    previewCanvas.height = height / 10;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
}

function downloadWallpaper() {
    const width = widthRange.value;
    const height = heightRange.value;
    const color = colorInput.value;

    const fullCanvas = document.createElement('canvas');
    const fullCtx = fullCanvas.getContext('2d');

    fullCanvas.width = width;
    fullCanvas.height = height;
    fullCtx.fillStyle = color;
    fullCtx.fillRect(0, 0, fullCanvas.width, fullCanvas.height);

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
document.getElementById('generate').addEventListener('click', function() {
    updatePreview();
    downloadButton.style.display = 'block';
});
downloadButton.addEventListener('click', downloadWallpaper);
