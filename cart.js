// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
        
        html += `
            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 border-b border-gray-200 last:border-0">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg">
                <div class="flex-1 text-center sm:text-right">
                    <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
                    <p class="text-gray-500 mb-2">${item.description}</p>
                    <p class="text-green-600 font-bold text-lg">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="decreaseQuantity(${index})" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center">
                        <i class="fa-solid fa-minus text-sm"></i>
                    </button>
                    <span class="text-xl font-semibold w-12 text-center">${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center">
                        <i class="fa-solid fa-plus text-sm"></i>
                    </button>
                </div>
                <div class="text-center sm:text-left">
                    <p class="text-xl font-bold text-green-600 mb-2">$${itemTotal.toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})" class="text-red-600 hover:text-red-700">
                        <i class="fa-solid fa-trash"></i> حذف
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Checkout
document.getElementById('checkoutBtn')?.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('السلة فارغة');
        return;
    }
    alert('شكراً لك! سيتم إتمام الطلب قريباً.');
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

