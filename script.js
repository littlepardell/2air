document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleButton = document.getElementById('theme-toggle');
    const villaContainer = document.getElementById('villa-container');

    // Constants
    const phoneNumber = '34691660921'; // WhatsApp phone number without '+' or spaces

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
        // If 'dark' is saved, set to dark. Otherwise, default to light.
        setTheme(savedTheme === 'dark');
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

            // Villa Services
            const servicesElement = document.createElement('p');
            servicesElement.className = 'services'; // Apply class for styling
            servicesElement.textContent = `Servicios: ${villa.services}`; // Use textContent for security

            // NO IMAGE ELEMENTS OR PLACEHOLDERS

            // Image Container
            if (villa.images && villa.images.length > 0) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'villa-image-container';
                villa.images.forEach(imagePath => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagePath;
                    imgElement.alt = `Imagen de ${villa.title}`; // More descriptive alt text
                    imageContainer.appendChild(imgElement);
                });
                card.appendChild(imageContainer);
            }

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
            card.appendChild(servicesElement);
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
    loadTheme(); // Load theme from localStorage
    loadAndDisplayVillas(); // Fetch and display villa data
});
