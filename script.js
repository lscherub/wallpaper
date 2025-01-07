const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const colorInput = document.getElementById('color');
const widthValue = document.getElementById('widthValue');
const heightValue = document.getElementById('heightValue');
const previewCanvas = document.getElementById('previewCanvas');
const downloadButton = document.getElementById('download');

const ctx = previewCanvas.getContext('2d');

function updatePreview() {
    const width = widthInput.value;
    const height = heightInput.value;
    const color = colorInput.value;

    widthValue.innerText = width;
    heightValue.innerText = height;

    previewCanvas.width = width / 10;
    previewCanvas.height = height / 10;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
}

function downloadWallpaper() {
    const width = widthInput.value;
    const height = heightInput.value;
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

widthInput.addEventListener('input', updatePreview);
heightInput.addEventListener('input', updatePreview);
colorInput.addEventListener('input', updatePreview);
document.getElementById('generate').addEventListener('click', function() {
    updatePreview();
    downloadButton.style.display = 'block';
});
downloadButton.addEventListener('click', downloadWallpaper);
