// Global variables
let userRole = null;
let currentSection = null;
let products = [];
let currentUser = null;
let cart = [];
let selectedProduct = null;

// Kerala districts for comprehensive weather coverage
const keralaDistricts = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
  'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram',
  'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
];

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('AgroLink 360° initialized');
  loadSampleData();
  setupEventListeners();
});

// Core navigation functions
function showLogin() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function hideLogin() {
  document.getElementById('loginModal').classList.add('hidden');
}

function scrollToFeatures() {
  showNotification('🌟 Features: All 14 Kerala districts weather • Direct farmer connections • Live market prices • Secure chat • Purchase tracking • Product reviews', 'info');
}

function chooseRole(role) {
  userRole = role;
  document.getElementById('roleModal').classList.add('hidden');
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('dashboardPage').classList.remove('hidden');
  renderSidebar();
  showWelcome();
  showNotification(`Welcome to ${role} mode! 🎉`, 'success');
}

function backToRoleSelect() {
  document.getElementById('dashboardPage').classList.add('hidden');
  document.getElementById('roleModal').classList.remove('hidden');
  userRole = null;
  currentSection = null;
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  const messageElement = document.getElementById('notificationMessage');
  
  messageElement.textContent = message;
  notification.className = `notification notification-${type}`;
  notification.classList.remove('hidden');
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    closeNotification();
  }, 5000);
}

function closeNotification() {
  document.getElementById('notification').classList.add('hidden');
}

// Setup event listeners
function setupEventListeners() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const error = document.getElementById('error');

      // Enhanced password validation
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!regex.test(password)) {
        error.textContent = '⚠️ Password must be 8+ characters with 1 uppercase and 1 special character';
        return;
      }

      currentUser = { 
        username, 
        loginTime: new Date(),
        purchases: [],
        listings: []
      };
      error.textContent = '';
      hideLogin();
      document.getElementById('roleModal').classList.remove('hidden');
    });
  }
}

// Load enhanced sample data with more products
function loadSampleData() {
  products = [
    {
      id: 'p1',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 45,
      quantity: 50,
      unit: 'kg',
      farmer: 'Kumar Farm',
      location: 'Kochi, Kerala',
      contact: '9876543210',
      image: '🍅',
      dateAdded: new Date().toISOString(),
      description: 'Fresh organic tomatoes grown without pesticides. Rich in vitamins and perfect for cooking.',
      rating: 4.8,
      reviews: 24
    },
    {
      id: 'p2',
      name: 'Fresh Coconuts',
      category: 'Fruits',
      price: 30,
      quantity: 100,
      unit: 'pieces',
      farmer: 'Coastal Palms',
      location: 'Alappuzha, Kerala',
      contact: '9876543211',
      image: '🥥',
      dateAdded: new Date().toISOString(),
      description: 'Fresh tender coconuts from coastal farms. Perfect for drinking and cooking.',
      rating: 4.9,
      reviews: 18
    },
    {
      id: 'p3',
      name: 'Aromatic Rice',
      category: 'Crops',
      price: 60,
      quantity: 200,
      unit: 'kg',
      farmer: 'Paddy Fields Co.',
      location: 'Thrissur, Kerala',
      contact: '9876543212',
      image: '🌾',
      dateAdded: new Date().toISOString(),
      description: 'Premium quality aromatic rice from Kerala paddy fields. Long grain and fragrant.',
      rating: 4.7,
      reviews: 32
    },
    {
      id: 'p4',
      name: 'Green Spinach',
      category: 'Vegetables',
      price: 35,
      quantity: 25,
      unit: 'kg',
      farmer: 'Green Valley Farm',
      location: 'Wayanad, Kerala',
      contact: '9876543213',
      image: '🥬',
      dateAdded: new Date().toISOString(),
      description: 'Fresh green spinach rich in iron and vitamins. Grown in the hills of Wayanad.',
      rating: 4.6,
      reviews: 15
    },
    {
      id: 'p5',
      name: 'Ripe Mangoes',
      category: 'Fruits',
      price: 80,
      quantity: 40,
      unit: 'kg',
      farmer: 'Tropical Orchards',
      location: 'Kannur, Kerala',
      contact: '9876543214',
      image: '🥭',
      dateAdded: new Date().toISOString(),
      description: 'Sweet and juicy mangoes from Kerala. Perfect for eating fresh or making desserts.',
      rating: 4.9,
      reviews: 28
    },
    {
      id: 'p6',
      name: 'Black Pepper',
      category: 'Spices',
      price: 800,
      quantity: 10,
      unit: 'kg',
      farmer: 'Spice Gardens',
      location: 'Idukki, Kerala',
      contact: '9876543215',
      image: '🌶️',
      dateAdded: new Date().toISOString(),
      description: 'Premium Kerala black pepper. Known worldwide for its quality and flavor.',
      rating: 4.8,
      reviews: 12
    }
  ];
}

// Sidebar rendering with enhanced design
function renderSidebar() {
  const sidebarNav = document.getElementById('sidebarNav');
  const sidebarTitle = document.getElementById('sidebarTitle');
  
  if (userRole === 'farmer') {
    sidebarTitle.innerHTML = '🧑‍🌾 Farmer Dashboard';
    sidebarNav.innerHTML = `
      <button class="nav-item" onclick="showSection('weather')">
        <span class="nav-icon">🌦️</span> Weather Updates
      </button>
      <button class="nav-item" onclick="showSection('sell')">
        <span class="nav-icon">📦</span> Sell Products
      </button>
      <button class="nav-item" onclick="showSection('myProducts')">
        <span class="nav-icon">📋</span> My Products
      </button>
      <button class="nav-item" onclick="showSection('marketPrices')">
        <span class="nav-icon">💹</span> Market Prices
      </button>
      <button class="nav-item back" onclick="backToRoleSelect()">
        <span class="nav-icon">⬅️</span> Change Mode
      </button>
    `;
  } else if (userRole === 'buyer') {
    sidebarTitle.innerHTML = '🛒 Buyer Dashboard';
    sidebarNav.innerHTML = `
      <button class="nav-item" onclick="showSection('browse')">
        <span class="nav-icon">🔍</span> Browse All
      </button>
      <button class="nav-item" onclick="showSection('vegetables')">
        <span class="nav-icon">🥕</span> Vegetables
      </button>
      <button class="nav-item" onclick="showSection('fruits')">
        <span class="nav-icon">🍎</span> Fruits
      </button>
      <button class="nav-item" onclick="showSection('crops')">
        <span class="nav-icon">🌾</span> Crops
      </button>
      <button class="nav-item" onclick="showSection('spices')">
        <span class="nav-icon">🌶️</span> Spices
      </button>
      <button class="nav-item" onclick="showSection('chat')">
        <span class="nav-icon">💬</span> Chat Room
      </button>
      <button class="nav-item back" onclick="backToRoleSelect()">
        <span class="nav-icon">⬅️</span> Change Mode
      </button>
    `;
  }
}

// Show welcome screen with enhanced visuals
function showWelcome() {
  updateActiveNav(null);
  const mainContent = document.getElementById('mainContent');
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');

  if (userRole === 'farmer') {
    contentTitle.innerHTML = '🧑‍🌾 Welcome, Farmer!';
    contentSubtitle.innerHTML = 'Manage your farm operations with our comprehensive tools';
    mainContent.innerHTML = `
      <div class="content-card welcome-card">
        <div class="welcome-content">
          <div class="welcome-icon">🌾</div>
          <h3>Your Farming Hub</h3>
          <p>Access weather updates for all Kerala districts, sell your products, and get live market insights.</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${products.filter(p => p.farmer?.includes(currentUser?.username || 'Farm')).length}</div>
              <div class="stat-label">Your Products</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">14</div>
              <div class="stat-label">Districts Covered</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${products.length}</div>
              <div class="stat-label">Total Listings</div>
            </div>
          </div>

          <div class="quick-actions">
            <button class="quick-btn" onclick="showSection('weather')">
              <span>🌦️</span> Check Weather
            </button>
            <button class="quick-btn" onclick="showSection('sell')">
              <span>📦</span> Sell Product
            </button>
          </div>
        </div>
      </div>
    `;
  } else {
    contentTitle.innerHTML = '🛒 Welcome, Buyer!';
    contentSubtitle.innerHTML = 'Discover fresh produce directly from local farms';
    mainContent.innerHTML = `
      <div class="content-card welcome-card">
        <div class="welcome-content">
          <div class="welcome-icon">🥬</div>
          <h3>Fresh from Kerala Farms</h3>
          <p>Browse fresh products, connect with farmers, and source quality produce directly.</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${products.length}</div>
              <div class="stat-label">Products Available</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${new Set(products.map(p => p.farmer)).size}</div>
              <div class="stat-label">Active Farmers</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${new Set(products.map(p => p.category)).size}</div>
              <div class="stat-label">Categories</div>
            </div>
          </div>

          <div class="quick-actions">
            <button class="quick-btn" onclick="showSection('browse')">
              <span>🔍</span> Browse All
            </button>
            <button class="quick-btn" onclick="showSection('vegetables')">
              <span>🥕</span> Vegetables
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Section management
function showSection(section) {
  updateActiveNav(section);
  currentSection = section;
  
  switch (section) {
    case 'weather':
      showWeatherSection();
      break;
    case 'sell':
      showSellSection();
      break;
    case 'myProducts':
      showMyProductsSection();
      break;
    case 'marketPrices':
      showMarketPricesSection();
      break;
    case 'browse':
      showBrowseSection();
      break;
    case 'vegetables':
      showCategorySection('Vegetables');
      break;
    case 'fruits':
      showCategorySection('Fruits');
      break;
    case 'crops':
      showCategorySection('Crops');
      break;
    case 'spices':
      showCategorySection('Spices');
      break;
    case 'chat':
      showChatSection();
      break;
    default:
      showWelcome();
  }
}

function updateActiveNav(activeSection) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  
  if (activeSection) {
    const activeItem = document.querySelector(`[onclick="showSection('${activeSection}')"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
}

// Enhanced weather section with all Kerala districts
function showWeatherSection() {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  contentTitle.innerHTML = '🌦️ Weather Updates';
  contentSubtitle.innerHTML = 'Get real-time weather data for all Kerala districts';

  mainContent.innerHTML = `
    <div class="content-card">
      <div class="weather-header">
        <h3>🌍 Select Your District</h3>
        <p>Get detailed weather information for better farming decisions</p>
      </div>
      
      <div class="district-selector">
        <select id="districtSelect" class="weather-select">
          <option value="">Choose a district...</option>
          ${keralaDistricts.map(district => 
            `<option value="${district}">${district}</option>`
          ).join('')}
        </select>
        <button class="weather-btn" onclick="getWeatherData()">
          <span>🌤️</span> Get Weather Data
        </button>
      </div>
      
      <div id="weatherResults" class="weather-results"></div>
    </div>
  `;
}

function getWeatherData() {
  const district = document.getElementById('districtSelect').value;
  if (!district) {
    showNotification('Please select a district first', 'warning');
    return;
  }

  const resultsDiv = document.getElementById('weatherResults');
  resultsDiv.innerHTML = '<div class="loading-weather">🌦️ Getting weather data for ' + district + '...</div>';

  // Simulate API call with realistic weather data
  setTimeout(() => {
    const weatherData = {
      temperature: Math.round(Math.random() * 8 + 24), // 24-32°C
      humidity: Math.round(Math.random() * 20 + 70), // 70-90%
      windSpeed: Math.round(Math.random() * 10 + 5), // 5-15 km/h
      condition: ['Clear Sky', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)],
      rainfall: Math.round(Math.random() * 20), // 0-20mm
      uvIndex: Math.round(Math.random() * 5 + 3), // 3-8
      visibility: Math.round(Math.random() * 5 + 8) // 8-13 km
    };

    const recommendations = getWeatherRecommendations(weatherData);

    resultsDiv.innerHTML = `
      <div class="weather-card-detailed">
        <div class="weather-main">
          <div class="weather-location">
            <h3>📍 ${district}, Kerala</h3>
            <p>Last updated: ${new Date().toLocaleString()}</p>
          </div>
          <div class="weather-temp">
            <span class="temp-value">${weatherData.temperature}°C</span>
            <span class="weather-condition">${weatherData.condition}</span>
          </div>
        </div>

        <div class="weather-details-grid">
          <div class="weather-detail">
            <span class="detail-icon">💧</span>
            <span class="detail-label">Humidity</span>
            <span class="detail-value">${weatherData.humidity}%</span>
          </div>
          <div class="weather-detail">
            <span class="detail-icon">💨</span>
            <span class="detail-label">Wind Speed</span>
            <span class="detail-value">${weatherData.windSpeed} km/h</span>
          </div>
          <div class="weather-detail">
            <span class="detail-icon">🌧️</span>
            <span class="detail-label">Rainfall</span>
            <span class="detail-value">${weatherData.rainfall} mm</span>
          </div>
          <div class="weather-detail">
            <span class="detail-icon">☀️</span>
            <span class="detail-label">UV Index</span>
            <span class="detail-value">${weatherData.uvIndex}/10</span>
          </div>
          <div class="weather-detail">
            <span class="detail-icon">👁️</span>
            <span class="detail-label">Visibility</span>
            <span class="detail-value">${weatherData.visibility} km</span>
          </div>
        </div>

        <div class="farming-recommendations">
          <h4>🌱 Farming Recommendations</h4>
          <div class="recommendations-list">
            ${recommendations.map(rec => `
              <div class="recommendation">
                <span class="rec-icon">${rec.icon}</span>
                <span class="rec-text">${rec.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    showNotification(`Weather data loaded for ${district}! 🌤️`, 'success');
  }, 1500);
}

function getWeatherRecommendations(weather) {
  const recommendations = [];
  
  if (weather.condition.includes('Rain')) {
    recommendations.push({
      icon: '🚫',
      text: 'Avoid outdoor activities and protect crops from excess water'
    });
    recommendations.push({
      icon: '🏠',
      text: 'Good time for indoor farm management tasks'
    });
  } else if (weather.condition.includes('Clear')) {
    recommendations.push({
      icon: '🌱',
      text: 'Perfect conditions for planting and harvesting'
    });
    recommendations.push({
      icon: '💧',
      text: 'Ensure adequate irrigation for crops'
    });
  }
  
  if (weather.humidity > 85) {
    recommendations.push({
      icon: '🦠',
      text: 'Watch for fungal diseases due to high humidity'
    });
  }
  
  if (weather.temperature > 30) {
    recommendations.push({
      icon: '🌡️',
      text: 'Provide shade for sensitive crops'
    });
  }
  
  return recommendations;
}

// Enhanced product buying functionality
function buyProduct(productId) {
  selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return;

  const modal = document.getElementById('purchaseModal');
  const content = document.getElementById('purchaseContent');

  content.innerHTML = `
    <div class="purchase-details">
      <div class="product-preview">
        <div class="product-image-large">${selectedProduct.image}</div>
        <div class="product-info-detailed">
          <h3>${selectedProduct.name}</h3>
          <p class="product-description">${selectedProduct.description}</p>
          <div class="product-rating">
            <span class="stars">${'⭐'.repeat(Math.floor(selectedProduct.rating))}</span>
            <span class="rating-text">${selectedProduct.rating} (${selectedProduct.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div class="purchase-form">
        <div class="form-row">
          <div class="form-group">
            <label>Quantity (${selectedProduct.unit})</label>
            <input type="number" id="purchaseQuantity" min="1" max="${selectedProduct.quantity}" value="1">
          </div>
          <div class="form-group">
            <label>Price per ${selectedProduct.unit}</label>
            <input type="text" value="₹${selectedProduct.price}" readonly>
          </div>
        </div>

        <div class="seller-info">
          <h4>👨‍🌾 Seller Information</h4>
          <p><strong>Farm:</strong> ${selectedProduct.farmer}</p>
          <p><strong>Location:</strong> ${selectedProduct.location}</p>
          <p><strong>Contact:</strong> ${selectedProduct.contact}</p>
        </div>

        <div class="delivery-options">
          <h4>🚚 Delivery Options</h4>
          <label class="radio-option">
            <input type="radio" name="delivery" value="pickup" checked>
            <span>Farm Pickup (Free)</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="delivery" value="delivery">
            <span>Home Delivery (₹50)</span>
          </label>
        </div>

        <div class="total-section">
          <div class="total-calculation">
            <div class="total-line">
              <span>Subtotal:</span>
              <span id="subtotal">₹${selectedProduct.price}</span>
            </div>
            <div class="total-line">
              <span>Delivery:</span>
              <span id="delivery-cost">Free</span>
            </div>
            <div class="total-line total">
              <span>Total:</span>
              <span id="total">₹${selectedProduct.price}</span>
            </div>
          </div>
        </div>

        <div class="purchase-actions">
          <button class="btn-cancel" onclick="closePurchaseModal()">Cancel</button>
          <button class="btn-purchase" onclick="confirmPurchase()">
            <span>🛒</span> Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  `;

  // Add event listeners for dynamic price calculation
  const quantityInput = document.getElementById('purchaseQuantity');
  const deliveryOptions = document.querySelectorAll('input[name="delivery"]');

  function updateTotal() {
    const quantity = parseInt(quantityInput.value) || 1;
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const subtotal = selectedProduct.price * quantity;
    const deliveryFee = deliveryType === 'delivery' ? 50 : 0;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('delivery-cost').textContent = deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`;
    document.getElementById('total').textContent = `₹${total}`;
  }

  quantityInput.addEventListener('input', updateTotal);
  deliveryOptions.forEach(option => option.addEventListener('change', updateTotal));

  modal.classList.remove('hidden');
}

function closePurchaseModal() {
  document.getElementById('purchaseModal').classList.add('hidden');
  selectedProduct = null;
}

function confirmPurchase() {
  const quantity = parseInt(document.getElementById('purchaseQuantity').value);
  const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
  const subtotal = selectedProduct.price * quantity;
  const deliveryFee = deliveryType === 'delivery' ? 50 : 0;
  const total = subtotal + deliveryFee;

  // Add to user's purchases
  if (currentUser) {
    currentUser.purchases.push({
      id: 'purchase_' + Date.now(),
      product: selectedProduct,
      quantity: quantity,
      totalAmount: total,
      deliveryType: deliveryType,
      date: new Date(),
      status: 'confirmed'
    });
  }

  // Update product quantity
  selectedProduct.quantity -= quantity;
  if (selectedProduct.quantity <= 0) {
    products = products.filter(p => p.id !== selectedProduct.id);
  }

  // Show success modal
  const successModal = document.getElementById('successModal');
  const successContent = document.getElementById('successContent');
  
  successContent.innerHTML = `
    <div class="success-details">
      <div class="success-icon">🎉</div>
      <h3>Order Confirmed!</h3>
      <div class="order-summary">
        <p><strong>Product:</strong> ${selectedProduct.name}</p>
        <p><strong>Quantity:</strong> ${quantity} ${selectedProduct.unit}</p>
        <p><strong>Total Amount:</strong> ₹${total}</p>
        <p><strong>Delivery:</strong> ${deliveryType === 'pickup' ? 'Farm Pickup' : 'Home Delivery'}</p>
        <p><strong>Farmer Contact:</strong> ${selectedProduct.contact}</p>
      </div>
      <div class="next-steps">
        <h4>📋 Next Steps:</h4>
        <ul>
          <li>Farmer will be notified of your order</li>
          <li>You'll receive a confirmation call</li>
          <li>${deliveryType === 'pickup' ? 'Visit the farm for pickup' : 'Prepare for home delivery'}</li>
        </ul>
      </div>
    </div>
  `;

  closePurchaseModal();
  successModal.classList.remove('hidden');
  
  showNotification('Purchase successful! 🛒✅', 'success');
  
  // Refresh current view if showing products
  if (currentSection && ['browse', 'vegetables', 'fruits', 'crops', 'spices'].includes(currentSection)) {
    showSection(currentSection);
  }
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.add('hidden');
}

// Enhanced sell section
function showSellSection() {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  contentTitle.innerHTML = '📦 Sell Your Products';
  contentSubtitle.innerHTML = 'List your farm products for buyers to discover';

  mainContent.innerHTML = `
    <div class="content-card">
      <div class="sell-header">
        <h3>📝 Product Details</h3>
        <p>Fill in the details to list your product on AgroLink marketplace</p>
      </div>
      
      <form id="productForm" class="product-form" onsubmit="addProduct(event)">
        <div class="form-row">
          <div class="form-group">
            <label>📦 Product Name</label>
            <input type="text" id="productName" placeholder="e.g., Organic Tomatoes" required>
          </div>
          <div class="form-group">
            <label>🗂️ Category</label>
            <select id="productCategory" required>
              <option value="">Select category...</option>
              <option value="Vegetables">🥕 Vegetables</option>
              <option value="Fruits">🍎 Fruits</option>
              <option value="Crops">🌾 Crops</option>
              <option value="Spices">🌶️ Spices</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>💰 Price (₹)</label>
            <input type="number" id="productPrice" placeholder="Price per unit" min="1" required>
          </div>
          <div class="form-group">
            <label>📦 Quantity</label>
            <input type="number" id="productQuantity" placeholder="Available quantity" min="1" required>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>📏 Unit</label>
            <select id="productUnit" required>
              <option value="kg">Kilograms (kg)</option>
              <option value="pieces">Pieces</option>
              <option value="liters">Liters</option>
              <option value="tons">Tons</option>
            </select>
          </div>
          <div class="form-group">
            <label>📍 Farm Location</label>
            <input type="text" id="farmLocation" placeholder="e.g., Kochi, Kerala" required>
          </div>
        </div>
        
        <div class="form-group">
          <label>📝 Product Description</label>
          <textarea id="productDescription" placeholder="Describe your product quality, farming methods, etc." rows="4" required></textarea>
        </div>
        
        <div class="form-group">
          <label>📞 Contact Number</label>
          <input type="tel" id="contactNumber" placeholder="Your contact number" required>
        </div>
        
        <button type="submit" class="btn-sell">
          <span>📤</span> List Product for Sale
        </button>
      </form>
      
      <div id="sellResults" class="sell-results hidden"></div>
    </div>
  `;
}

function addProduct(event) {
  event.preventDefault();
  
  const newProduct = {
    id: 'p' + Date.now(),
    name: document.getElementById('productName').value,
    category: document.getElementById('productCategory').value,
    price: parseFloat(document.getElementById('productPrice').value),
    quantity: parseInt(document.getElementById('productQuantity').value),
    unit: document.getElementById('productUnit').value,
    farmer: currentUser?.username + ' Farm' || 'Local Farm',
    location: document.getElementById('farmLocation').value,
    contact: document.getElementById('contactNumber').value,
    description: document.getElementById('productDescription').value,
    image: getCategoryEmoji(document.getElementById('productCategory').value),
    dateAdded: new Date().toISOString(),
    rating: (Math.random() * 1 + 4).toFixed(1), // Random rating between 4.0-5.0
    reviews: Math.floor(Math.random() * 20) + 5 // Random reviews 5-25
  };
  
  products.push(newProduct);
  
  // Add to current user's listings
  if (currentUser) {
    currentUser.listings.push(newProduct.id);
  }
  
  // Show success message
  const resultsDiv = document.getElementById('sellResults');
  resultsDiv.innerHTML = `
    <div class="success-card">
      <div class="success-icon">✅</div>
      <h3>Product Listed Successfully!</h3>
      <div class="product-summary">
        <p><strong>Product:</strong> ${newProduct.name}</p>
        <p><strong>Category:</strong> ${newProduct.category}</p>
        <p><strong>Price:</strong> ₹${newProduct.price} per ${newProduct.unit}</p>
        <p><strong>Quantity:</strong> ${newProduct.quantity} ${newProduct.unit}</p>
      </div>
      <div class="next-steps-card">
        <h4>🎯 What happens next?</h4>
        <ul>
          <li>Your product is now visible to all buyers</li>
          <li>Buyers can contact you directly</li>
          <li>You'll receive notifications for inquiries</li>
          <li>Keep your contact number active</li>
        </ul>
      </div>
    </div>
  `;
  resultsDiv.classList.remove('hidden');
  
  showNotification('Product listed successfully! 🎉', 'success');
  document.getElementById('productForm').reset();
}

function getCategoryEmoji(category) {
  const emojiMap = {
    'Vegetables': '🥕',
    'Fruits': '🍎',
    'Crops': '🌾',
    'Spices': '🌶️'
  };
  return emojiMap[category] || '📦';
}

// Enhanced browse section with purchase functionality
function showBrowseSection() {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  contentTitle.innerHTML = '🔍 Browse All Products';
  contentSubtitle.innerHTML = 'Discover fresh produce from local farms across Kerala';

  if (products.length === 0) {
    mainContent.innerHTML = `
      <div class="content-card empty-state">
        <div class="empty-icon">📪</div>
        <h3>No Products Available</h3>
        <p>Check back later for fresh products from our farmers.</p>
      </div>
    `;
    return;
  }

  mainContent.innerHTML = `
    <div class="content-card">
      <div class="browse-header">
        <h3>🛒 Available Products</h3>
        <div class="sort-filter">
          <select id="sortBy" onchange="sortProducts()">
            <option value="newest">🕐 Newest First</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💰 Price: High to Low</option>
            <option value="rating">⭐ Highest Rated</option>
          </select>
        </div>
      </div>
      
      <div class="products-grid" id="productsGrid">
        ${renderProducts(products)}
      </div>
    </div>
  `;
}

function renderProducts(productsToRender) {
  return productsToRender.map(product => `
    <div class="product-card-enhanced">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <div class="product-header">
          <h4 class="product-name">${product.name}</h4>
          <span class="product-category">${product.category}</span>
        </div>
        
        <div class="product-rating">
          <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
          <span class="rating-text">${product.rating} (${product.reviews})</span>
        </div>
        
        <p class="product-description">${product.description}</p>
        
        <div class="product-details">
          <div class="detail-item">
            <span class="detail-label">Price:</span>
            <span class="detail-value price">₹${product.price}/${product.unit}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Available:</span>
            <span class="detail-value">${product.quantity} ${product.unit}</span>
          </div>
        </div>
        
        <div class="product-farmer">
          <div class="farmer-info">
            <span class="farmer-icon">👨‍🌾</span>
            <div>
              <div class="farmer-name">${product.farmer}</div>
              <div class="farmer-location">📍 ${product.location}</div>
            </div>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn-contact" onclick="contactFarmer('${product.contact}', '${product.name}')">
            <span>📞</span> Contact
          </button>
          <button class="btn-buy" onclick="buyProduct('${product.id}')">
            <span>🛒</span> Buy Now
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function contactFarmer(contact, productName) {
  showNotification(`📞 Contact ${contact} for ${productName}`, 'info');
}

function sortProducts() {
  const sortBy = document.getElementById('sortBy').value;
  let sortedProducts = [...products];
  
  switch(sortBy) {
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
    default:
      sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }
  
  document.getElementById('productsGrid').innerHTML = renderProducts(sortedProducts);
}

// Category sections
function showCategorySection(category) {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  const categoryEmojis = {
    'Vegetables': '🥕',
    'Fruits': '🍎',
    'Crops': '🌾',
    'Spices': '🌶️'
  };

  contentTitle.innerHTML = `${categoryEmojis[category]} ${category}`;
  contentSubtitle.innerHTML = `Fresh ${category.toLowerCase()} from Kerala farms`;

  const categoryProducts = products.filter(p => p.category === category);

  if (categoryProducts.length === 0) {
    mainContent.innerHTML = `
      <div class="content-card empty-state">
        <div class="empty-icon">${categoryEmojis[category]}</div>
        <h3>No ${category} Available</h3>
        <p>Check back later for fresh ${category.toLowerCase()} from our farmers.</p>
      </div>
    `;
  } else {
    mainContent.innerHTML = `
      <div class="content-card">
        <div class="category-header">
          <h3>${categoryEmojis[category]} Available ${category}</h3>
          <p>Found ${categoryProducts.length} ${category.toLowerCase()} from local farms</p>
        </div>
        <div class="products-grid">
          ${renderProducts(categoryProducts)}
        </div>
      </div>
    `;
  }
}

// Market prices section
function showMarketPricesSection() {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  contentTitle.innerHTML = '💹 Market Prices';
  contentSubtitle.innerHTML = 'Live market rates for agricultural products';

  mainContent.innerHTML = `
    <div class="content-card">
      <div class="market-header">
        <h3>📊 Today's Market Rates</h3>
        <p>Updated every hour • Last update: ${new Date().toLocaleTimeString()}</p>
      </div>
      <div id="pricesGrid" class="prices-grid">
        <div class="loading-prices">📊 Loading market prices...</div>
      </div>
    </div>
  `;
  
  setTimeout(loadMarketPrices, 800);
}

function loadMarketPrices() {
  const pricesGrid = document.getElementById('pricesGrid');
  const prices = [
    { name: 'Rice', price: 65, yesterday: 63, unit: 'kg', trend: 'up' },
    { name: 'Tomatoes', price: 45, yesterday: 48, unit: 'kg', trend: 'down' },
    { name: 'Coconut', price: 30, yesterday: 30, unit: 'piece', trend: 'same' },
    { name: 'Spinach', price: 35, yesterday: 32, unit: 'kg', trend: 'up' },
    { name: 'Mangoes', price: 80, yesterday: 85, unit: 'kg', trend: 'down' },
    { name: 'Black Pepper', price: 800, yesterday: 780, unit: 'kg', trend: 'up' }
  ];
  
  pricesGrid.innerHTML = prices.map(item => {
    const change = item.price - item.yesterday;
    const changePercent = ((change / item.yesterday) * 100).toFixed(1);
    const trendEmoji = item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️';
    const trendColor = item.trend === 'up' ? '#4caf50' : item.trend === 'down' ? '#f44336' : '#666';
    
    return `
      <div class="price-card-detailed">
        <div class="price-header">
          <h4>${item.name}</h4>
          <span class="trend-indicator" style="color: ${trendColor}">${trendEmoji}</span>
        </div>
        <div class="price-main">
          <span class="current-price">₹${item.price}</span>
          <span class="price-unit">per ${item.unit}</span>
        </div>
        <div class="price-change">
          <span class="yesterday-price">Yesterday: ₹${item.yesterday}</span>
          <span class="change-amount" style="color: ${trendColor}">
            ${change > 0 ? '+' : ''}₹${change} (${changePercent}%)
          </span>
        </div>
      </div>
    `;
  }).join('');
  
  showNotification('Market prices updated! 📊', 'success');
}

// My Products section for farmers
function showMyProductsSection() {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  contentTitle.innerHTML = '📋 My Listed Products';
  contentSubtitle.innerHTML = 'Manage your products currently listed on the marketplace';

  const myProducts = products.filter(p => 
    currentUser && (p.farmer.includes(currentUser.username) || currentUser.listings?.includes(p.id))
  );

  if (myProducts.length === 0) {
    mainContent.innerHTML = `
      <div class="content-card empty-state">
        <div class="empty-icon">📪</div>
        <h3>No Products Listed Yet</h3>
        <p>Start by adding your first product to the marketplace.</p>
        <button class="btn-add-product" onclick="showSection('sell')">
          <span>📦</span> Add Your First Product
        </button>
      </div>
    `;
  } else {
    mainContent.innerHTML = `
      <div class="content-card">
        <div class="my-products-header">
          <h3>📦 Your Products (${myProducts.length})</h3>
          <button class="btn-add-more" onclick="showSection('sell')">
            <span>➕</span> Add New Product
          </button>
        </div>
        <div class="products-grid">
          ${myProducts.map(product => `
            <div class="product-card-mine">
              <div class="product-image">${product.image}</div>
              <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-stats">
                  <div class="stat-item">
                    <span class="stat-label">Price:</span>
                    <span class="stat-value">₹${product.price}/${product.unit}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Stock:</span>
                    <span class="stat-value">${product.quantity} ${product.unit}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Rating:</span>
                    <span class="stat-value">⭐ ${product.rating}</span>
                  </div>
                </div>
                <div class="product-actions-mine">
                  <button class="btn-edit" onclick="editProduct('${product.id}')">
                    <span>✏️</span> Edit
                  </button>
                  <button class="btn-delete" onclick="deleteProduct('${product.id}')">
                    <span>🗑️</span> Remove
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function editProduct(productId) {
  showNotification('Edit functionality coming soon! ✏️', 'info');
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to remove this product?')) {
    products = products.filter(p => p.id !== productId);
    showSection('myProducts'); // Refresh the view
    showNotification('Product removed successfully! 🗑️', 'success');
  }
}

// Enhanced chat section
function showChatSection() {
  const contentTitle = document.getElementById('contentTitle');
  const contentSubtitle = document.getElementById('contentSubtitle');
  const mainContent = document.getElementById('mainContent');

  contentTitle.innerHTML = '💬 Community Chat';
  contentSubtitle.innerHTML = 'Connect and communicate with farmers and buyers';

  mainContent.innerHTML = `
    <div class="content-card">
      <div class="chat-container">
        <div class="chat-header">
          <h4>🌾 AgroLink Community Chat</h4>
          <div class="online-users">
            <span class="online-indicator">🟢</span>
            <span>24 users online</span>
          </div>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="message">
            <div class="message-header">
              <strong>🧑‍🌾 Farmer Ravi</strong>
              <span class="message-time">10:30 AM</span>
            </div>
            <div class="message-content">Good morning! Fresh tomatoes available in Kochi. Premium quality at ₹45/kg.</div>
          </div>
          <div class="message buyer-message">
            <div class="message-header">
              <strong>🛒 Buyer Priya</strong>
              <span class="message-time">10:32 AM</span>
            </div>
            <div class="message-content">Interested! How many kilos do you have available?</div>
          </div>
          <div class="message">
            <div class="message-header">
              <strong>🧑‍🌾 Farmer Kumar</strong>
              <span class="message-time">10:35 AM</span>
            </div>
            <div class="message-content">Weather looks good for harvesting this week! 🌤️</div>
          </div>
        </div>
        <div class="chat-input-container">
          <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
          <button class="send-btn" onclick="sendMessage()">
            <span>📤</span> Send
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Auto-scroll to bottom
  setTimeout(() => {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 100);
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${userRole === 'buyer' ? 'buyer-message' : ''}`;
  
  const userIcon = userRole === 'farmer' ? '🧑‍🌾' : '🛒';
  const userName = currentUser?.username || (userRole === 'farmer' ? 'Farmer' : 'Buyer');
  
  messageDiv.innerHTML = `
    <div class="message-header">
      <strong>${userIcon} ${userName}</strong>
      <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
    <div class="message-content">${message}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  showNotification('Message sent! 📤', 'success');
}