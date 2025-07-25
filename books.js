// Books data
const books = [
    {
        id: 1,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 499,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60",
        category: "fiction",
        description: "A classic novel about the American Dream and the Roaring Twenties.",
        details: {
            pages: "180 pages",
            language: "English",
            publisher: "Scribner"
        },
        formats: ["Hardcover", "Paperback", "E-Book"]
    },
    {
        id: 2,
        name: "Atomic Habits",
        author: "James Clear",
        price: 599,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60",
        category: "self-help",
        description: "Learn how to build good habits and break bad ones.",
        details: {
            pages: "320 pages",
            language: "English",
            publisher: "Avery"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 3,
        name: "Sapiens",
        author: "Yuval Noah Harari",
        price: 799,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60",
        category: "non-fiction",
        description: "A brief history of humankind from ancient humans to the present.",
        details: {
            pages: "464 pages",
            language: "English",
            publisher: "Harper"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 4,
        name: "Steve Jobs",
        author: "Walter Isaacson",
        price: 899,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
        category: "biography",
        description: "The authorized biography of Apple's co-founder.",
        details: {
            pages: "656 pages",
            language: "English",
            publisher: "Simon & Schuster"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 5,
        name: "1984",
        author: "George Orwell",
        price: 399,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60",
        category: "fiction",
        description: "A dystopian novel set in a totalitarian society.",
        details: {
            pages: "328 pages",
            language: "English",
            publisher: "Signet Classic"
        },
        formats: ["Hardcover", "Paperback", "E-Book"]
    },
    {
        id: 6,
        name: "The Psychology of Money",
        author: "Morgan Housel",
        price: 549,
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=60",
        category: "non-fiction",
        description: "Timeless lessons on wealth, greed, and happiness.",
        details: {
            pages: "256 pages",
            language: "English",
            publisher: "Harriman House"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 7,
        name: "The Alchemist",
        author: "Paulo Coelho",
        price: 449,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60",
        category: "fiction",
        description: "A philosophical novel about following your dreams.",
        details: {
            pages: "208 pages",
            language: "English",
            publisher: "HarperOne"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 8,
        name: "Think Like a Monk",
        author: "Jay Shetty",
        price: 699,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60",
        category: "self-help",
        description: "Train your mind for peace and purpose every day.",
        details: {
            pages: "352 pages",
            language: "English",
            publisher: "Simon & Schuster"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 9,
        name: "Elon Musk",
        author: "Walter Isaacson",
        price: 849,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60",
        category: "biography",
        description: "The biography of the controversial tech entrepreneur.",
        details: {
            pages: "688 pages",
            language: "English",
            publisher: "Simon & Schuster"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    },
    {
        id: 10,
        name: "The Midnight Library",
        author: "Matt Haig",
        price: 499,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60",
        category: "fiction",
        description: "A novel about infinite possibilities and the choices that define us.",
        details: {
            pages: "304 pages",
            language: "English",
            publisher: "Viking"
        },
        formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"]
    }
];

// DOM Elements
const booksContainer = document.getElementById('books-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create book card
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    const formatSelector = `
        <div class="format-selector">
            <label for="format-${book.id}">Format:</label>
            <select id="format-${book.id}" required>
                <option value="">Select Format</option>
                ${book.formats.map(format => `<option value="${format}">${format}</option>`).join('')}
            </select>
        </div>
    `;

    card.innerHTML = `
        <div class="image-container">
            <img src="${book.image}" alt="${book.name}">
        </div>
        <div class="book-info">
            <h3>${book.name}</h3>
            <div class="author">by ${book.author}</div>
            <div class="price">₹${book.price.toLocaleString('en-IN')}</div>
            <p class="description">${book.description}</p>
            <ul class="details">
                ${Object.entries(book.details).map(([key, value]) => 
                    `<li><i class="fas fa-check"></i>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</li>`
                ).join('')}
            </ul>
            ${formatSelector}
            <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Display books
function displayBooks(books) {
    booksContainer.innerHTML = '';
    books.forEach(book => {
        booksContainer.appendChild(createBookCard(book));
    });
}

// Filter books
function filterBooks(category) {
    const filteredBooks = category === 'all' 
        ? books 
        : books.filter(book => book.category === category);
    displayBooks(filteredBooks);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Display all books initially
    displayBooks(books);
    
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
            // Filter books
            filterBooks(button.dataset.category);
        });
    });

    // Add to cart functionality
    booksContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const bookId = parseInt(e.target.dataset.id);
            const book = books.find(b => b.id === bookId);
            
            // Get selected format
            const formatSelect = document.getElementById(`format-${bookId}`);
            if (formatSelect && formatSelect.value) {
                const format = formatSelect.value;
                
                // Get existing cart or initialize empty array
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Add book to cart with format
                cart.push({
                    ...book,
                    format: format
                });
                
                // Save updated cart
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart count
                cartCount.textContent = cart.length;
                
                // Show success message
                alert('Book added to cart!');
            } else {
                alert('Please select a format');
            }
        }
    });
}); 