# Quick Start Guide - Amazon Clone

## 🚀 Get Started in 3 Steps

### Step 1: Install Python Dependencies
Open your terminal in the project directory and run:

```bash
pip install -r requirements.txt
```

### Step 2: Start the Server
Run the Flask application:

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Step 3: Open in Browser
Visit: **http://localhost:5000**

## 🎯 What You'll See

### Home Page (http://localhost:5000)
- Amazon-style header with logo, search bar, and cart
- Category navigation bar
- Hero banner
- Product category cards
- Grid of 15 products with prices, ratings, and "Add to Cart" buttons

### Product Details Page
- Click any product to see full details
- Detailed pricing information
- Product description and features
- Quantity selector
- "Add to Cart" and "Buy Now" buttons

### Shopping Cart (http://localhost:5000/cart)
- View all items in your cart
- Update quantities (1-10)
- Remove items
- See subtotal calculations
- Proceed to checkout (demo)

## 🔥 Features to Try

1. **Search Products**: Use the search bar to find items (try "iPhone" or "camera")
2. **Filter by Category**: Select a category from the dropdown
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon in the header
5. **Update Quantities**: Change item quantities in the cart
6. **Product Details**: Click any product for detailed information

## 📱 Responsive Design

Try resizing your browser or open on mobile devices - the site adapts to all screen sizes!

## 🛠️ Troubleshooting

### Port Already in Use?
If port 5000 is busy, modify `app.py`:
```python
app.run(debug=True, port=5001)  # Change to any available port
```

### Module Not Found Error?
Make sure you installed dependencies:
```bash
pip install Flask Flask-Cors
```

### Images Not Loading?
The site uses Unsplash images. Make sure you have an internet connection.

## 🎨 Customization

### Add More Products
Edit `app.py` and add items to the `PRODUCTS` list:
```python
{
    "id": 16,
    "name": "Your Product Name",
    "price": 99.99,
    "original_price": 129.99,
    "rating": 4.5,
    "reviews": 1000,
    "image": "image-url",
    "category": "Category",
    "prime": True,
    "description": "Description here",
    "delivery": "FREE delivery Tomorrow"
}
```

### Change Colors
Edit `static/css/style.css` to customize the color scheme

### Modify Layout
Edit HTML templates in the `templates/` folder

## 📊 Project Structure Quick Reference

```
Amazon Clone/
├── app.py              # Backend server & API
├── requirements.txt    # Python dependencies
├── templates/          # HTML pages
│   ├── index.html     # Home page
│   ├── cart.html      # Cart page
│   └── product.html   # Product details
└── static/             # Frontend assets
    ├── css/
    │   └── style.css  # All styling
    └── js/
        ├── main.js    # Home page logic
        ├── cart.js    # Cart functionality
        └── product.js # Product page logic
```

## 🌟 API Endpoints for Testing

You can test the API directly:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl http://localhost:5000/api/products?category=Electronics

# Search products
curl http://localhost:5000/api/products?search=phone

# Get single product
curl http://localhost:5000/api/products/1
```

## 💡 Tips

- The cart is stored in Flask sessions (server-side)
- Sessions persist during your browser session
- Refresh the page to see your cart count update
- All products are dummy data for demonstration

## ✅ Success!

If you can see the Amazon-style homepage with products, you're all set! 🎉

Enjoy exploring your Amazon clone!

---

Need help? Check the full README.md for detailed documentation.

