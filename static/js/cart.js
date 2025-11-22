// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
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

// Load cart items
async function loadCart() {
    try {
        const response = await fetch('/api/cart');
        const cartItems = await response.json();

        if (cartItems.length === 0) {
            document.getElementById('cartItems').style.display = 'none';
            document.getElementById('emptyCart').style.display = 'block';
            document.querySelector('.cart-sidebar').style.display = 'none';
            return;
        }

        displayCartItems(cartItems);
        updateCartSummary(cartItems);
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Display cart items
function displayCartItems(items) {
    const cartItemsContainer = document.getElementById('cartItems');
    
    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item">
            <div>
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/180'">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <p class="item-stock">In Stock</p>
                ${item.prime ? '<p class="prime-badge"><i class="fas fa-bolt"></i> Eligible for FREE Shipping</p>' : ''}
                <div class="cart-item-actions">
                    <select onchange="updateQuantity(${item.id}, this.value)">
                        ${generateQuantityOptions(item.quantity)}
                    </select>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>
            <div class="cart-item-price">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Generate quantity options
function generateQuantityOptions(currentQuantity) {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}" ${i === currentQuantity ? 'selected' : ''}>Qty: ${i}</option>`;
    }
    return options;
}

// Update cart summary
function updateCartSummary(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('itemCount').textContent = itemCount;
    document.getElementById('subtotalAmount').textContent = `$${subtotal.toFixed(2)}`;
}

// Update item quantity
async function updateQuantity(productId, quantity) {
    try {
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: parseInt(quantity)
            })
        });

        const result = await response.json();
        
        if (result.success) {
            loadCart();
            updateCartCount();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        alert('Error updating quantity. Please try again.');
    }
}

// Delete item from cart
async function deleteItem(productId) {
    if (!confirm('Are you sure you want to remove this item from your cart?')) {
        return;
    }

    try {
        const response = await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId
            })
        });

        const result = await response.json();
        
        if (result.success) {
            loadCart();
            updateCartCount();
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
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

// Checkout function
function checkout() {
    alert('Thank you for shopping with Amazon Clone! This is a demo, so no actual payment will be processed.');
    
    // Clear the cart (in a real app, this would redirect to checkout)
    fetch('/api/cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product_id: null // Special case to clear entire cart
        })
    }).then(() => {
        window.location.href = '/';
    });
}

