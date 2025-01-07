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
