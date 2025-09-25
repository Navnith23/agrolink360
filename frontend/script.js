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
