let allProjects = [];
let listCategories = ["Tous"];
fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((projets) => {
    console.log(projets);
    allProjects = projets;
    displayProjects(projets);
    getAllGategories();
    checkEdit();
  })
  .catch((error) => {
    console.log(error);
    alert(
      "Une erreur est survenue! Veuillez contacter l'administrateur du site!! "
    );
  });

function displayProjects(projects) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  projects.forEach((element) => {
    const figure = displayProject(element);
    gallery.appendChild(figure);
  });
}

function displayProject(projet) {
  const figure = document.createElement("figure");
  figure.setAttribute("data_id", projet.id);
  const img = document.createElement("img");
  img.setAttribute("src", projet.imageUrl);
  img.setAttribute("alt", projet.title);

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = projet.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  figure.addEventListener("click", function (event) {
    console.log(this);
  });
  return figure;
}

function getAllGategories() {
  allProjects.forEach((projet) => {
    let category = projet.category.name;
    if (!listCategories.includes(category)) {
      listCategories.push(category);
    }
  });

  createFilterButtons();
}
function createFilterButtons() {
  listCategories.forEach((category) => {
    const button = createFilterButton(category);
    // ajouter un event listener('click') avec le text du bouton
    button.addEventListener("click", function (event) {
      let criteria = category;
      filter(criteria);
    });
    document.getElementById("buttons").appendChild(button);
  });
}

function createFilterButton(category) {
  const button = document.createElement("button");
  button.setAttribute("class", "button-value");
  button.textContent = category;
  return button;
}

function filter(category) {
  if (category === "Tous") {
    displayProjects(allProjects);
  } else {
    let tableauResult = allProjects.filter(
      (projet) => projet.category.name === category
    );
    displayProjects(tableauResult);
  }
}

function checkEdit() {
  let editProfile = document.getElementById("figure-modify");
  let editProjects = document.getElementById("projects-modify");
  let login = document.querySelector(".login-tab");
  let logout = document.querySelector(".logout-tab");
  // activer le logout

  logout.addEventListener("click", function (event) {
    console.log("logout");
    localStorage.clear();
  });
  if (
    localStorage.getItem("userId") != null &&
    localStorage.getItem("access_token") != null
  ) {
    editProfile.style.display = "block";
    editProjects.style.display = "block";
    login.style.display = "none";
    logout.style.display = "block";
  } else {
    editProfile.style.display = "none";
    editProjects.style.display = "none";
    login.style.display = "block";
    logout.style.display = "none";
  }
}
