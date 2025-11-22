from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS
import json
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'amazon-clone-secret-key-2023'
CORS(app)

# Dummy Products Database
PRODUCTS = [
    {
        "id": 1,
        "name": "Apple iPhone 15 Pro Max",
        "price": 1199.99,
        "original_price": 1299.99,
        "rating": 4.7,
        "reviews": 12543,
        "image": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400",
        "category": "Electronics",
        "prime": True,
        "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 2,
        "name": "Samsung 55\" 4K Smart TV",
        "price": 549.99,
        "original_price": 799.99,
        "rating": 4.5,
        "reviews": 8932,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
        "category": "Electronics",
        "prime": True,
        "description": "Crystal UHD 4K Smart TV with HDR and built-in streaming apps",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 3,
        "name": "Sony WH-1000XM5 Headphones",
        "price": 349.99,
        "original_price": 399.99,
        "rating": 4.8,
        "reviews": 15234,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "category": "Electronics",
        "prime": True,
        "description": "Industry-leading noise canceling wireless headphones",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 4,
        "name": "Amazon Echo Dot (5th Gen)",
        "price": 49.99,
        "original_price": 59.99,
        "rating": 4.6,
        "reviews": 45621,
        "image": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400",
        "category": "Smart Home",
        "prime": True,
        "description": "Smart speaker with Alexa and improved sound quality",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 5,
        "name": "Kindle Paperwhite (16 GB)",
        "price": 139.99,
        "original_price": 159.99,
        "rating": 4.7,
        "reviews": 23456,
        "image": "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400",
        "category": "Electronics",
        "prime": True,
        "description": "Waterproof e-reader with 6.8\" display and adjustable warm light",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 6,
        "name": "Apple MacBook Air M2",
        "price": 1099.99,
        "original_price": 1199.99,
        "rating": 4.9,
        "reviews": 8765,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        "category": "Computers",
        "prime": True,
        "description": "Lightweight laptop with M2 chip, 13.6\" Liquid Retina display",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 7,
        "name": "Instant Pot Duo 7-in-1",
        "price": 89.99,
        "original_price": 129.99,
        "rating": 4.7,
        "reviews": 89543,
        "image": "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400",
        "category": "Home & Kitchen",
        "prime": True,
        "description": "Electric pressure cooker with 7 cooking functions",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 8,
        "name": "Nike Air Max 270",
        "price": 149.99,
        "original_price": 169.99,
        "rating": 4.6,
        "reviews": 12876,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "category": "Fashion",
        "prime": True,
        "description": "Men's running shoes with Air cushioning technology",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 9,
        "name": "Fitbit Charge 6",
        "price": 159.99,
        "original_price": 179.99,
        "rating": 4.5,
        "reviews": 6543,
        "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
        "category": "Electronics",
        "prime": True,
        "description": "Advanced fitness tracker with heart rate monitoring and GPS",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 10,
        "name": "Ninja Air Fryer",
        "price": 119.99,
        "original_price": 149.99,
        "rating": 4.8,
        "reviews": 34567,
        "image": "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400",
        "category": "Home & Kitchen",
        "prime": True,
        "description": "6-quart air fryer with 6-in-1 functionality",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 11,
        "name": "Canon EOS R50 Camera",
        "price": 679.99,
        "original_price": 749.99,
        "rating": 4.7,
        "reviews": 3421,
        "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
        "category": "Electronics",
        "prime": True,
        "description": "Mirrorless camera with 24.2MP sensor and 4K video",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 12,
        "name": "Levi's 501 Original Jeans",
        "price": 69.99,
        "original_price": 89.99,
        "rating": 4.5,
        "reviews": 23456,
        "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        "category": "Fashion",
        "prime": True,
        "description": "Classic straight-leg jeans in various colors",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 13,
        "name": "Dyson V15 Detect Vacuum",
        "price": 649.99,
        "original_price": 749.99,
        "rating": 4.6,
        "reviews": 5432,
        "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
        "category": "Home & Kitchen",
        "prime": True,
        "description": "Cordless vacuum with laser dust detection",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 14,
        "name": "PlayStation 5 Console",
        "price": 499.99,
        "original_price": 499.99,
        "rating": 4.9,
        "reviews": 67890,
        "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
        "category": "Gaming",
        "prime": True,
        "description": "Next-gen gaming console with 825GB SSD",
        "delivery": "FREE delivery Tomorrow"
    },
    {
        "id": 15,
        "name": "Keurig K-Elite Coffee Maker",
        "price": 129.99,
        "original_price": 169.99,
        "rating": 4.6,
        "reviews": 19876,
        "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
        "category": "Home & Kitchen",
        "prime": True,
        "description": "Single-serve K-Cup pod coffee maker",
        "delivery": "FREE delivery Tomorrow"
    }
]

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    return render_template('product.html', product_id=product_id)

# API Endpoints
@app.route('/api/products')
def get_products():
    category = request.args.get('category')
    search = request.args.get('search', '').lower()
    
    filtered_products = PRODUCTS
    
    if category:
        filtered_products = [p for p in filtered_products if p['category'] == category]
    
    if search:
        filtered_products = [p for p in filtered_products if search in p['name'].lower() or search in p['description'].lower()]
    
    return jsonify(filtered_products)

@app.route('/api/products/<int:product_id>')
def get_product(product_id):
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/cart', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_cart():
    if 'cart' not in session:
        session['cart'] = []
    
    if request.method == 'GET':
        cart_items = []
        for item in session['cart']:
            product = next((p for p in PRODUCTS if p['id'] == item['product_id']), None)
            if product:
                cart_item = product.copy()
                cart_item['quantity'] = item['quantity']
                cart_items.append(cart_item)
        return jsonify(cart_items)
    
    elif request.method == 'POST':
        data = request.json
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        cart = session['cart']
        existing_item = next((item for item in cart if item['product_id'] == product_id), None)
        
        if existing_item:
            existing_item['quantity'] += quantity
        else:
            cart.append({'product_id': product_id, 'quantity': quantity})
        
        session['cart'] = cart
        session.modified = True
        return jsonify({'success': True, 'cart_count': len(cart)})
    
    elif request.method == 'PUT':
        data = request.json
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        
        cart = session['cart']
        item = next((item for item in cart if item['product_id'] == product_id), None)
        
        if item:
            if quantity <= 0:
                cart.remove(item)
            else:
                item['quantity'] = quantity
            session['cart'] = cart
            session.modified = True
            return jsonify({'success': True})
        return jsonify({'error': 'Item not found'}), 404
    
    elif request.method == 'DELETE':
        product_id = request.json.get('product_id')
        cart = session['cart']
        cart = [item for item in cart if item['product_id'] != product_id]
        session['cart'] = cart
        session.modified = True
        return jsonify({'success': True})

@app.route('/api/categories')
def get_categories():
    categories = list(set(p['category'] for p in PRODUCTS))
    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

