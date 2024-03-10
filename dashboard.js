document.addEventListener("DOMContentLoaded", function () {
  function loadDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  function displayVisitedAnimals() {
    const currentVisitor = localStorage.getItem("selectedVisitor");
    const actions = JSON.parse(localStorage.getItem("actions")) || [];
    const visitsElement = document.getElementById("visited-animals");
    if (!visitsElement) {
      console.error("Visited animals element not found");
      return;
    }
    let html = "<h2>Visited Animals</h2>";
    actions.forEach((action) => {
      if (action.type === "visit" && action.visitorId === currentVisitor) {
        html += `<p>You visited ${action.animalId} on ${action.timestamp}</p>`;
      }
    });
    visitsElement.innerHTML = html;
  }

  function displayFeededAnimals() {
    const currentVisitor = localStorage.getItem("selectedVisitor");
    const actions = JSON.parse(localStorage.getItem("actions")) || [];
    const visitsElement = document.getElementById("Feeded-animals");
    if (!visitsElement) {
      console.error("feeded animals element not found");
      return;
    }
    let html = "<h2>Feeded Animals</h2>";
    actions.forEach((action) => {
      if (action.type === "feeding" && action.visitorId === currentVisitor) {
        html += `<p>You feeded ${action.animalId} on ${action.timestamp}</p>`;
      }
    });
    visitsElement.innerHTML = html;
  }

  function displayFavoriteAnimal() {
    const currentVisitor = localStorage.getItem("selectedVisitor");
    const actions = JSON.parse(localStorage.getItem("actions")) || [];
    // ספירת כל הביקורים של האורח הנוכחי לכל חיה
    const visitCounts = {};
    for (const action of actions) {
      if (action.type === "visit" && action.visitorId === currentVisitor) {
        if (!visitCounts[action.animalId]) {
          visitCounts[action.animalId] = 1;
        } else {
          visitCounts[action.animalId]++;
        }
      }
    }
    // מציאת החיה שביקרו אצלה הכי הרבה פעמים
    let favoriteAnimalId = null;
    let maxVisits = 0;
    for (let animalId in visitCounts) {
      if (visitCounts[animalId] > maxVisits) {
        favoriteAnimalId = animalId;
        maxVisits = visitCounts[animalId];
      }
    }

    // הצגת החיה המועדפת
    if (favoriteAnimalId) {
      const favoriteAnimal = JSON.parse(localStorage.getItem("animals")).find(
        (animal) => animal.name === favoriteAnimalId
      );
      if (favoriteAnimal) {
        document.getElementById(
          "favorite-animal"
        ).innerHTML = `<h2>Favorite Animal</h2><p>${favoriteAnimal.name}</p>`;
      } else {
        document.getElementById(
          "favorite-animal"
        ).innerHTML = `<h2>Favorite Animal</h2><p>The animal escape form the Pokimon-Zoo because of you!🙄</p>`;
      }
    } else {
      document.getElementById(
        "favorite-animal"
      ).innerHTML = `<h2>Favorite Animal</h2><p>No favorite animal</p>`;
    }
  }

  // קריאה לפונקציה כאשר העמוד נטען
  document.addEventListener("DOMContentLoaded", function () {
    displayFavoriteAnimal();
  });

  displayVisitedAnimals();
  displayFeededAnimals();
  displayFavoriteAnimal();
});
