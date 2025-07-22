document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const subtotalElement = document.getElementById('subtotal');
    const shippingCostElement = document.getElementById('shippingCost');
    const totalAmountElement = document.getElementById('totalAmount');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.querySelector('.cart-summary');
    const cartBadgeCount = document.getElementById('cartBadgeCount');

    // Kargo ücreti sabit veya belirli bir eşiğe göre değişebilir
    const SHIPPING_THRESHOLD = 500; // Örneğin, 500 TL üzeri kargo bedava
    const BASE_SHIPPING_COST = 19.99; // Temel kargo ücreti

    function updateCartTotals() {
        let subtotal = 0;
        let totalItems = 0;

        document.querySelectorAll('.cart-item').forEach(item => {
            const pricePerItem = parseFloat(item.dataset.price);
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            subtotal += pricePerItem * quantity;
            totalItems += quantity;
        });

        let shippingCost = BASE_SHIPPING_COST;
        if (subtotal >= SHIPPING_THRESHOLD) {
            shippingCost = 0; // Kargo bedava
        }

        const totalAmount = subtotal + shippingCost;

        subtotalElement.textContent = `₺${subtotal.toFixed(2)}`;
        shippingCostElement.textContent = `₺${shippingCost.toFixed(2)}`;
        totalAmountElement.textContent = `₺${totalAmount.toFixed(2)}`;

        // Sepet boşsa mesajı göster, doluysa gizle
        if (totalItems === 0) {
            cartItemsContainer.style.display = 'none';
            cartSummary.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            cartItemsContainer.style.display = 'block'; // veya 'grid', 'flex' duruma göre
            cartSummary.style.display = 'block';
            emptyCartMessage.style.display = 'none';
        }

        // Header'daki sepet sayısını güncelle
        if (cartBadgeCount) {
            cartBadgeCount.textContent = totalItems;
        }
    }

    // Miktar arttırma/azaltma ve ürünü kaldırma olay dinleyicileri
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const cartItem = target.closest('.cart-item');

        if (!cartItem) return;

        const quantityInput = cartItem.querySelector('.item-quantity');
        let currentQuantity = parseInt(quantityInput.value);

        if (target.classList.contains('increase-quantity')) {
            quantityInput.value = currentQuantity + 1;
            updateCartTotals();
        } else if (target.classList.contains('decrease-quantity')) {
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
                updateCartTotals();
            }
        } else if (target.closest('.remove-item')) {
            cartItem.remove();
            updateCartTotals();
        }
    });

    // Miktar input'u değiştiğinde
    cartItemsContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity')) {
            let value = parseInt(event.target.value);
            if (isNaN(value) || value < 1) {
                event.target.value = 1; // Geçersizse 1'e sabitle
            }
            updateCartTotals();
        }
    });

    // Sayfa yüklendiğinde sepet toplamlarını hesapla
    updateCartTotals();

    // Modal açma/kapama ve tab geçişleri için mevcut script.js kodunu buraya tekrar ekliyoruz
    // Eğer script.js tüm sayfalarda ortak işlevleri yönetiyorsa, bu kısmı script.js'e taşıyabilirsin.
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