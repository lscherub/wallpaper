function generateWallpaper() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');

    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const color = document.getElementById('color').value;

    // Resize canvas
    canvas.width = width;
    canvas.height = height;

    // Fill background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Apply pattern and icons if selected
    applyPattern(ctx, width, height);
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

        // Example: Drawing a simple pattern (you can expand this with more complex patterns)
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
