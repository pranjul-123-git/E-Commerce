// Initialize the order confirmation page
document.addEventListener('DOMContentLoaded', function() {
    console.log("Order confirmation page loaded");
    
    // Load order details from localStorage
    loadOrderDetails();
    
    // Update cart count in the header (should be 0 after order)
    updateCartCount();
    
    // Add a "Shop More" button instead of debug button
    addShopMoreButton();
});

// Load order details from localStorage
function loadOrderDetails() {
    console.log("Loading order details");
    
    try {
        const orderDetails = JSON.parse(localStorage.getItem('lastOrder'));
        console.log("Order details from localStorage:", orderDetails);
        
        // If no order details found, redirect to home page
        if (!orderDetails) {
            console.error("No order details found in localStorage");
            alert("No order details found. Redirecting to home page.");
            window.location.href = 'index.html';
            return;
        }
        
        // Update order information
        document.getElementById('order-id').textContent = orderDetails.orderId || 'N/A';
        document.getElementById('order-date').textContent = formatDate(orderDetails.date);
        document.getElementById('payment-method').textContent = formatPaymentMethod(orderDetails.paymentMethod);
        
        // Update order summary
        document.getElementById('confirmation-subtotal').textContent = orderDetails.subtotal || '₹0';
        document.getElementById('confirmation-shipping').textContent = orderDetails.shipping || '₹0';
        document.getElementById('confirmation-total').textContent = orderDetails.total || '₹0';
        
        // Render order items
        renderOrderItems(orderDetails.items);
    } catch (error) {
        console.error("Error loading order details:", error);
        alert("There was an error loading your order details. Redirecting to home page.");
        window.location.href = 'index.html';
    }
}

// Render order items in the confirmation page
function renderOrderItems(items) {
    console.log("Rendering order items:", items);
    
    const confirmationItemsContainer = document.getElementById('confirmation-items');
    if (!confirmationItemsContainer) {
        console.error("Confirmation items container not found");
        return;
    }
    
    confirmationItemsContainer.innerHTML = '';
    
    // If items array is empty (which might happen due to clearing cart before storing order details)
    // Try to get items from a backup in localStorage
    if (!items || items.length === 0) {
        console.log("No items found in order details, trying backup cart");
        try {
            const backupCart = JSON.parse(localStorage.getItem('backupCart')) || [];
            console.log("Backup cart:", backupCart);
            items = backupCart;
            
            if (items.length === 0) {
                console.log("No items found in backup cart either");
                confirmationItemsContainer.innerHTML = '<p>No items found in your order.</p>';
                return;
            }
        } catch (error) {
            console.error("Error parsing backup cart:", error);
            confirmationItemsContainer.innerHTML = '<p>Error loading order items.</p>';
            return;
        }
    }
    
    console.log("Rendering items:", items);
    
    items.forEach(item => {
        try {
            const itemElement = document.createElement('div');
            itemElement.className = 'confirmation-item';
            
            itemElement.innerHTML = `
                <div class="confirmation-item-details">
                    <span class="confirmation-item-name">${item.name || 'Unknown Item'}</span>
                    <span class="confirmation-item-quantity">x${item.quantity || 1}</span>
                </div>
                <span class="confirmation-item-price">${formatPrice(item.price * item.quantity)}</span>
            `;
            
            confirmationItemsContainer.appendChild(itemElement);
        } catch (error) {
            console.error("Error rendering item:", item, error);
        }
    });
}

// Format date to a readable format
function formatDate(dateString) {
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    } catch (error) {
        console.error("Error formatting date:", error);
        return new Date().toLocaleDateString('en-IN');
    }
}

// Format payment method to a readable format
function formatPaymentMethod(method) {
    const methodMap = {
        'credit-card': 'Credit Card',
        'debit-card': 'Debit Card',
        'upi': 'UPI',
        'net-banking': 'Net Banking'
    };
    
    return methodMap[method] || method || 'Credit Card';
}

// Format price in Indian Rupee format
function formatPrice(price) {
    try {
        if (typeof price === 'string') {
            return price; // Already formatted
        }
        
        if (isNaN(price)) {
            return '₹0';
        }
        
        return '₹' + price.toLocaleString('en-IN');
    } catch (error) {
        console.error("Error formatting price:", error);
        return '₹0';
    }
}

// Update cart count in the header
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
        });
    } catch (error) {
        console.error("Error updating cart count:", error);
    }
}

// Add a "Shop More" button
function addShopMoreButton() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    const shopMoreButton = document.createElement('button');
    shopMoreButton.textContent = 'Shop More Products';
    shopMoreButton.style.marginTop = '20px';
    shopMoreButton.style.padding = '10px';
    shopMoreButton.style.backgroundColor = '#3498db';
    shopMoreButton.style.color = 'white';
    shopMoreButton.style.border = 'none';
    shopMoreButton.style.borderRadius = '4px';
    shopMoreButton.style.cursor = 'pointer';
    
    shopMoreButton.addEventListener('click', () => {
        window.location.href = 'index.html#products';
    });
    
    container.appendChild(shopMoreButton);
} 