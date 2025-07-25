// Electronics products data
const electronicsProducts = [
    {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        price: 16599,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        category: "audio",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
        features: [
            "Active Noise Cancellation",
            "30-hour Battery Life",
            "Bluetooth 5.0",
            "Built-in Microphone"
        ]
    },
    {
        id: 2,
        name: "Gaming Laptop",
        price: 107999,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60",
        category: "computing",
        description: "High-performance gaming laptop with RTX graphics and 16GB RAM.",
        features: [
            "RTX 3060 Graphics",
            "16GB RAM",
            "512GB SSD",
            "144Hz Display"
        ]
    },
    {
        id: 3,
        name: "Smartphone Pro",
        price: 74699,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
        category: "mobile",
        description: "Latest smartphone with advanced camera system and 5G connectivity.",
        features: [
            "Triple Camera System",
            "5G Connectivity",
            "128GB Storage",
            "6.7-inch Display"
        ]
    },
    {
        id: 4,
        name: "Gaming Console",
        price: 41499,
        image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&auto=format&fit=crop&q=60",
        category: "gaming",
        description: "Next-gen gaming console with 4K gaming and ray tracing support.",
        features: [
            "4K Gaming",
            "Ray Tracing",
            "1TB Storage",
            "Backward Compatibility"
        ]
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        price: 12449,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60",
        category: "audio",
        description: "True wireless earbuds with active noise cancellation and water resistance.",
        features: [
            "Active Noise Cancellation",
            "IPX4 Water Resistance",
            "24-hour Battery Life",
            "Touch Controls"
        ]
    },
    {
        id: 6,
        name: "Ultrabook Laptop",
        price: 82999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60",
        category: "computing",
        description: "Slim and powerful ultrabook with all-day battery life.",
        features: [
            "Intel Core i7",
            "16GB RAM",
            "512GB SSD",
            "14-inch 4K Display"
        ]
    },
    {
        id: 7,
        name: "Smart Watch",
        price: 24899,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
        category: "mobile",
        description: "Advanced smartwatch with health monitoring and fitness tracking.",
        features: [
            "Heart Rate Monitor",
            "GPS Tracking",
            "Water Resistant",
            "7-day Battery Life"
        ]
    },
    {
        id: 8,
        name: "Gaming Headset",
        price: 6639,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60",
        category: "gaming",
        description: "Immersive gaming headset with 7.1 surround sound.",
        features: [
            "7.1 Surround Sound",
            "Noise-cancelling Mic",
            "RGB Lighting",
            "Memory Foam Earpads"
        ]
    }
];

// DOM Elements
const electronicsContainer = document.getElementById('electronics-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'electronics-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="electronics-info">
            <h3>${product.name}</h3>
            <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
            <p class="description">${product.description}</p>
            <ul class="features">
                ${product.features.map(feature => `
                    <li><i class="fas fa-check"></i>${feature}</li>
                `).join('')}
            </ul>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

// Function to display products
function displayProducts(products) {
    electronicsContainer.innerHTML = '';
    products.forEach(product => {
        electronicsContainer.appendChild(createProductCard(product));
    });
}

// Function to filter products
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(electronicsProducts);
    } else {
        const filteredProducts = electronicsProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts(electronicsProducts);

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter products
            filterProducts(button.dataset.category);
        });
    });

    // Add to cart functionality
    electronicsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = electronicsProducts.find(p => p.id === productId);
            
            // Get existing cart items
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add item to cart
            cart.push(product);
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = cart.length;
            
            // Show success message
            alert('Product added to cart!');
        }
    });
}); 