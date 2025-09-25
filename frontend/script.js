// Handle login
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // For now just redirect (no real authentication)
      window.location.href = "dashboard.html";
    });
  }
});

// Handle sidebar navigation
function showSection(section) {
  const title = document.getElementById("sectionTitle");
  const content = document.getElementById("sectionContent");

  switch (section) {
    case "chat":
      title.innerText = "Chat Room";
      content.innerHTML = "<p>Chat feature will appear here.</p>";
      break;
    case "buy":
      title.innerText = "Buy Products";
      content.innerHTML = "<p>Browse and buy spices, seeds, and tools here.</p>";
      break;
    case "sell":
      title.innerText = "Sell Products";
      content.innerHTML = "<p>List your farm produce here for selling.</p>";
      break;
    case "weather":
      title.innerText = "Live Weather";
      content.innerHTML = "<p>Weather updates will appear here.</p>";
      break;
    case "news":
      title.innerText = "Agri News";
      content.innerHTML = "<p>Latest agricultural news will appear here.</p>";
      break;
    default:
      title.innerText = "Welcome to AgroLink 360";
      content.innerHTML = "<p>Select an option from the left menu.</p>";
  }
}
