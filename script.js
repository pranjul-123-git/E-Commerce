// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 7999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation technology.",
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
        description: "Feature-packed smartwatch with health monitoring, notifications, and apps.",
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
        description: "Comfortable and durable running shoes designed for optimal performance.",
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
        description: "Spacious and stylish backpack perfect for daily use or travel.",
        features: [
            "Laptop compartment",
            "Water bottle pockets",
            "Padded shoulder straps",
            "Front organizer pocket",
            "Water-resistant material"
        ],
        stock: 12,
        rating: 4.0
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 9999,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60",
        category: "Home & Living",
        description: "Programmable coffee maker with multiple brewing options.",
        features: [
            "12-cup capacity",
            "Programmable timer",
            "Auto shut-off",
            "Brew strength selector",
            "Removable water reservoir"
        ],
        stock: 7,
        rating: 4.3
    },
    {
        id: 6,
        name: "Wireless Earbuds",
        price: 5499,
        image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        description: "Compact wireless earbuds with excellent sound quality and long battery life.",
        features: [
            "True wireless design",
            "Touch controls",
            "Water resistant",
            "20-hour total battery life",
            "Noise isolation"
        ],
        stock: 25,
        rating: 4.6
    },
    {
        id: 7,
        name: "Desk Lamp",
        price: 2999,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
        category: "Home & Living",
        description: "Adjustable desk lamp with multiple lighting modes and USB charging port.",
        features: [
            "Adjustable brightness",
            "Color temperature settings",
            "Flexible arm",
            "USB charging port",
            "Touch controls"
        ],
        stock: 18,
        rating: 4.1
    },
    {
        id: 8,
        name: "Denim Jacket",
        price: 4499,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        description: "Classic denim jacket that never goes out of style.",
        features: [
            "100% cotton denim",
            "Button closure",
            "Multiple pockets",
            "Adjustable cuffs",
            "Available in multiple washes"
        ],
        stock: 14,
        rating: 4.4
    }
];

// Shopping cart
let cart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartCount = document.querySelector('.cart-count');
const searchIcon = document.querySelector('.fa-search');
const searchForm = document.createElement('div');

// Format price to rupees
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Initialize search form
function initSearchForm() {
    searchForm.className = 'search-form';
    searchForm.innerHTML = `
        <input type="text" id="search-input" placeholder="Search products...">
        <button id="search-button"><i class="fas fa-search"></i></button>
        <button id="close-search"><i class="fas fa-times"></i></button>
    `;
    searchForm.style.display = 'none';
    document.body.appendChild(searchForm);
    
    // Add event listeners
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSearchForm();
    });
    
    document.getElementById('close-search').addEventListener('click', () => {
        toggleSearchForm();
    });
    
    document.getElementById('search-button').addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
        if (searchTerm) {
            searchProducts(searchTerm);
        }
    });
    
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.trim().toLowerCase();
            if (searchTerm) {
                searchProducts(searchTerm);
            }
        }
    });
}

// Toggle search form
function toggleSearchForm() {
    if (searchForm.style.display === 'none') {
        searchForm.style.display = 'flex';
        document.getElementById('search-input').focus();
    } else {
        searchForm.style.display = 'none';
    }
}

// Search products
function searchProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    loadProducts(filteredProducts);
    toggleSearchForm();
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Load products
function loadProducts(productsToLoad = products) {
    productContainer.innerHTML = '';
    
    if (productsToLoad.length === 0) {
        productContainer.innerHTML = '<p class="no-products">No products found. Try a different search term.</p>';
        return;
    }
    
    productsToLoad.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                </div>
                <p class="price">${formatPrice(product.price)}</p>
            </a>
            <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
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

// Add to cart function
function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (product) {
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
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                // Create a simplified product object to avoid circular references
                const productToAdd = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    quantity: 1
                };
                cart.push(productToAdd);
            }
            
            // Save cart to localStorage (use both keys for compatibility)
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('shopping-cart', JSON.stringify(cart));
            
            console.log("Cart updated:", cart);
            
            // Update cart count in UI
            updateCartCount();
            
            // Show notification
            showNotification(`${product.name} added to cart!`);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        showNotification("Error adding to cart. Please try again.");
    }
}

// Update cart count
function updateCartCount() {
    // Get cart from localStorage to ensure we have the latest data
    let cart = [];
    try {
        const savedCart = localStorage.getItem('cart') || localStorage.getItem('shopping-cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            if (!Array.isArray(cart)) {
                cart = [];
            }
        }
    } catch (e) {
        console.error("Error getting cart for count update:", e);
        cart = [];
    }
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart') || localStorage.getItem('shopping-cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            if (!Array.isArray(cart)) {
                console.error("Invalid cart format when loading, resetting cart");
                cart = [];
                saveCart();
            }
            updateCartCount();
        }
    } catch (error) {
        console.error("Error loading cart:", error);
        cart = [];
        saveCart();
    }
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

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    .search-form {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        padding: 1rem;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .search-form input {
        width: 70%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px 0 0 5px;
        font-size: 1rem;
    }
    
    .search-form button {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
    
    .search-form #search-button {
        border-radius: 0 5px 5px 0;
    }
    
    .search-form #close-search {
        margin-left: 0.5rem;
        border-radius: 5px;
        background-color: #e74c3c;
    }
    
    .product-rating {
        color: #f39c12;
        margin: 0.5rem 0;
    }
    
    .product-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    
    .no-products {
        text-align: center;
        padding: 2rem;
        font-size: 1.2rem;
        color: #7f8c8d;
    }
`;
document.head.appendChild(style);

// Add styles for product cards
const productStyles = document.createElement('style');
productStyles.textContent = `
    .product-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .product-card:hover {
        transform: translateY(-5px);
    }

    .product-card img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .product-card h3 {
        margin: 0.5rem 0;
        font-size: 1.1rem;
        min-height: 2.4em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .price {
        color: #2c3e50;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0.5rem 0;
    }

    .add-to-cart {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: 100%;
        margin-top: auto;
    }

    .add-to-cart:hover {
        background: #2980b9;
    }

    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
        padding: 2rem;
    }
`;
document.head.appendChild(productStyles);

// Initialize cart in localStorage if it doesn't exist
function initializeCart() {
    // Check if cart exists in localStorage
    if (!localStorage.getItem('cart') && !localStorage.getItem('shopping-cart')) {
        // Create empty cart
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('shopping-cart', JSON.stringify([]));
        console.log('Cart initialized in localStorage');
    }
}

// Update cart count in the header
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart') || localStorage.getItem('shopping-cart') || '[]');
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = itemCount;
    }
}

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initializeCart();
    
    // Update cart count
    updateCartCount();
    
    // Load products
    loadProducts();
    
    // Load cart data
    loadCart();
    
    // Initialize search form
    initSearchForm();
    
    // Add event listener to cart icon
    const cartLink = document.querySelector('.fa-shopping-cart').parentElement;
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }
    
    // Add debug button for development (can be removed in production)
    addDebugButton();
});

// Add debug button for development
function addDebugButton() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const debugContainer = document.createElement('div');
    debugContainer.style.padding = '20px';
    debugContainer.style.textAlign = 'center';
    debugContainer.style.marginTop = '20px';
    
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug Cart';
    debugButton.style.padding = '10px 20px';
    debugButton.style.backgroundColor = '#f1f1f1';
    debugButton.style.border = '1px solid #ddd';
    debugButton.style.borderRadius = '4px';
    debugButton.style.cursor = 'pointer';
    debugButton.style.marginRight = '10px';
    
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
    
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Cart';
    resetButton.style.padding = '10px 20px';
    resetButton.style.backgroundColor = '#ffdddd';
    resetButton.style.border = '1px solid #ffaaaa';
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your cart? This will remove all items.')) {
            localStorage.setItem('cart', JSON.stringify([]));
            localStorage.setItem('shopping-cart', JSON.stringify([]));
            updateCartCount();
            alert('Cart has been reset.');
        }
    });
    
    debugContainer.appendChild(debugButton);
    debugContainer.appendChild(resetButton);
    
    footer.appendChild(debugContainer);
} 