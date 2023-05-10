let allProjects = [];
let listCategories = [
  {
    id: -1,
    name: "Tous",
  },
];
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
    // affichage les categories avec le create element sur le dom
    data.forEach((element) => {
      listCategories.push(element);
    });
    createFilterButtons();

    createSelectCategories(data);
  })
  .catch((error) => {
    console.log(error);
    alert("Une erreur est survenue! Veuillez contacter l'administrateur!");
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

function createSelectCategories(categories) {
  const select = document.getElementById("modal-photo-category");
  categories.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.text = element.name;
    select.appendChild(option);
  });
}

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

function checkEdit() {
  let editProfile = document.getElementById("figure-modify");
  let editProjects = document.getElementById("projects-modify");
  let adminStatus = document.getElementById("admin-logged");
  let description = document.getElementById("figure-modify-a");
  let buttons = document.getElementById("buttons");
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
