# Amazon Clone - E-commerce Website

A fully functional Amazon clone built with HTML, CSS, JavaScript, and Python Flask backend. This project features a modern e-commerce interface with product browsing, shopping cart functionality, and responsive design.

## Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse 15+ dummy products across multiple categories
- **Shopping Cart**: Add/remove items, update quantities
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Search & Filter**: Search products by name or filter by category
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Amazon-like Design**: Authentic Amazon UI/UX with header, navbar, and footer
- **Product Cards**: Beautiful product displays with ratings, prices, and Prime badges
- **Rating System**: Star ratings with review counts
- **Prime Badges**: Visual indicators for Prime-eligible products
- **Interactive Cart**: Real-time cart updates with subtotal calculations

### 🔧 Technical Features
- **Flask Backend**: RESTful API endpoints for products and cart management
- **Session Management**: Server-side cart storage using Flask sessions
- **Dynamic Content**: JavaScript-powered dynamic page updates
- **API Integration**: Frontend communicates with backend via fetch API
- **Category System**: Products organized by Electronics, Fashion, Home & Kitchen, etc.

## Project Structure

```
Amazon Clone/
│
├── app.py                      # Flask backend server
├── requirements.txt            # Python dependencies
├── README.md                   # Project documentation
│
├── templates/                  # HTML templates
│   ├── index.html             # Home page
│   ├── cart.html              # Shopping cart page
│   └── product.html           # Product details page
│
└── static/                     # Static files
    ├── css/
    │   └── style.css          # Main stylesheet
    └── js/
        ├── main.js            # Home page JavaScript
        ├── cart.js            # Cart page JavaScript
        └── product.js         # Product page JavaScript
```

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Run the Application
```bash
python app.py
```

### Step 3: Open in Browser
Navigate to: `http://localhost:5000`

## Usage

### Browse Products
- Visit the home page to see all available products
- Use the search bar to find specific items
- Filter by category using the dropdown menu

### View Product Details
- Click on any product card to view detailed information
- See pricing, ratings, descriptions, and more
- Select quantity and add to cart

### Shopping Cart
- Click the cart icon in the header to view your cart
- Update quantities using the dropdown menu
- Remove items with the delete button
- See real-time subtotal calculations
- Proceed to checkout (demo only)

### API Endpoints

#### Get All Products
```
GET /api/products
Query params: ?category=Electronics&search=phone
```

#### Get Single Product
```
GET /api/products/<product_id>
```

#### Get Cart
```
GET /api/cart
```

#### Add to Cart
```
POST /api/cart
Body: {"product_id": 1, "quantity": 1}
```

#### Update Cart Item
```
PUT /api/cart
Body: {"product_id": 1, "quantity": 3}
```

#### Remove from Cart
```
DELETE /api/cart
Body: {"product_id": 1}
```

## Product Categories

- **Electronics**: Phones, TVs, Headphones, Cameras, Tablets
- **Computers**: Laptops and accessories
- **Home & Kitchen**: Appliances, Coffee makers, Vacuum cleaners
- **Fashion**: Shoes, Jeans, and apparel
- **Smart Home**: Echo devices and smart speakers
- **Gaming**: Consoles and gaming accessories

## Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Dynamic interactions and API calls
- **Font Awesome**: Icons for UI elements

### Backend
- **Python 3**: Core programming language
- **Flask**: Lightweight web framework
- **Flask-CORS**: Cross-Origin Resource Sharing support
- **Session Management**: Server-side cart storage

## Features in Detail

### Product Display
- High-quality product images from Unsplash
- Price comparisons with original price strikethrough
- Star ratings (1-5 stars with half-star support)
- Review counts from thousands of users
- Prime delivery badges
- Delivery information

### Shopping Cart
- Persistent cart using Flask sessions
- Quantity adjustments (1-10 items)
- Price calculations per item and subtotal
- Gift wrapping options
- Prime membership promotion
- Empty cart state with call-to-action

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts
- Touch-friendly buttons and controls

## Future Enhancements

- User authentication and accounts
- Payment gateway integration
- Order history and tracking
- Product reviews and ratings system
- Wishlist functionality
- Advanced filtering and sorting
- Real product database
- Admin panel for product management

## Demo Notice

This is a demonstration project. The checkout process does not handle real payments. All products and data are for illustrative purposes only.

## License

This project is for educational purposes. Amazon and all related trademarks are property of Amazon.com, Inc.

## Author

Created as a full-stack e-commerce demonstration project.

## Support

For issues or questions, please refer to the code comments or create an issue in the repository.

---

**Note**: This is a clone project for educational purposes. It is not affiliated with, authorized, maintained, sponsored, or endorsed by Amazon or any of its affiliates.

