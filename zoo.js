const animals = JSON.parse(localStorage.getItem("animals")); // Load animals from Local Storage
const animalCardsContainer = document.getElementById("animal-cards");
//יצירת כרטיסיה עבור כל חיה
animals.forEach((animal) => {
  const card = document.createElement("div");
  card.className = "animal-card";

  const name = document.createElement("h2");
  name.textContent = animal.name;

  const image = document.createElement("img");
  // השתמש בשם החיה כדי למצוא את התמונה המתאימה, או הגדר כאן את מסלול התמונה
  image.src = `${animal.name.toLowerCase()}.jpg`; // הנחה ששמות הקבצים תואמים לשמות החיות
  image.alt = `${animal.name} image`;

  card.appendChild(name);
  card.appendChild(image);

  animalCardsContainer.appendChild(card);

  card.addEventListener("click", () => {
    loginAsAnimal(animal.name);
  });
});

function loginAsAnimal(animalName) {
  localStorage.setItem("selectedAnimal", animalName);
  window.location.href = "animal.html";
}
document.querySelectorAll(".animal-card button").forEach((button) => {
  button.addEventListener("click", function () {
    const animalName = this.parentNode.querySelector("h2").textContent;
    window.location.href = `animal.html?name=${encodeURIComponent(animalName)}`;
  });
});
function loginAsAnimal(animalName) {
  localStorage.setItem("selectedAnimal", animalName);
  window.location.href = `animal.html?name=${encodeURIComponent(animalName)}`;
}

const search = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toUpperCase();
  const animalCards = document.querySelectorAll(".animal-card");

  animalCards.forEach((card) => {
    const animalName = card.querySelector("h2").textContent.toUpperCase();

    if (animalName.includes(searchInput)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
};
const filterAnimals = () => {
  const weightFilter = document.getElementById("weightFilter").value;
  const heightFilter = document.getElementById("heightFilter").value;
  const colorFilter = document
    .getElementById("colorFilter")
    .value.toUpperCase();
  const habitatFilter = document.getElementById("habitatFilter").value;

  const animalCards = document.querySelectorAll(".animal-card");

  animalCards.forEach((card) => {
    const animalName = card.querySelector("h2").textContent;
    const animal = animals.find((animal) => animal.name === animalName);

    let matchesFilter = true;

    if (weightFilter && animal.weight != weightFilter) {
      matchesFilter = false;
    }

    if (heightFilter && animal.height != heightFilter) {
      matchesFilter = false;
    }

    if (colorFilter && animal.color.toUpperCase() != colorFilter) {
      matchesFilter = false;
    }

    if (
      habitatFilter !== "all" &&
      animal.habitat.toLowerCase() != habitatFilter
    ) {
      matchesFilter = false;
    }

    card.style.display = matchesFilter ? "" : "none";
  });
};
const selectedVisitor = localStorage.getItem("selectedVisitor");
const visitorsData = JSON.parse(localStorage.getItem("visitors"));
const selectedUserInfo = document.getElementById("selectedUserInfo");

if (selectedVisitor) {
  const selectedUser = visitorsData.find(
    (visitor) => visitor.name === selectedVisitor
  );
  if (selectedUser) {
    const navHTML = `
      <span>Hello Visitor: ${selectedUser.name} </span>
      <span>Your coin balance: 🪙 ${selectedUser.coins}</span>
    `;
    selectedUserInfo.innerHTML = navHTML;
  }
}

// כפתור ניקוי - מתבצעת פעולת ניקוי הלוקל סטורג'
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload(); // טעינה מחדש של העמוד לרענון המידע
});

// יצירת הרשימת נפתחת של המבקרים האפשריים
const visitorDropdown = document.getElementById("visitorDropdown");
if (visitorsData) {
  visitorsData.forEach((visitor) => {
    const option = document.createElement("option");
    option.textContent = visitor.name;
    visitorDropdown.appendChild(option);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const userNav = document.getElementById("selectedUserInfo");
  const visitorsData = JSON.parse(localStorage.getItem("visitors"));

  // בדיקה אם יש מבקר מחובר
  const selectedVisitor = localStorage.getItem("selectedVisitor");
  if (!selectedVisitor) {
    const loginNav = document.createElement("span");
    loginNav.innerHTML = `
          <span>No visitor is logged in.&nbsp; </span>
          <a href="login.html">Click here to log in</a>
      `;
    selectedUserInfo.appendChild(loginNav);
  } else {
    // יצירת ניווט עבור המבקר המחובר
    const selectedUser = visitorsData.find(
      (visitor) => visitor.name === selectedVisitor
    );
    if (selectedUser) {
      const navHTML = `
              <span>Hello Visitor: ${selectedUser.name}</span>
            
              <span>Your coin balance: 🪙 ${selectedUser.coins}</span>
          `;
      selectedUserInfo.innerHTML = navHTML;
    }
  }
});
function updateCoinsInNav(coins) {
  const selectedUserInfo = document.getElementById("selectedUserInfo");
  selectedUserInfo.innerHTML = `
    <span>Hello Visitor: ${localStorage.getItem("selectedVisitor")} </span>
    <span>Your coin balance: 🪙 ${coins}</span>
  `;
}
