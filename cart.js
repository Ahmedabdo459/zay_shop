// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Generate unique ID for cart items if not exists
cart.forEach((item, index) => {
    if (!item.id) {
        item.id = `cart-item-${Date.now()}-${index}`;
    }
});

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        if (totalItems === 0) {
            cartCount.style.display = 'none';
        } else {
            cartCount.style.display = 'flex';
        }
    }
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.classList.add('hidden');
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.classList.remove('hidden');
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        // Ensure item has an ID
        if (!item.id) {
            item.id = `cart-item-${Date.now()}-${index}`;
        }
        
        html += `
            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-200 last:border-0">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg">
                <div class="flex-1 text-center sm:text-left">
                    <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
                    <p class="text-gray-500 mb-2 text-sm">${item.description}</p>
                    <p class="text-green-600 font-bold text-lg">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-4">
                    <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                        <button onclick="decreaseQuantity('${item.id}')" class="bg-white hover:bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95">
                            <i class="fa-solid fa-minus text-gray-700"></i>
                        </button>
                        <span class="text-xl font-bold w-12 text-center text-gray-800">${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.id}')" class="bg-white hover:bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95">
                            <i class="fa-solid fa-plus text-gray-700"></i>
                        </button>
                    </div>
                    <div class="text-center sm:text-left">
                        <p class="text-xl font-bold text-green-600 mb-2">$${itemTotal.toFixed(2)}</p>
                        <button onclick="removeFromCart('${item.id}')" class="text-red-600 hover:text-red-700 transition text-sm sm:text-base">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}

// Increase quantity
function increaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Decrease quantity
function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            const index = cart.findIndex(i => i.id === itemId);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Remove from cart
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Checkout
document.getElementById('checkoutBtn')?.addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }
    alert('Thank you! The order will be completed soon.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
});

// Initialize
displayCart();
updateCartCount();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

