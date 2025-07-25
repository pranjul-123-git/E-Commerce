// Home & Living products data
const homeProducts = [
    {
        id: 1,
        name: "Modern Sofa Set",
        price: 74999,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60",
        category: "furniture",
        description: "Contemporary 3-seater sofa with matching armchairs.",
        details: {
            material: "Premium fabric and wood",
            dimensions: "84\" W x 35\" D x 31\" H",
            assembly: "Professional assembly required"
        },
        colors: ["Gray", "Beige", "Navy"]
    },
    {
        id: 2,
        name: "Ceramic Vase Set",
        price: 4199,
        image: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=500&auto=format&fit=crop&q=60",
        category: "decor",
        description: "Set of 3 handcrafted ceramic vases in different sizes.",
        details: {
            material: "Ceramic",
            care: "Hand wash only",
            dimensions: "12\", 9\", 6\" heights"
        },
        colors: ["White", "Blue", "Green"]
    },
    {
        id: 3,
        name: "Stainless Steel Cookware Set",
        price: 16999,
        image: "https://images.unsplash.com/photo-1584990347449-a2d4c2c8c1e9?w=500&auto=format&fit=crop&q=60",
        category: "kitchen",
        description: "10-piece professional cookware set with non-stick coating.",
        details: {
            material: "Stainless steel",
            pieces: "10 pieces",
            care: "Dishwasher safe"
        }
    },
    {
        id: 4,
        name: "Floor Lamp",
        price: 6999,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
        category: "lighting",
        description: "Modern floor lamp with adjustable head and LED bulb.",
        details: {
            material: "Metal and fabric",
            height: "65 inches",
            bulb: "LED included"
        },
        colors: ["Black", "White", "Gold"]
    },
    {
        id: 5,
        name: "Coffee Table",
        price: 12499,
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26f?w=500&auto=format&fit=crop&q=60",
        category: "furniture",
        description: "Wooden coffee table with storage shelf.",
        details: {
            material: "Solid wood",
            dimensions: "48\" W x 24\" D x 18\" H",
            assembly: "Required"
        },
        colors: ["Walnut", "Oak", "Mahogany"]
    },
    {
        id: 6,
        name: "Wall Art Set",
        price: 7499,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60",
        category: "decor",
        description: "Set of 3 abstract canvas wall art pieces.",
        details: {
            material: "Canvas and wood frame",
            dimensions: "24\" x 36\" each",
            mounting: "Hardware included"
        }
    },
    {
        id: 7,
        name: "Kitchen Knife Set",
        price: 10999,
        image: "https://images.unsplash.com/photo-1593532847203-9d777bc1c1a3?w=500&auto=format&fit=crop&q=60",
        category: "kitchen",
        description: "Professional 8-piece knife set with block.",
        details: {
            material: "High-carbon steel",
            pieces: "8 knives",
            care: "Hand wash only"
        }
    },
    {
        id: 8,
        name: "Pendant Light",
        price: 4999,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
        category: "lighting",
        description: "Modern pendant light with glass shade.",
        details: {
            material: "Metal and glass",
            height: "24 inches",
            bulb: "LED compatible"
        },
        colors: ["Black", "White", "Brass"]
    },
    {
        id: 9,
        name: "Dining Table Set",
        price: 58999,
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&auto=format&fit=crop&q=60",
        category: "furniture",
        description: "6-seater dining table with chairs.",
        details: {
            material: "Wood and fabric",
            dimensions: "72\" W x 36\" D x 30\" H",
            assembly: "Professional assembly required"
        },
        colors: ["Walnut", "Oak", "Mahogany"]
    },
    {
        id: 10,
        name: "Throw Pillow Set",
        price: 3499,
        image: "https://images.unsplash.com/photo-1584100936595-c0655b3a6c8d?w=500&auto=format&fit=crop&q=60",
        category: "decor",
        description: "Set of 4 decorative throw pillows.",
        details: {
            material: "Cotton and polyester",
            size: "18\" x 18\"",
            care: "Machine washable"
        },
        colors: ["Gray", "Blue", "Beige"]
    }
];

// DOM Elements
const homeContainer = document.getElementById('home-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'home-card';
    
    let colorSelector = '';
    if (product.colors) {
        colorSelector = `
            <div class="color-selector">
                <label for="color-${product.id}">Color:</label>
                <select id="color-${product.id}" required>
                    <option value="">Select Color</option>
                    ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="image-container">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="home-info">
            <h3>${product.name}</h3>
            <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
            <p class="description">${product.description}</p>
            <ul class="details">
                ${Object.entries(product.details).map(([key, value]) => 
                    `<li><i class="fas fa-check"></i>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</li>`
                ).join('')}
            </ul>
            ${colorSelector}
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Display products
function displayProducts(products) {
    homeContainer.innerHTML = '';
    products.forEach(product => {
        homeContainer.appendChild(createProductCard(product));
    });
}

// Filter products
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? homeProducts 
        : homeProducts.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts(homeProducts);
    
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
    homeContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = homeProducts.find(p => p.id === productId);
            
            // Get selected color if applicable
            let color = null;
            if (product.colors) {
                const colorSelect = document.getElementById(`color-${productId}`);
                if (colorSelect && colorSelect.value) {
                    color = colorSelect.value;
                } else {
                    alert('Please select a color');
                    return;
                }
            }

            // Get existing cart or initialize empty array
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add product to cart with color if applicable
            cart.push({
                ...product,
                color: color
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