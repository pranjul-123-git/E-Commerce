// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const continueShoppingBtn = document.getElementById('continue-shopping');
const cartCount = document.querySelector('.cart-count');

// Cart data
let cart = [];

// Format price to rupees
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Load cart from localStorage
function loadCart() {
    // Check for URL parameters (for empty cart message from payment page)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('empty') === 'true') {
        showEmptyCartMessage('Your cart is empty. Please add products before proceeding to checkout.');
    }

    try {
        // Try to get cart from localStorage
        const savedCart = localStorage.getItem('cart') || localStorage.getItem('shopping-cart');
        
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
                
                // Check if cart is valid
                if (!Array.isArray(cart)) {
                    console.error("Invalid cart format, resetting cart");
                    cart = [];
                    saveCart(); // Save empty cart
                }
                
                // Log cart contents for debugging
                console.log("Loaded cart:", cart);
                
                if (cart.length === 0) {
                    showEmptyCartMessage('Your cart is empty. Add some products to get started.');
                } else {
                    // Store cart in both localStorage keys for compatibility
                    saveCart();
                    
                    // Update UI
                    updateCartCount();
                    renderCartItems();
                    updateCartSummary();
                }
            } catch (error) {
                console.error("Error parsing cart data:", error);
                cart = [];
                saveCart(); // Save empty cart
                showEmptyCartMessage('There was an error loading your cart. Your cart has been reset.');
            }
        } else {
            console.log("No cart found in localStorage");
            cart = [];
            saveCart(); // Initialize empty cart
            showEmptyCartMessage('Your cart is empty. Add some products to get started.');
        }
    } catch (error) {
        console.error("Error in loadCart function:", error);
        cart = [];
        saveCart(); // Save empty cart
        showEmptyCartMessage('There was an error loading your cart. Please try again.');
    }
}

// Show custom empty cart message
function showEmptyCartMessage(message) {
    if (cartEmptyMessage) {
        cartEmptyMessage.innerHTML = `<p>${message}</p>`;
        cartEmptyMessage.style.display = 'block';
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        return;
    }
    
    cartEmptyMessage.style.display = 'none';
    
    // Create cart items table
    const table = document.createElement('table');
    table.className = 'cart-table';
    
    // Create table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(tableHeader);
    
    // Create table body
    const tableBody = document.createElement('tbody');
    
    // Add cart items to table
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="product-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="product-details">
                    <h4>${item.name}</h4>
                    <p>Category: ${item.category}</p>
                </div>
            </td>
            <td>${formatPrice(item.price)}</td>
            <td>
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>${formatPrice(item.price * item.quantity)}</td>
            <td>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    table.appendChild(tableBody);
    cartItemsContainer.appendChild(table);
    
    // Add event listeners to buttons
    addEventListeners();
}

// Add event listeners to cart item buttons
function addEventListeners() {
    // Quantity decrease buttons
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            decreaseQuantity(id);
        });
    });
    
    // Quantity increase buttons
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            increaseQuantity(id);
        });
    });
    
    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            removeItem(id);
        });
    });
}

// Decrease item quantity
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeItem(id);
            return;
        }
        saveCart();
        renderCartItems();
        updateCartSummary();
    }
}

// Increase item quantity
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        saveCart();
        renderCartItems();
        updateCartSummary();
    }
}

// Remove item from cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCartItems();
    updateCartSummary();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 499 : 0; // ₹499 shipping fee if cart is not empty
    const total = subtotal + shipping;
    
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    totalElement.textContent = formatPrice(total);
}

// Event listeners
continueShoppingBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        // Create a backup of the cart before checkout
        localStorage.setItem('backupCart', JSON.stringify(cart));
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    } else {
        alert('Your cart is empty. Add some products before checking out.');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for reset parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        resetCart();
        showEmptyCartMessage('Your cart has been reset.');
    } else {
        loadCart();
    }
    
    // Add debug button for development (can be removed in production)
    addDebugButton();
});

// Reset cart function
function resetCart() {
    console.log("Resetting cart");
    cart = [];
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('shopping-cart', JSON.stringify([]));
    updateCartCount();
    renderCartItems();
    updateCartSummary();
}

// Debug function to help diagnose cart issues
function addDebugButton() {
    const debugContainer = document.createElement('div');
    debugContainer.style.marginTop = '20px';
    debugContainer.style.display = 'flex';
    debugContainer.style.gap = '10px';
    
    // Debug button
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug Cart';
    debugButton.style.padding = '10px';
    debugButton.style.backgroundColor = '#f1f1f1';
    debugButton.style.border = '1px solid #ddd';
    debugButton.style.borderRadius = '4px';
    debugButton.style.cursor = 'pointer';
    
    debugButton.addEventListener('click', () => {
        const cartData = {
            'cart': localStorage.getItem('cart'),
            'shopping-cart': localStorage.getItem('shopping-cart'),
            'backupCart': localStorage.getItem('backupCart'),
            'lastOrder': localStorage.getItem('lastOrder')
        };
        
        console.log('Cart Debug Information:');
        console.log(cartData);
        
        alert('Cart debug information has been logged to the console. Press F12 to view.');
    });
    
    // Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Cart';
    resetButton.style.padding = '10px';
    resetButton.style.backgroundColor = '#ffdddd';
    resetButton.style.border = '1px solid #ffaaaa';
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your cart? This will remove all items.')) {
            resetCart();
            showEmptyCartMessage('Your cart has been reset.');
            alert('Cart has been reset.');
        }
    });
    
    // Add to container
    debugContainer.appendChild(debugButton);
    debugContainer.appendChild(resetButton);
    
    // Add to page
    const container = document.querySelector('.container');
    container.appendChild(debugContainer);
} 