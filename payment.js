// Initialize the payment page
document.addEventListener('DOMContentLoaded', function() {
    // Load cart data and update the UI
    loadCartData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update cart count in the header
    updateCartCount();
    
    // Add reset cart button instead of debug button
    addResetCartButton();
});

// Load cart data from localStorage and update the UI
function loadCartData() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("Payment page loaded cart:", cart);
        
        // Check if cart is valid
        if (!Array.isArray(cart)) {
            console.error("Invalid cart format");
            redirectToCartWithError();
            return;
        }
        
        // Check if cart is empty
        if (cart.length === 0) {
            console.log("Cart is empty, redirecting to cart page");
            // Redirect to cart page with a message
            redirectToCartWithError();
            return;
        }
        
        // Render order items
        renderOrderItems(cart);
        
        // Update order summary
        updateOrderSummary(cart);
    } catch (error) {
        console.error("Error loading cart data:", error);
        redirectToCartWithError();
    }
}

// Redirect to cart page with error message
function redirectToCartWithError() {
    window.location.href = 'cart.html?empty=true';
}

// Add reset cart button
function addResetCartButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Cart';
    resetButton.style.marginTop = '20px';
    resetButton.style.padding = '10px';
    resetButton.style.backgroundColor = '#f1f1f1';
    resetButton.style.border = '1px solid #ddd';
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your cart? This will remove all items.')) {
            // Clear the cart
            localStorage.setItem('cart', JSON.stringify([]));
            localStorage.setItem('shopping-cart', JSON.stringify([]));
            
            alert('Cart has been reset. Redirecting to home page.');
            window.location.href = 'index.html';
        }
    });
    
    const container = document.querySelector('.container');
    container.appendChild(resetButton);
}

// Render order items in the order summary
function renderOrderItems(cart) {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        
        itemElement.innerHTML = `
            <div class="order-item-details">
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-quantity">x${item.quantity}</span>
            </div>
            <span class="order-item-price">${formatPrice(item.price * item.quantity)}</span>
        `;
        
        orderItemsContainer.appendChild(itemElement);
    });
}

// Update order summary with subtotal, shipping, and total
function updateOrderSummary(cart) {
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Set shipping cost (₹499 for orders)
    const shipping = subtotal > 0 ? 499 : 0;
    
    // Calculate total
    const total = subtotal + shipping;
    
    // Update the UI
    document.getElementById('payment-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('payment-shipping').textContent = formatPrice(shipping);
    document.getElementById('payment-total').textContent = formatPrice(total);
}

// Format price in Indian Rupee format
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Set up event listeners
function setupEventListeners() {
    console.log("Setting up event listeners");
    
    // Payment form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        console.log("Payment form found, adding submit event listener");
        
        paymentForm.addEventListener('submit', function(event) {
            console.log("Payment form submitted");
            handlePaymentSubmission(event);
        });
    } else {
        console.error("Payment form not found!");
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            togglePaymentDetails();
            updateFormValidation();
        });
    });
    
    // Add click event to Pay Now button directly
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        console.log("Pay Now button found, adding click event listener");
        
        payNowBtn.addEventListener('click', function(event) {
            console.log("Pay Now button clicked");
            // Prevent default only if not already handled by form submit
            if (!event.defaultPrevented) {
                event.preventDefault();
                handlePaymentSubmission(event);
            }
        });
    } else {
        console.error("Pay Now button not found!");
    }
    
    // Initialize payment details based on default selection
    togglePaymentDetails();
    updateFormValidation();
}

// Handle payment form submission
function handlePaymentSubmission(event) {
    console.log("Handling payment submission");
    
    // Prevent the default form submission
    event.preventDefault();
    
    // Update form validation before checking validity
    updateFormValidation();
    
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    console.log("Selected payment method:", paymentMethod);
    
    // Validate form based on payment method
    const form = document.getElementById('payment-form');
    if (form && !form.checkValidity()) {
        console.log("Form validation failed");
        // Trigger browser's native validation UI
        form.reportValidity();
        return;
    }
    
    // Additional validation for UPI
    if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upi-id')?.value;
        if (!upiId || !upiId.includes('@')) {
            alert("Please enter a valid UPI ID (e.g., username@upi)");
            return;
        }
        console.log("UPI ID validated:", upiId);
    }
    
    // Show processing message
    showProcessingMessage();
    
    // Log payment details for debugging
    console.log("Payment processing started");
    console.log("Payment method:", paymentMethod);
    
    // Simulate payment processing (3 seconds)
    setTimeout(() => {
        console.log("Payment processing completed");
        // Process successful payment
        processSuccessfulPayment();
    }, 3000);
}

// Show payment processing message
function showProcessingMessage() {
    console.log("Showing payment processing message");
    
    const paymentForm = document.querySelector('.payment-form');
    if (!paymentForm) {
        console.error("Payment form container not found!");
        return;
    }
    
    // Remove any existing overlay
    const existingOverlay = document.querySelector('.processing-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Create processing overlay
    const processingOverlay = document.createElement('div');
    processingOverlay.className = 'processing-overlay';
    processingOverlay.innerHTML = `
        <div class="processing-message">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Processing your payment...</p>
        </div>
    `;
    
    // Add overlay to the form
    paymentForm.appendChild(processingOverlay);
    
    // Disable the Pay Now button to prevent multiple submissions
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        payNowBtn.disabled = true;
    }
}

// Process successful payment
function processSuccessfulPayment() {
    console.log("Processing successful payment");
    
    try {
        // Store cart items before clearing
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("Current cart before clearing:", currentCart);
        
        // Create a backup of the cart before clearing
        localStorage.setItem('backupCart', JSON.stringify(currentCart));
        
        // Get payment method
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'credit-card';
        
        // Store order details in localStorage for order confirmation
        const orderDetails = {
            orderId: generateOrderId(),
            date: new Date().toISOString(),
            items: currentCart,
            subtotal: document.getElementById('payment-subtotal')?.textContent || '₹0',
            shipping: document.getElementById('payment-shipping')?.textContent || '₹0',
            total: document.getElementById('payment-total')?.textContent || '₹0',
            paymentMethod: paymentMethod
        };
        
        console.log("Order details:", orderDetails);
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        
        // Clear the cart after storing the order details
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('shopping-cart', JSON.stringify([]));
        
        console.log("Redirecting to order confirmation page");
        // Redirect to order confirmation page
        window.location.href = 'order-confirmation.html';
    } catch (error) {
        console.error("Error processing payment:", error);
        alert("There was an error processing your payment. Please try again.");
        
        // Re-enable the Pay Now button
        const payNowBtn = document.querySelector('.pay-now-btn');
        if (payNowBtn) {
            payNowBtn.disabled = false;
        }
        
        // Remove the processing overlay
        const processingOverlay = document.querySelector('.processing-overlay');
        if (processingOverlay) {
            processingOverlay.remove();
        }
    }
}

// Toggle payment details based on selected payment method
function togglePaymentDetails() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const creditCardDetails = document.getElementById('credit-card-details');
    const upiDetails = document.getElementById('upi-details');
    
    // Hide all payment detail sections first
    if (creditCardDetails) creditCardDetails.style.display = 'none';
    if (upiDetails) upiDetails.style.display = 'none';
    
    // Show the appropriate section based on selection
    if (selectedMethod === 'credit-card' || selectedMethod === 'debit-card') {
        if (creditCardDetails) creditCardDetails.style.display = 'block';
    } else if (selectedMethod === 'upi') {
        if (upiDetails) {
            upiDetails.style.display = 'block';
        } else {
            // Create UPI details section if it doesn't exist
            createUpiDetailsSection();
        }
    }
}

// Create UPI details section if it doesn't exist
function createUpiDetailsSection() {
    console.log("Creating UPI details section");
    
    // Check if the section already exists
    if (document.getElementById('upi-details')) {
        return;
    }
    
    // Create UPI details section
    const upiDetails = document.createElement('div');
    upiDetails.id = 'upi-details';
    upiDetails.className = 'payment-details-section';
    
    upiDetails.innerHTML = `
        <div class="form-group">
            <label for="upi-id">UPI ID</label>
            <input type="text" id="upi-id" name="upi-id" placeholder="username@upi" required>
        </div>
        <div class="form-group">
            <p class="payment-info">You will receive a payment request on your UPI app.</p>
        </div>
    `;
    
    // Insert after credit card details
    const creditCardDetails = document.getElementById('credit-card-details');
    if (creditCardDetails && creditCardDetails.parentNode) {
        creditCardDetails.parentNode.insertBefore(upiDetails, creditCardDetails.nextSibling);
    } else {
        // Fallback - append to payment methods
        const paymentMethods = document.querySelector('.payment-methods');
        if (paymentMethods) {
            paymentMethods.parentNode.appendChild(upiDetails);
        }
    }
    
    // Show the UPI details section
    upiDetails.style.display = 'block';
    
    // Update form validation for UPI
    updateFormValidation();
}

// Update form validation based on selected payment method
function updateFormValidation() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    const cardFields = document.querySelectorAll('#credit-card-details input');
    const upiFields = document.querySelectorAll('#upi-details input');
    
    // Reset all fields
    cardFields.forEach(field => {
        field.required = false;
    });
    
    upiFields.forEach(field => {
        field.required = false;
    });
    
    // Set required fields based on payment method
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
        cardFields.forEach(field => {
            field.required = true;
        });
    } else if (paymentMethod === 'upi') {
        upiFields.forEach(field => {
            field.required = true;
        });
    }
}

// Generate a random order ID
function generateOrderId() {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
} 