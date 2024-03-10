const visitorsData = JSON.parse(localStorage.getItem("visitors"));

if (visitorsData && visitorsData.length > 0) {
  visitorsData.forEach((visitor) => {
    createVisitorCard(visitor);
  });
} else {
  // אם אין מבקרים, נוסיף הודעה או פעולה נוספת בהתאם לדרישות
  const visitorContainer = document.getElementById("visitor-container");
  const message = document.createElement("p");
  message.textContent = "No available visitors";
  visitorContainer.appendChild(message);
}

function createVisitorCard(visitor) {
  const visitorContainer = document.getElementById("visitor-container");
  if (!visitorContainer) return; // ודא קיום של הקונטיינר לפני הוספת הכרטיסייה

  const card = document.createElement("div");
  card.classList.add("visitor-card");

  const name = document.createElement("h2");
  name.textContent = visitor.name;

  const coins = document.createElement("p");
  coins.textContent = `Coins: ${visitor.coins}`;

  const image = document.createElement("img");
  image.src = "ash katcham.jpg";

  card.appendChild(name);
  card.appendChild(coins);
  card.appendChild(image);

  visitorContainer.appendChild(card);

  card.addEventListener("click", () => {
    loginAsVisitor(visitor.name);
  });
}

function loginAsVisitor(visitorName) {
  localStorage.setItem("selectedVisitor", visitorName);
  window.location.href = "zoo.html";
}

function search() {
  const nameSearchBox = document
    .getElementById("visitorNameInput")
    .value.toUpperCase();
  const visitorCards = document.querySelectorAll(".visitor-card");

  visitorCards.forEach((visitorCard) => {
    const visitorName = visitorCard
      .querySelector("h2")
      .textContent.toUpperCase();

    if (visitorName.includes(nameSearchBox)) {
      visitorCard.style.display = "";
    } else {
      visitorCard.style.display = "none";
    }
  });
}

// בדיקה אם כבר קיים אורח נבחר
const selectedVisitor = localStorage.getItem("selectedVisitor");
if (selectedVisitor) {
  // אם כבר קיים אורח נבחר, הצג הודעת אזהרה
  const selectedGuestMessage = document.getElementById("selectedGuestMessage");
  if (selectedGuestMessage) {
    selectedGuestMessage.style.display = "block";
  }
} else {
  const selectedGuestMessage = document.getElementById("selectedGuestMessage");
  if (selectedGuestMessage) {
    selectedGuestMessage.style.display = "none";
  }
}
const disconnectButton = document.getElementById("disconnectButton");
if (disconnectButton) {
  disconnectButton.addEventListener("click", () => {
    localStorage.removeItem("selectedVisitor");
    window.location.href = "login.html";
  });
}
