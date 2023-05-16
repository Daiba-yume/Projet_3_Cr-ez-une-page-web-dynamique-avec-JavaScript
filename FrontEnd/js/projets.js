// stocker tous les projets récupérés
let allProjects = [];

// category
let listCategories = [
  {
    id: -1,
    name: "Tous",
  },
];

// Récupération des projets
fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((projets) => {
    allProjects = projets;
    displayProjects(projets);
    checkEdit();
  })
  .catch((error) => {
    console.log(error);
    alert(
      "Une erreur est survenue! Veuillez contacter l'administrateur du site!! "
    );
  });

// récupérer dynamiquement les categories
fetch("http://localhost:5678/api/categories")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      // category ajouté
      listCategories.push(element);
    });
    createFilterButtons();

    createSelectCategories(data);
  })
  .catch((error) => {
    console.log(error);
    alert("Une erreur est survenue! Veuillez contacter l'administrateur!");
  });

// Affichage des projets dans la gallery

function displayProjects(projects) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  projects.forEach((element) => {
    const figure = displayProject(element);
    gallery.appendChild(figure);
  });
}

// Création d'un projet "figure"
function displayProject(projet) {
  const figure = document.createElement("figure");
  figure.setAttribute("class", "listGallery");
  figure.setAttribute("data-id", projet.id);
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

// Buttons filters criteria
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
  button.textContent = category.name;
  return button;
}

// category selected
function createSelectCategories(categories) {
  const select = document.getElementById("modal-photo-category");
  categories.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.text = element.name;
    select.appendChild(option);
  });
}

// filtre les projets en fonction de la category selected
function filter(category) {
  if (category.name === "Tous") {
    displayProjects(allProjects);
  } else {
    let tableauResult = allProjects.filter(
      (projet) => projet.category.id === category.id
    );
    displayProjects(tableauResult);
  }
}

// Connexion administrateur //

function checkEdit() {
  // récupération des elemts du DOM ensuite stockés
  let editProfile = document.getElementById("figure-modify");
  let editProjects = document.getElementById("projects-modify");
  let adminStatus = document.getElementById("admin-logged");
  let description = document.getElementById("figure-modify-a");
  let buttons = document.getElementById("buttons");
  let login = document.querySelector(".login-tab");
  let logout = document.querySelector(".logout-tab");

  // button logout
  logout.addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("userId");
    window.location.replace("index.html");
    localStorage.clear();
  });
  // user is connected
  if (
    localStorage.getItem("userId") != null &&
    localStorage.getItem("access_token") != null
  ) {
    editProfile.style.display = "block";
    editProjects.style.display = "block";
    adminStatus.style.display = "flex";
    description.style.display = "flex";
    buttons.style.display = "none";
    login.style.display = "none";
    logout.style.display = "block";
  } else {
    editProfile.style.display = "none";
    editProjects.style.display = "none";
    adminStatus.style.display = "none";
    description.style.display = "none";
    buttons.style.display = "flex";
    login.style.display = "block";
    logout.style.display = "none";
  }
}
