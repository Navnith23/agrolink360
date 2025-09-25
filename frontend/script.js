// ----------------------- 
// Login Validation & Dashboard Loader
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const dashboard = document.getElementById("dashboardPage");
  const login = document.getElementById("loginPage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = document.getElementById("password").value;
      const error = document.getElementById("error");

      // Regex: at least 8 chars, one uppercase, one special
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

      if (!regex.test(password)) {
        error.textContent = "⚠ Password must be 8+ chars, 1 uppercase, 1 special char.";
        return;
      }

      error.textContent = "";
      // Hide login and show dashboard
      if (login && dashboard) {
        login.style.display = "none";
        dashboard.style.display = "flex";
      }

      // Load default dashboard content
      await loadFarmers();
      await loadProducts();
    });
  }
});

// -----------------------
// Fetch Farmers from Backend
// -----------------------
async function loadFarmers() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/users/farmers');
    const farmers = await res.json();
    console.log("Farmers from backend:", farmers);
    return farmers;
  } catch (err) {
    console.error("Error fetching farmers:", err);
  }
}

// -----------------------
// Fetch Products from Backend
// -----------------------
async function loadProducts(category = null) {
  try {
    let url = 'http://127.0.0.1:5000/api/products/';
    if (category) url += `category/${category}`;

    const res = await fetch(url);
    const products = await res.json();
    console.log("Products:", products);

    const content = document.getElementById("sectionContent");
    if (content) {
      content.innerHTML = products.map(p => `<p>${p.name} - ₹${p.price}</p>`).join('');
    }

    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// -----------------------
// Dashboard Section Switcher
// -----------------------
function showSection(section) {
  const title = document.getElementById("sectionTitle");
  const content = document.getElementById("sectionContent");

  if (!title || !content) return;

  if (section === "chat") {
    title.innerText = "Chat Room";
    content.innerHTML = `
      <div class="chat-container">
        <div class="chat-header">
          👤 Farmer Chat
          <div class="profile-circle">F</div>
        </div>
        <div class="chat-messages" id="chatMessages">
          <p><b>You:</b> Hello!</p>
        </div>
        <div class="chat-input">
          <input type="text" id="chatInput" placeholder="Type a message...">
          <button id="sendBtn">Send</button>
        </div>
      </div>
    `;

    const input = document.getElementById("chatInput");
    const btn = document.getElementById("sendBtn");

    // Enter key also sends message
    input.addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });

    // Send button
    btn.addEventListener("click", sendMessage);

    // Display farmers in chat
    loadFarmers().then(farmers => {
      const messages = document.getElementById("chatMessages");
      if (farmers && messages) {
        farmers.forEach(f => {
          const p = document.createElement("p");
          p.innerHTML = `<b>${f.username}:</b> Hi!`;
          messages.appendChild(p);
        });
      }
    });

  } else if (section === "buy") {
    title.innerText = "Buy Products";
    loadProducts();

  } else if (section === "sell") {
    title.innerText = "Sell Products";
    content.innerHTML = "<p>📦 List your farm produce here for selling.</p>";

  } else if (section === "weather") {
    title.innerText = "Live Weather";
    content.innerHTML = "<p>☁ Weather updates will appear here.</p>";

  } else if (section === "news") {
    title.innerText = "Agri News";
    content.innerHTML = "<p>📰 Latest agricultural news will appear here.</p>";

  } else {
    title.innerText = "Welcome to AgroLink 360";
    content.innerHTML = "<p>Select an option from the left menu.</p>";
  }
}

// -----------------------
// Chat Send Message
// -----------------------
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
