// Auth modal functionality
const authModal = document.getElementById('authModal');
const profileBtn = document.getElementById('profileBtn');
const closeModal = document.getElementById('closeModal');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const goToRegister = document.getElementById('goToRegister');
const goToLogin = document.getElementById('goToLogin');

// Show modal when profile icon is clicked
profileBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close modal
closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Switch to login tab
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

// Switch to register tab
registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Go to register from login form
goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    registerTab.click();
});

// Go to login from register form
goToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginTab.click();
});

// Form submission handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    alert(`Giriş yapılıyor: ${email}`);
    // In a real app, you would send the login request here
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    alert(`${name}, ${email} adresi ile kaydınız başarılı!`);
    // In a real app, you would send the registration request here
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Visitor counter functionality
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve visitor count from localStorage or initialize
    let count = localStorage.getItem('visitorCount');
    if (!count) {
        count = Math.floor(Math.random() * 1000) + 5000; // Random starting point
    } else {
        count = parseInt(count);
    }

    // Increment count
    count++;
    localStorage.setItem('visitorCount', count);

    // Animated counter effect
    const counterElement = document.getElementById('visitorCount');
    let current = 0;
    const increment = Math.ceil(count / 100);

    const timer = setInterval(() => {
        current += increment;
        if (current >= count) {
            current = count;
            clearInterval(timer);
        }
        counterElement.textContent = current.toLocaleString();
    }, 20);

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (e.target.textContent === "Sepete Ekle") {
                e.preventDefault();
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;

                // Update cart badge
                const cartBadge = document.querySelector('.fa-shopping-cart').nextElementSibling;
                let cartCount = parseInt(cartBadge.textContent);
                cartCount++;
                cartBadge.textContent = cartCount;

                // Show confirmation
                this.textContent = "Sepete Eklendi!";
                this.style.backgroundColor = '#5cb85c';

                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = "Sepete Ekle";
                    this.style.backgroundColor = '';
                }, 2000);
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        if (emailInput.value) {
            alert(`Bültenimize abone olduğunuz için teşekkür ederiz! ${emailInput.value} adresine bir onay maili gönderdik.`);
            emailInput.value = '';
        }
    });

    // Quick view functionality
    const quickViewElements = document.querySelectorAll('.quick-view');
    quickViewElements.forEach(el => {
        el.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            alert(`${productName} ürününü detaylı incelemek için yakında açılacak olan ürün sayfasını kullanabilirsiniz!`);
        });
    });
});
