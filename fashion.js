// Fashion products data
const fashionProducts = [
    {
        id: 1,
        name: "Men's Classic Fit Shirt",
        price: 4199,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60",
        category: "men",
        description: "A timeless classic fit shirt perfect for any occasion.",
        details: {
            material: "100% Cotton",
            care: "Machine wash cold",
            fit: "Classic fit"
        },
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 2,
        name: "Women's Summer Dress",
        price: 4999,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=60",
        category: "women",
        description: "A beautiful floral summer dress for casual outings.",
        details: {
            material: "Polyester blend",
            care: "Hand wash cold",
            fit: "A-line"
        },
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Leather Crossbody Bag",
        price: 6699,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60",
        category: "accessories",
        description: "Stylish leather crossbody bag with multiple compartments.",
        details: {
            material: "Genuine leather",
            care: "Clean with leather conditioner",
            dimensions: "10\" x 8\" x 2\""
        }
    },
    {
        id: 4,
        name: "Men's Casual Sneakers",
        price: 5899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        category: "footwear",
        description: "Comfortable and stylish sneakers for everyday wear.",
        details: {
            material: "Canvas and rubber",
            care: "Spot clean",
            sole: "Rubber"
        },
        sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
        id: 5,
        name: "Women's Blazer",
        price: 7499,
        image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500&auto=format&fit=crop&q=60",
        category: "women",
        description: "Professional blazer perfect for office wear.",
        details: {
            material: "Wool blend",
            care: "Dry clean only",
            fit: "Tailored"
        },
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "Men's Denim Jacket",
        price: 6699,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&fit=crop&q=60",
        category: "men",
        description: "Classic denim jacket with modern styling.",
        details: {
            material: "100% Denim",
            care: "Machine wash cold",
            fit: "Regular fit"
        },
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 7,
        name: "Women's Ankle Boots",
        price: 8499,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60",
        category: "footwear",
        description: "Stylish ankle boots with a comfortable heel.",
        details: {
            material: "Synthetic leather",
            care: "Wipe clean",
            heel: "2.5 inches"
        },
        sizes: ["5", "6", "7", "8", "9", "10"]
    },
    {
        id: 8,
        name: "Leather Belt",
        price: 3399,
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583f1?w=500&auto=format&fit=crop&q=60",
        category: "accessories",
        description: "Classic leather belt with silver buckle.",
        details: {
            material: "Genuine leather",
            care: "Clean with leather conditioner",
            width: "1.5 inches"
        },
        sizes: ["S", "M", "L"]
    },
    {
        id: 9,
        name: "Men's Polo Shirt",
        price: 2999,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60",
        category: "men",
        description: "Classic polo shirt in a comfortable cotton blend.",
        details: {
            material: "Cotton blend",
            care: "Machine wash cold",
            fit: "Regular fit"
        },
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 10,
        name: "Women's Cardigan",
        price: 3799,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60",
        category: "women",
        description: "Soft and cozy cardigan for layering.",
        details: {
            material: "Cotton blend",
            care: "Machine wash cold",
            fit: "Oversized"
        },
        sizes: ["S", "M", "L", "XL"]
    }
];

// DOM Elements
const fashionContainer = document.getElementById('fashion-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'fashion-card';
    
    let sizeSelector = '';
    if (product.sizes) {
        sizeSelector = `
            <div class="size-selector">
                <label for="size-${product.id}">Size:</label>
                <select id="size-${product.id}" required>
                    <option value="">Select Size</option>
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
            </div>
        `;
    }

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="fashion-info">
            <h3>${product.name}</h3>
            <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
            <p class="description">${product.description}</p>
            <ul class="details">
                ${Object.entries(product.details).map(([key, value]) => 
                    `<li><i class="fas fa-check"></i>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</li>`
                ).join('')}
            </ul>
            ${sizeSelector}
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Display products
function displayProducts(products) {
    fashionContainer.innerHTML = '';
    products.forEach(product => {
        fashionContainer.appendChild(createProductCard(product));
    });
}

// Filter products
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? fashionProducts 
        : fashionProducts.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts(fashionProducts);
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;

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
    fashionContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = fashionProducts.find(p => p.id === productId);
            
            // Get selected size if applicable
            let size = null;
            if (product.sizes) {
                const sizeSelect = document.getElementById(`size-${productId}`);
                if (sizeSelect && sizeSelect.value) {
                    size = sizeSelect.value;
                } else {
                    alert('Please select a size');
                    return;
                }
            }

            // Get existing cart or initialize empty array
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add product to cart with size if applicable
            cart.push({
                ...product,
                size: size
            });
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            cartCount.textContent = cart.length;
            
            // Show success message
            alert('Product added to cart!');
        }
    });
}); 