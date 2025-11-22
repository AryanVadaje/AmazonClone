// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Cart button
    document.getElementById('cartButton').addEventListener('click', function() {
        window.location.href = '/cart';
    });

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    // Category filter
    document.getElementById('searchCategory').addEventListener('change', searchProducts);
}

// Load products from API
async function loadProducts() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || document.getElementById('searchCategory').value;
        const search = urlParams.get('search') || document.getElementById('searchInput').value;

        let url = '/api/products?';
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}&`;

        const response = await fetch(url);
        const products = await response.json();

        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productsGrid').innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Display products in grid
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">No products found.</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/250'">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="reviews">${product.reviews.toLocaleString()}</span>
            </div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                ${product.original_price ? `<span class="original-price">$${product.original_price.toFixed(2)}</span>` : ''}
            </div>
            ${product.prime ? '<div class="prime-badge"><i class="fas fa-bolt"></i> Prime</div>' : ''}
            <div class="delivery-info">${product.delivery}</div>
            <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// View product details
function viewProduct(productId) {
    window.location.href = `/product/${productId}`;
}

// Add product to cart
async function addToCart(productId) {
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: 1
            })
        });

        const result = await response.json();
        
        if (result.success) {
            updateCartCount();
            showSuccessMessage('Added to cart!');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart. Please try again.');
    }
}

// Update cart count in header
async function updateCartCount() {
    try {
        const response = await fetch('/api/cart');
        const cartItems = await response.json();
        
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = totalCount;
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Search products
function searchProducts() {
    const search = document.getElementById('searchInput').value;
    const category = document.getElementById('searchCategory').value;
    
    let url = '/?';
    if (category) url += `category=${category}&`;
    if (search) url += `search=${search}`;
    
    window.location.href = url;
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

