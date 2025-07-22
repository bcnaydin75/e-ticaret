// Basic JavaScript for demonstration purposes
document.addEventListener('DOMContentLoaded', () => {
    const favoriteProductsGrid = document.getElementById('favoriteProductsGrid');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');

    // In a real application, you would fetch favorite products from a backend
    // For now, let's assume there are some favorite products initially (as placed in HTML)
    // If there were no products, you'd show the noFavoritesMessage
    const hasFavorites = favoriteProductsGrid.children.length > 0; // Check if there are any product cards

    if (!hasFavorites) {
        favoriteProductsGrid.style.display = 'none';
        noFavoritesMessage.style.display = 'block';
    } else {
        favoriteProductsGrid.style.display = 'grid'; // Use 'grid' as per your existing products section
        noFavoritesMessage.style.display = 'none';
    }

    // Example of removing a favorite product (requires more robust JS for real functionality)
    document.querySelectorAll('.remove-from-favorites').forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                productCard.remove();
                // Re-check if any favorites remain
                if (favoriteProductsGrid.children.length === 0) {
                    favoriteProductsGrid.style.display = 'none';
                    noFavoritesMessage.style.display = 'block';
                }
            }
        });
    });

    // Re-use existing modal logic from script.js if applicable
    const profileBtn = document.getElementById('profileBtn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.getElementById('closeModal');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const goToRegister = document.getElementById('goToRegister');
    const goToLogin = document.getElementById('goToLogin');

    if (profileBtn && authModal && closeModal && loginTab && registerTab && loginForm && registerForm && goToRegister && goToLogin) {
        profileBtn.addEventListener('click', () => {
            authModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            authModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === authModal) {
                authModal.style.display = 'none';
            }
        });

        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });

        goToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            registerTab.click();
        });

        goToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginTab.click();
        });
    }
});