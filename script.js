document.getElementById('width').addEventListener('input', function() {
    document.getElementById('widthValue').innerText = this.value;
});

document.getElementById('height').addEventListener('input', function() {
    document.getElementById('heightValue').innerText = this.value;
});

document.getElementById('generate').addEventListener('click', function() {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const color = document.getElementById('color').value;

    const wallpaper = document.getElementById('wallpaper');
    wallpaper.style.width = `${width}px`;
    wallpaper.style.height = `${height}px`;
    wallpaper.style.backgroundColor = color;
});
