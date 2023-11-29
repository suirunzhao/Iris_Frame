async function loadImages() {
    const response = await fetch('/images');
    const images = await response.json();

    const gallery = document.getElementById('gallery');
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.url;

        // Apply different styles based on whether it's the latest image
        if (index === 0) {
            img.classList.add('latest-image');
            gallery.appendChild(img); // Append the latest image directly to the gallery
        } else {
            img.classList.add('small-image');
            gridContainer.appendChild(img); // Append other images to the grid container
        }

        img.onerror = () => {
            img.style.display = 'none';
        };
    });

    gallery.appendChild(gridContainer); // Append the grid container to the gallery
}

loadImages();
