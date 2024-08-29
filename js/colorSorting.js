window.addEventListener('load', () => {
    const imageElements = document.querySelectorAll('.image-container img');

    const images = Array.from(imageElements).map(img => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        return {
            element: img,
            rgb: dominantColor,
            hsl: rgbToHsl(dominantColor)
        };
    });

    images.sort((a, b) => a.hsl[0] - b.hsl[0]);

    const container = document.querySelector('.image-container');
    container.innerHTML = ''; // Clear the container
    images.forEach(img => {
        container.appendChild(img.element);
    });
});

function rgbToHsl([r, g, b]) {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}
