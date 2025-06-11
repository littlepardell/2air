document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleButton = document.getElementById('theme-toggle');
    const villaContainer = document.getElementById('villa-container');

    // Modal Variables
    let modalOverlay, modalContent, modalImage, closeButton, prevButton, nextButton;
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Constants
    const phoneNumber = '34691660921'; // WhatsApp phone number without '+' or spaces

    // Function to create modal elements and attach listeners
    const createModal = () => {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'modalOverlay';
        modalOverlay.style.display = 'none'; // Initially hidden

        modalContent = document.createElement('div');
        modalContent.id = 'modalContent';

        modalImage = document.createElement('img');
        modalImage.id = 'modalImage';

        closeButton = document.createElement('span');
        closeButton.className = 'modal-close-button';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => modalOverlay.style.display = 'none';

        prevButton = document.createElement('button');
        prevButton.className = 'modal-prev-button';
        prevButton.innerHTML = '&#10094;';
        prevButton.onclick = showPrevImage;

        nextButton = document.createElement('button');
        nextButton.className = 'modal-next-button';
        nextButton.innerHTML = '&#10095;';
        nextButton.onclick = showNextImage;

        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalImage);
        modalContent.appendChild(prevButton);
        modalContent.appendChild(nextButton);
        modalOverlay.appendChild(modalContent);

        // Close modal if overlay (but not content) is clicked
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });

        document.body.appendChild(modalOverlay);
    };

    const updateModalImage = () => {
        if (currentGalleryImages.length > 0) {
            modalImage.src = currentGalleryImages[currentImageIndex];
            prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
            nextButton.style.display = currentImageIndex === currentGalleryImages.length - 1 ? 'none' : 'block';
        }
    };

    const openModal = (images, startIndex) => {
        currentGalleryImages = images;
        currentImageIndex = startIndex;
        updateModalImage();
        modalOverlay.style.display = 'flex';
    };

    const showPrevImage = () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    };

    const showNextImage = () => {
        if (currentImageIndex < currentGalleryImages.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    };

    // Function to set the theme and update the toggle button text
    const setTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeToggleButton.textContent = 'Modo Claro'; // Light Mode
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Modo Oscuro'; // Dark Mode
        }
    };

    // Load saved theme from localStorage
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        // If a theme is saved, use it. Otherwise, default to dark mode (true).
        setTheme(savedTheme ? savedTheme === 'dark' : true);
    };

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        // Check if body currently has dark-mode class
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        // Toggle the theme: if it was dark, set to light (!isCurrentlyDark will be false), and vice-versa
        setTheme(!isCurrentlyDark);
        // Save the new theme preference to localStorage
        localStorage.setItem('theme', !isCurrentlyDark ? 'dark' : 'light');
    });

    // Function to render villas to the DOM
    const renderVillas = (villas) => {
        villaContainer.innerHTML = ''; // Clear any existing content (e.g., loading message)

        villas.forEach(villa => {
            const card = document.createElement('div');
            card.className = 'villa-card'; // Use className for setting a single class

            // Villa Title
            const titleElement = document.createElement('h2');
            titleElement.textContent = villa.title;

            // Villa Description
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = villa.description;

            // Villa Services - New Structure
            const servicesContainer = document.createElement('div');
            servicesContainer.className = 'services-container';

            const servicesTitle = document.createElement('h3');
            servicesTitle.textContent = 'Servicios:';
            servicesContainer.appendChild(servicesTitle);

            const servicesList = document.createElement('ul');
            servicesList.className = 'services-list';

            if (villa.services && typeof villa.services === 'string') {
                const serviceItems = villa.services.split(',').map(service => service.trim());
                serviceItems.forEach(itemText => {
                    if (itemText) { // Avoid creating empty list items
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText;
                        servicesList.appendChild(listItem);
                    }
                });
            }
            servicesContainer.appendChild(servicesList);

            // NO IMAGE ELEMENTS OR PLACEHOLDERS

            // WhatsApp Button
            const whatsappButton = document.createElement('a');
            whatsappButton.className = 'whatsapp-button';
            // Construct the WhatsApp message
            const message = encodeURIComponent(`Hola, estoy interesado/a en la ${villa.title}.`);
            whatsappButton.href = `https://wa.me/${phoneNumber}?text=${message}`;
            whatsappButton.textContent = 'Contactar por WhatsApp';
            whatsappButton.target = '_blank'; // Open link in a new tab

            // Append elements to the card
            card.appendChild(titleElement);
            card.appendChild(descriptionElement);
            card.appendChild(servicesContainer); // Append new services container

            // Thumbnail Image for Gallery
            if (villa.images && villa.images.length > 0) {
                const thumbnailImage = document.createElement('img');
                thumbnailImage.src = villa.images[0]; // Display the first image as thumbnail
                thumbnailImage.alt = `Ver galería de ${villa.title}`;
                thumbnailImage.className = 'villa-thumbnail-image';
                thumbnailImage.onclick = () => openModal(villa.images, 0);
                card.appendChild(thumbnailImage);
            }
            card.appendChild(whatsappButton);

            // Append card to the container
            villaContainer.appendChild(card);
        });
    };

    // Async function to fetch villa data and then display it
    const loadAndDisplayVillas = async () => {
        try {
            const response = await fetch('villas.json');
            if (!response.ok) {
                // If response is not OK (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const villas = await response.json();
            renderVillas(villas); // Call the rendering function with the fetched data
        } catch (error) {
            console.error('Error al cargar las villas:', error);
            // Display an error message in the villa container
            villaContainer.innerHTML = '<p>Error al cargar la información de las villas. Por favor, intente más tarde.</p>';
        }
    };

    // Initial page setup
    createModal(); // Create modal elements once
    loadTheme(); // Load theme from localStorage
    loadAndDisplayVillas(); // Fetch and display villa data
});
