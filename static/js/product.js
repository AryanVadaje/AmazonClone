// Initialize product page
document.addEventListener('DOMContentLoaded', function() {
    const productId = document.getElementById('productDetails').getAttribute('data-product-id');
    loadProductDetails(productId);
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
    document.getElementById('searchBtn').addEventListener('click', function() {
        const search = document.getElementById('searchInput').value;
        const category = document.getElementById('searchCategory').value;
        
        let url = '/?';
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}`;
        
        window.location.href = url;
    });
}

// Load product details
async function loadProductDetails(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();

        if (product.error) {
            document.getElementById('productDetails').innerHTML = '<p>Product not found.</p>';
            return;
        }

        displayProductDetails(product, productId);
    } catch (error) {
        console.error('Error loading product details:', error);
        document.getElementById('productDetails').innerHTML = '<p>Error loading product. Please try again later.</p>';
    }
}

// Display product details
function displayProductDetails(product, productId) {
    const productDetails = document.getElementById('productDetails');
    
    productDetails.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400'">
        </div>
        
        <div class="product-info">
            <h1>${product.name}</h1>
            
            <div class="rating-section">
                <span class="stars">${generateStars(product.rating)}</span>
                <span>${product.rating} out of 5 stars</span>
                <span>${product.reviews.toLocaleString()} ratings</span>
            </div>
            
            <div class="price-section">
                <div class="price">$${product.price.toFixed(2)}</div>
                ${product.original_price ? `
                    <div style="color: #565959; font-size: 14px;">
                        List Price: <span style="text-decoration: line-through;">$${product.original_price.toFixed(2)}</span>
                    </div>
                    <div style="color: #b12704; font-size: 14px;">
                        You Save: $${(product.original_price - product.price).toFixed(2)} 
                        (${Math.round(((product.original_price - product.price) / product.original_price) * 100)}%)
                    </div>
                ` : ''}
                ${product.prime ? '<div class="prime-badge" style="font-size: 14px; margin-top: 10px;"><i class="fas fa-bolt"></i> Prime FREE One-Day Delivery</div>' : ''}
            </div>
            
            <div class="description">
                <h3>About this item</h3>
                <p>${product.description}</p>
                <ul>
                    <li>Premium quality construction</li>
                    <li>Latest technology and features</li>
                    <li>Customer satisfaction guaranteed</li>
                    <li>Fast and free delivery with Prime</li>
                    <li>Easy returns and exchanges</li>
                </ul>
            </div>
            
            <div style="margin-top: 20px;">
                <strong>Category:</strong> ${product.category}
            </div>
        </div>
        
        <div class="buy-box">
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="delivery">${product.delivery}</div>
            <div class="stock">In Stock</div>
            
            <label for="quantity" style="font-size: 14px; font-weight: bold; margin-bottom: 5px; display: block;">Quantity:</label>
            <select id="quantity">
                ${generateQuantityOptions()}
            </select>
            
            <button class="btn-primary" onclick="addToCart(${productId})">Add to Cart</button>
            <button class="btn-secondary" onclick="buyNow(${productId})">Buy Now</button>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e7e7e7;">
                <div style="font-size: 14px; margin-bottom: 10px;">
                    <strong>Ships from:</strong> Amazon.com
                </div>
                <div style="font-size: 14px; margin-bottom: 10px;">
                    <strong>Sold by:</strong> Amazon.com
                </div>
                <div style="font-size: 14px; margin-bottom: 10px;">
                    <i class="fas fa-undo"></i> <strong>Returns:</strong> 30-day refund/replacement
                </div>
                <div style="font-size: 14px;">
                    <i class="fas fa-shield-alt"></i> <strong>Payment:</strong> Secure transaction
                </div>
            </div>
        </div>
    `;
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

// Generate quantity options
function generateQuantityOptions() {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

// Add to cart
async function addToCart(productId) {
    const quantity = parseInt(document.getElementById('quantity').value);
    
    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: parseInt(productId),
                quantity: quantity
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

// Buy now
async function buyNow(productId) {
    await addToCart(productId);
    setTimeout(() => {
        window.location.href = '/cart';
    }, 500);
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

