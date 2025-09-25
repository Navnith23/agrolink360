// --- State management ---
let userRole = null;

// --- Login & Role selection ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const login = document.getElementById("loginPage");
  const roleSel = document.getElementById("roleSelectPage");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = document.getElementById("password").value;
      const error = document.getElementById("error");
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!regex.test(password)) {
        error.textContent = "⚠ Password must be 8+ chars, 1 uppercase, 1 special char.";
        return;
      }
      error.textContent = "";
      login.style.display = "none";
      roleSel.style.display = "flex";
    });
  }
});

function chooseRole(role) {
  userRole = role;
  document.getElementById("roleSelectPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "flex";
  renderSidebar();
  showSection(null); // load welcome for role
}

// --- Sidebar dynamic rendering by role ---
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  let html = `<h2>🌿 AgroLink 360°</h2>`;
  if (userRole === "farmer") {
    html += `
      <button onclick="showSection('weather')">☁ Live Weather</button>
      <button onclick="showSection('buy')">🛒 Buy Market Inputs</button>
      <button onclick="showSection('market')">💹 Product Market Price</button>
    `;
  } else if (userRole === "buyer") {
    html += `
      <button onclick="showSection('chat')">💬 Chat</button>
      <button onclick="showSection('search')">🔎 Search Products</button>
      <button onclick="showSection('vegetables')">🥕 Vegetables</button>
      <button onclick="showSection('fruits')">🍎 Fruits</button>
      <button onclick="showSection('pulses')">🌱 Pulses</button>
      <button onclick="showSection('crops')">🌾 Crops</button>
    `;
  }
  sidebar.innerHTML = html;
}

// --- Section Switcher ---
function showSection(section) {
  const title = document.getElementById("sectionTitle");
  const content = document.getElementById("sectionContent");
  if (!title || !content) return;

  // Farmer Side
  if (userRole === "farmer") {
    if (section === "weather") {
      title.innerText = "Live Weather";
      content.innerHTML = `
        <input id="searchWeather" class="search-bar" type="text" placeholder="Search city/district...">
        <button id="searchWeatherBtn" class="search-btn">🔍</button>
        <div id="weatherResults"></div>`;
      document.getElementById("searchWeatherBtn").onclick = () => {
        const loc = document.getElementById("searchWeather").value;
        loadWeather(loc);
      };
    } else if (section === "buy") {
      title.innerText = "Buy Market Inputs";
      content.innerHTML = `
        <input id="searchBuy" class="search-bar" type="text" placeholder="Search product or category...">
        <button id="searchBuyBtn" class="search-btn">🔍</button>
        <div id="buyResults"></div>`;
      loadProducts();
      document.getElementById("searchBuyBtn").onclick = () => {
        const q = document.getElementById("searchBuy").value;
        loadProducts(null, q);
      };
    } else if (section === "market") {
      title.innerText = "Current Market Price";
      content.innerHTML = `
        <input id="searchMarket" class="search-bar" type="text" placeholder="Search product...">
        <button id="searchMarketBtn" class="search-btn">🔍</button>
        <div id="marketResults"></div>`;
      document.getElementById("searchMarketBtn").onclick = () => {
        const p = document.getElementById("searchMarket").value;
        loadMarketPrice(p);
      };
    } else {
      title.innerText = "Welcome, Farmer!";
      content.innerHTML = `<p>Select an option from the left menu.</p>`;
    }

  // Buyer Side
  } else if (userRole === "buyer") {
    if (section === "chat") {
      title.innerText = "Chat Room";
      content.innerHTML = `
        <div class="chat-container">
          <div class="chat-header">
            🛒 Buyer Chat
            <div class="profile-circle">B</div>
          </div>
          <div class="chat-messages" id="chatMessages">
            <p><b>You:</b> Hello!</p>
          </div>
          <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Type a message...">
            <button id="sendBtn">Send</button>
          </div>
        </div>`;
      document.getElementById("sendBtn").onclick = sendMessage;
      document.getElementById("chatInput").onkeypress = e => { if (e.key === "Enter") sendMessage(); };

    } else if (section === "search") {
      title.innerText = "Search Products";
      content.innerHTML = `
        <input id="searchProducts" class="search-bar" type="text" placeholder="Search any product...">
        <button id="searchProductsBtn" class="search-btn">🔍</button>
        <div id="searchResults"></div>`;
      loadProducts();
      document.getElementById("searchProductsBtn").onclick = () => {
        const q = document.getElementById("searchProducts").value;
        loadProducts(null, q, "searchResults");
      };

    } else if (["vegetables", "fruits", "pulses", "crops"].includes(section)) {
      // Load products in category
      const categoryLabel = {
        vegetables: "Vegetables",
        fruits: "Fruits",
        pulses: "Pulses",
        crops: "Crops"
      };
      title.innerText = `${categoryLabel[section]}`;
      content.innerHTML = `<div id="categoryResults"></div>`;
      loadProducts(section, "", "categoryResults");

    } else {
      title.innerText = "Welcome, Buyer!";
      content.innerHTML = `<p>Select an option from the left menu.</p>`;
    }
  }
}

// --- Loading product/market/weather/news data (dummy or backend as needed) ---
async function loadProducts(category = null, query = "", containerID = "buyResults") {
  try {
    let url = 'http://127.0.0.1:5000/api/products/';
    if (category && ["vegetables", "fruits", "pulses", "crops"].includes(category))
      url += `category/${category}`;
    const res = await fetch(url);
    let products = await res.json();
    if (query)
      products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    const container = document.getElementById(containerID);
    if (container) {
      container.innerHTML = products.length ?
        products.map(p => `<p>${p.name} - ₹${p.price}</p>`).join('') :
        '<p>No products found.</p>';
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Dummy weather
function loadWeather(location = "") {
  const container = document.getElementById("weatherResults");
  container.innerHTML = location ?
    `<p>Weather for ${location}: 29°C, Clear sky, humidity 20%.</p>` :
    '<p>Please enter a city/district.</p>';
}

// Dummy market price
function loadMarketPrice(product = "") {
  const container = document.getElementById("marketResults");
  container.innerHTML = product ?
    `<p>Market price for ${product}: ₹3000 per quintal</p>` :
    '<p>Please enter a product name.</p>';
}

// --- Chat section ---
function sendMessage() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  if (!input || !messages) return;
  if (input.value.trim() !== "") {
    const now = new Date();
    const time = now.getHours().toString().padStart(2,'0') + ':' +
      now.getMinutes().toString().padStart(2,'0') +
      ' ' + now.getDate() + '/' + (now.getMonth()+1) + '/' + now.getFullYear();
    const msg = document.createElement("p");
    msg.innerHTML = `<b>You:</b> ${input.value} <span style="font-size:0.7em;color:gray;">${time}</span>`;
    messages.appendChild(msg);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
}
