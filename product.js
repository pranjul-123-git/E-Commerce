// Sample product data (in a real app, this would come from a database)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 7999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals alike. Enjoy crystal clear sound and comfort for extended listening sessions.",
        features: [
            "Active Noise Cancellation",
            "Bluetooth 5.0",
            "30-hour battery life",
            "Comfortable over-ear design",
            "Built-in microphone for calls"
        ],
        stock: 15,
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 15999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        description: "Feature-packed smartwatch with health monitoring, notifications, and apps. Track your fitness goals, receive notifications, and more with this stylish and functional smartwatch.",
        features: [
            "Heart rate monitoring",
            "Sleep tracking",
            "Water resistant",
            "GPS tracking",
            "Customizable watch faces"
        ],
        stock: 8,
        rating: 4.2
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 5999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        description: "Comfortable and durable running shoes designed for optimal performance. These lightweight shoes provide excellent support and cushioning for runners of all levels.",
        features: [
            "Breathable mesh upper",
            "Cushioned midsole",
            "Durable rubber outsole",
            "Reflective details for visibility",
            "Available in multiple colors"
        ],
        stock: 20,
        rating: 4.7
    },
    {
        id: 4,
        name: "Backpack",
        price: 3999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        description: "Spacious and stylish backpack perfect for daily use or travel. This versatile backpack features multiple compartments to keep your belongings organized.",
        features: [
            "Laptop compartment",
            "Water bottle pockets",
            "Padded shoulder straps",
            "Front organizer pocket",
            "Water-resistant material"
        ],
        stock: 12,
        rating: 4.0
    }
];

// DOM Elements
const productDetailsContainer = document.getElementById('product-details');
const relatedProductsContainer = document.getElementById('related-products-container');
const productBreadcrumb = document.getElementById('product-breadcrumb');
const cartCount = document.querySelector('.cart-count');

// Format price to rupees
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        productDetailsContainer.innerHTML = '<p class="error-message">Product not found!</p>';
        return;
    }
    
    // Update page title and breadcrumb
    document.title = `${product.name} - ShopEasy`;
    productBreadcrumb.textContent = product.name;
    
    // Create product details HTML
    const productHTML = `
        <div class="product-details-layout">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span class="rating-value">${product.rating.toFixed(1)}</span>
                </div>
                <p class="product-price">${formatPrice(product.price)}</p>
                <div class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    <h3>Key Features:</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" id="decrease-quantity">-</button>
                        <input type="number" id="product-quantity" value="1" min="1" max="${product.stock}">
                        <button class="quantity-btn" id="increase-quantity">+</button>
                    </div>
                    <button class="add-to-cart-btn" id="add-to-cart-btn" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
                <div class="product-meta">
                    <p>Category: <span>${product.category}</span></p>
                    <p>Product ID: <span>#${product.id}</span></p>
                </div>
            </div>
        </div>
    `;
    
    productDetailsContainer.innerHTML = productHTML;
    
    // Add event listeners
    addProductEventListeners(product);
    
    // Load related products
    loadRelatedProducts(product);
}

// Generate rating stars
function generateRatingStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

// Add event listeners to product details page
function addProductEventListeners(product) {
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    // Decrease quantity button
    decreaseBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    // Increase quantity button
    increaseBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity < product.stock) {
            quantityInput.value = quantity + 1;
        }
    });
    
    // Add to cart button
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product, quantity);
    });
}

// Load related products
function loadRelatedProducts(currentProduct) {
    // Get products in the same category
    const relatedProducts = products.filter(p => 
        p.category === currentProduct.category && p.id !== currentProduct.id
    );
    
    relatedProductsContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
            </a>
            <button onclick="quickAddToCart(${product.id})" class="add-to-cart">Add to Cart</button>
        `;
        relatedProductsContainer.appendChild(productCard);
    });
}

// Add to cart function
function addToCart(product, quantity) {
    try {
        // Get existing cart from localStorage
        let cart = [];
        const savedCart = localStorage.getItem('cart') || localStorage.getItem('shopping-cart');
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
                
                // Ensure cart is an array
                if (!Array.isArray(cart)) {
                    console.error("Invalid cart format, resetting cart");
                    cart = [];
                }
            } catch (e) {
                console.error("Error parsing cart:", e);
                cart = [];
            }
        }
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // Create a simplified product object to avoid circular references
            const productToAdd = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: quantity
            };
            
            cart.push(productToAdd);
        }
        
        // Save cart to localStorage (use both keys for compatibility)
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
        
        console.log("Cart updated:", cart);
        
        // Update cart count
        updateCartCount(cart);
        
        // Show notification
        showNotification(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
    } catch (error) {
        console.error("Error adding to cart:", error);
        showNotification("Error adding to cart. Please try again.");
    }
}

// Quick add to cart (for related products)
function quickAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product, 1);
    }
}

// Update cart count
function updateCartCount(cart) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.animation = 'slideIn 0.5s ease-out';

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Load cart count on page load
function loadCartCount() {
    const savedCart = localStorage.getItem('cart') || localStorage.getItem('shopping-cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        updateCartCount(cart);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    loadCartCount();
}); 