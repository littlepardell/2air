document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleButton = document.getElementById('theme-toggle');
    // const villaContainer = document.getElementById('villa-container'); // Old container, removed

    // Global Villas Array
    let allVillasData = [];

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

    // Placeholder Navigation Functions
    function navigateToDetailView(villaIndex) {
        console.log('Navigate to detail view for villa index:', villaIndex);
        // Actual logic for showing detail view and hiding main view will be in Phase 4
        // For now, it might involve:
        // document.getElementById('main-view').classList.remove('active-view');
        // document.getElementById('detail-view').classList.add('active-view');
        renderDetailView(villaIndex); // Call the function to render details
    }

    function navigateToMainView() {
        console.log('Navigate to main view');
        // Actual logic for showing main view and hiding detail view will be in Phase 4
        // document.getElementById('detail-view').classList.remove('active-view');
        // document.getElementById('main-view').classList.add('active-view');
    }

    // Function to render the main view with villa cards
    const renderMainView = (villasData) => {
        const mainViewContainer = document.getElementById('main-view');
        if (!mainViewContainer) {
            console.error('Main view container not found');
            return;
        }
        mainViewContainer.innerHTML = ''; // Clear any existing content

        const grid = document.createElement('div');
        grid.className = 'villa-grid-airbnb';
        mainViewContainer.appendChild(grid);

        if (!villasData || villasData.length === 0) {
            mainViewContainer.innerHTML = '<p>No hay villas disponibles en este momento.</p>';
            return;
        }

        villasData.forEach((villa, index) => {
            const card = document.createElement('div');
            card.className = 'villa-card-airbnb';

            // Image
            const coverImagePath = (villa.images && villa.images.length > 0)
                                   ? villa.images[0]
                                   : 'path/to/default/placeholder.jpg'; // Fallback
            const image = document.createElement('img');
            image.className = 'card-image-airbnb';
            image.src = coverImagePath;
            image.alt = `Cover image of ${villa.title}`;
            card.appendChild(image);

            // Content Wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'card-content-airbnb';
            card.appendChild(contentWrapper);

            // Title
            const title = document.createElement('h3');
            title.className = 'card-title-airbnb';
            title.textContent = villa.title;
            contentWrapper.appendChild(title);

            // Short Description
            let shortDescText = villa.description || ""; // Ensure description exists
            if (shortDescText.length > 100) {
                shortDescText = shortDescText.substring(0, 97) + '...';
            }
            const shortDesc = document.createElement('p');
            shortDesc.className = 'card-description-airbnb';
            shortDesc.textContent = shortDescText;
            contentWrapper.appendChild(shortDesc);

            // Click Listener for navigation
            card.addEventListener('click', () => navigateToDetailView(index));

            grid.appendChild(card);
        });
    };

    // Function to render the detail view for a selected villa
    const renderDetailView = (villaIndex) => {
        const detailViewContainer = document.getElementById('detail-view');
        if (!detailViewContainer) {
            console.error('Detail view container not found');
            return;
        }

        const villa = allVillasData[villaIndex];
        if (!villa) {
            console.error('Villa data not found for index:', villaIndex);
            detailViewContainer.innerHTML = '<p>Información de la villa no encontrada. Por favor, intente de nuevo.</p>';
            return;
        }

        detailViewContainer.innerHTML = ''; // Clear existing content

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'detail-content-wrapper'; // For padding/max-width
        detailViewContainer.appendChild(contentWrapper);

        // Back Button
        const backButton = document.createElement('button');
        backButton.className = 'back-button-airbnb button'; // Added 'button' for common styling
        backButton.textContent = '← Volver al listado';
        backButton.addEventListener('click', navigateToMainView);
        contentWrapper.appendChild(backButton);

        // Title
        const title = document.createElement('h1');
        title.className = 'detail-title-airbnb';
        title.textContent = villa.title;
        contentWrapper.appendChild(title);

        // Image Gallery
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'detail-gallery-airbnb';
        if (villa.images && villa.images.length > 0) {
            const imagesToShow = villa.images.slice(0, 5);
            imagesToShow.forEach((imgPath, idx) => {
                const imgWrapper = document.createElement('div'); // Wrapper for potential styling
                imgWrapper.className = 'gallery-image-wrapper';
                if (idx === 0) {
                    imgWrapper.classList.add('gallery-image-main');
                }
                const img = document.createElement('img');
                img.src = imgPath;
                img.alt = `${villa.title} - imagen ${idx + 1}`;
                img.className = 'gallery-image-airbnb';
                img.addEventListener('click', () => openModal(villa.images, idx));
                imgWrapper.appendChild(img);
                galleryContainer.appendChild(imgWrapper);
            });

            if (villa.images.length > 5) {
                const showAllButtonContainer = document.createElement('div');
                showAllButtonContainer.className = 'show-all-photos-container';
                const showAllButton = document.createElement('button');
                showAllButton.className = 'show-all-photos-button button';
                showAllButton.textContent = `Ver todas las ${villa.images.length} fotos`;
                showAllButton.addEventListener('click', () => openModal(villa.images, 0));
                showAllButtonContainer.appendChild(showAllButton);
                // Append to the last image wrapper or directly to galleryContainer
                // For simplicity, appending to galleryContainer. CSS can position it.
                galleryContainer.appendChild(showAllButtonContainer);
            }
        } else {
            const noImageText = document.createElement('p');
            noImageText.textContent = 'No hay imágenes disponibles.';
            galleryContainer.appendChild(noImageText);
        }
        contentWrapper.appendChild(galleryContainer);

        // Description
        const description = document.createElement('p');
        description.className = 'detail-description-airbnb';
        // Replace newlines with <br> for HTML rendering, ensure description is a string
        description.innerHTML = (villa.description || "").replace(/\n/g, '<br>');
        contentWrapper.appendChild(description);

        // Services
        const servicesSection = document.createElement('div');
        servicesSection.className = 'detail-services-airbnb';
        const servicesTitleElement = document.createElement('h3'); // Renamed from servicesTitle to avoid conflict
        servicesTitleElement.textContent = 'Servicios';
        servicesSection.appendChild(servicesTitleElement);
        const servicesList = document.createElement('ul');
        servicesList.className = 'services-list'; // Reusing class from main card for consistency
        if (villa.services && typeof villa.services === 'string') {
            const serviceItems = villa.services.split(',').map(service => service.trim());
            serviceItems.forEach(itemText => {
                if (itemText) {
                    const listItem = document.createElement('li');
                    listItem.textContent = itemText;
                    servicesList.appendChild(listItem);
                }
            });
        } else {
            const noServicesItem = document.createElement('li');
            noServicesItem.textContent = 'No hay servicios detallados.';
            servicesList.appendChild(noServicesItem);
        }
        servicesSection.appendChild(servicesList);
        contentWrapper.appendChild(servicesSection);

        // WhatsApp Button
        const whatsappBtn = document.createElement('a');
        whatsappBtn.className = 'whatsapp-button-airbnb button'; // Added 'button' for common styling
        const message = encodeURIComponent(`Hola, estoy interesado/a en la ${villa.title}.`);
        whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`; // phoneNumber is global
        whatsappBtn.textContent = 'Contactar por WhatsApp';
        whatsappBtn.target = '_blank';
        contentWrapper.appendChild(whatsappBtn);
    };

    // Async function to fetch villa data and then display it in the main view
    const loadAndDisplayVillas = async () => {
        const mainViewContainer = document.getElementById('main-view');
        try {
            const response = await fetch('villas.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allVillasData = await response.json(); // Store in global array
            renderMainView(allVillasData); // Render the main view with fetched data
        } catch (error) {
            console.error('Error al cargar las villas:', error);
            if (mainViewContainer) { // Check if container exists before writing error message
                mainViewContainer.innerHTML = '<p>Error al cargar la información de las villas. Por favor, intente más tarde.</p>';
            }
        }
    };

    // Initial page setup
    createModal(); // Create modal elements once
    loadTheme(); // Load theme from localStorage
    loadAndDisplayVillas(); // Fetch and display villa data
});
