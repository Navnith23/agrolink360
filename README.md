# agrolink360
#index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AgroLink 360</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Login Page -->
  <div id="loginPage" class="login-container animate">
    <h2>🌿 AgroLink 360</h2>
    <form id="loginForm">
      <input type="text" id="username" placeholder="👤 Username" required>
      <input type="password" id="password" placeholder="🔒 Password" required>
      <input type="text" id="fullname" placeholder="📛 Full Name" required>
      <input type="number" id="age" placeholder="🎂 Age" required>
      <p id="error" class="error"></p>
      <button type="submit">Login 🚀</button>
    </form>
  </div>

  <!-- Dashboard Page -->
  <div id="dashboardPage" class="dashboard" style="display: none;">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2>🌿 AgroLink 360°</h2>
      <button onclick="showSection('chat')">💬 Chat</button>
      <button onclick="showSection('buy')">🛒 Buy</button>
      <button onclick="showSection('sell')">📦 Sell</button>
      <button onclick="showSection('weather')">☁ Live Weather</button>
      <button onclick="showSection('news')">📰 News</button>
    </div>

    <!-- Main content -->
    <div class="main">
      <div class="content-box">
        <h2 id="sectionTitle">Welcome to AgroLink 360</h2>
        <div id="sectionContent">
          <p>Select an option from the left menu.</p>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Handle login validation
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("loginForm");
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
          document.getElementById("loginPage").style.display = "none";
          document.getElementById("dashboardPage").style.display = "flex";
        });
      }
    });

    // Dashboard section switcher
    function showSection(section) {
      const title = document.getElementById("sectionTitle");
      const content = document.getElementById("sectionContent");

      if (section === "chat") {
        title.innerText = "Chat Room";
        content.innerHTML = `
          <div class="chat-container">
            <div class="chat-header">👤 Farmer Chat</div>
            <div class="chat-messages" id="chatMessages">
              <p><b>You:</b> Hello!</p>
            </div>
            <div class="chat-input">
              <input type="text" id="chatInput" placeholder="Type a message...">
              <button onclick="sendMessage()">Send</button>
              <button id="voiceBtn">🎤</button>
            </div>
          </div>
        `;

        // Send message on Enter
        const input = document.getElementById("chatInput");
        input.addEventListener("keypress", function(e){
          if(e.key === "Enter") sendMessage();
        });

        // Voice button action
        document.getElementById("voiceBtn").addEventListener("click", () => {
          alert("🎤 Voice message feature coming soon!");
        });

      } else if (section === "buy") {
        title.innerText = "Buy Products";
        content.innerHTML = "<p>🛒 Browse and buy spices, seeds, and tools here.</p>";
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

    // Chat send message with timestamp
    function sendMessage() {
      const input = document.getElementById("chatInput");
      const messages = document.getElementById("chatMessages");

      if (input.value.trim() !== "") {
        const now = new Date();
        const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
        const msg = document.createElement("p");
        msg.innerHTML = `<b>You:</b> ${input.value} <span style="font-size:0.8em;color:gray;">${time}</span>`;
        messages.appendChild(msg);
        input.value = "";
        messages.scrollTop = messages.scrollHeight;
      }
    }
  </script>
</body>
</html>
#script.js
// Handle login validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
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
      window.location.href = "dashboard.html";
    });
  }
});

// Dashboard section switcher
function showSection(section) {
  const title = document.getElementById("sectionTitle");
  const content = document.getElementById("sectionContent");

  if (section === "chat") {
    title.innerText = "Chat Room";
    content.innerHTML = `
      <div class="chat-container">
        <div class="chat-header">👤 Farmer Chat</div>
        <div class="chat-messages" id="chatMessages">
          <p><b>You:</b> Hello!</p>
        </div>
        <div class="chat-input">
          <input type="text" id="chatInput" placeholder="Type a message...">
          <button onclick="sendMessage()">Send</button>
        </div>
      </div>
    `;
  } else if (section === "buy") {
    title.innerText = "Buy Products";
    content.innerHTML = "<p>🛒 Browse and buy spices, seeds, and tools here.</p>";
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

// Chat send message
function sendMessage() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  if (input.value.trim() !== "") {
    const msg = document.createElement("p");
    msg.innerHTML = `<b>You:</b> ${input.value}`;
    messages.appendChild(msg);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
}
// Dashboard section switcher
function showSection(section) {
  const title = document.getElementById("sectionTitle");
  const content = document.getElementById("sectionContent");

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
  } else if (section === "buy") {
    title.innerText = "Buy Products";
    content.innerHTML = "<p>🛒 Browse and buy spices, seeds, and tools here.</p>";
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

// Chat send message
function sendMessage() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

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
#style.css
/* General body styling */
body {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #4caf50, #81c784);
  height: 100vh;
}

/* Login box animation */
.animate {
  animation: slideUp 1s ease;
}
@keyframes slideUp {
  from { transform: translate(-50%, 100%); opacity: 0; }
  to { transform: translate(-50%, -50%); opacity: 1; }
}

/* Login box container */
.login-container {
  background: #fff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Error text */
.error {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}

/* Input fields */
.login-container input {
  width: 90%;
  margin: 12px auto;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  font-size: 15px;
  transition: 0.3s;
}
.login-container input:focus {
  border-color: #43cea2;
  box-shadow: 0 0 8px rgba(67, 206, 162, 0.6);
}

/* Button */
.login-container button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background: linear-gradient(to right, #43cea2, #185a9d);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.login-container button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #185a9d, #43cea2);
}

/* Override background for dashboard only */
body.dashboard {
  display: flex;
  background: #ecf0f1; /* same as main content */
  height: 100vh;       /* make full height */
}


/* Sidebar */
.sidebar {
  width: 220px;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.sidebar h2 { text-align: center; margin-bottom: 20px; }
.sidebar button {
  margin: 8px 0;
  padding: 12px;
  background: #34495e;
  border: none;
  color: white;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
.sidebar button:hover { background: #16a085; }

/* Main content */
.main {
  flex-grow: 1;
  padding: 20px;
  background: #ecf0f1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh; /* fill the vertical space */
}

.content-box {
  width: 80%;
  min-height: 70%;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

/* Chat UI */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 550px;
}
.chat-header {
  background: #16a085;
  color: white;
  padding: 12px;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.chat-messages {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-bottom: 10px; /* space before input */
}
.chat-input {
  display: flex;
  margin-top: auto;
  gap:5px;
}
.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
}
.chat-input button {
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background: #16a085;
  color: white;
  cursor: pointer;
  font-size: 18px;
}

#voiceBtn {
  background: #3498db; /* different color for voice button */
}

/* Profile circle for chat header */
.profile-circle {
  width: 35px;
  height: 35px;
  background: #fff;
  color: #16a085;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

