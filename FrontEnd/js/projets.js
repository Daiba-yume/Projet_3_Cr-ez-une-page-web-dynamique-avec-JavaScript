let allProjects = [];
fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((projets) => {
    console.log(projets);
    allProjects = projets;
    displayProjects(projets);
    setButtonListener();
  })
  .catch((error) => {
    console.log(error);
    alert(
      "Une erreur est survenue! Veuillez contacter l'administrateur du site!! "
    );
  });

function createFilter(tableauDeRecherche, SearchCategoryId) {
  let tableauResultat = tableauDeRecherche.filter(
    (element) => element.categoryId == SearchCategoryId
  );

  console.log(tableauResultat);
  return tableauResultat;
}

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

function filter(criteria) {
  console.log(criteria);
  const listFilter = ["Tous", "Objets", "Appartements", "Hôtels et restaurant"];
  const listIdFilter = [-1, 1, 2, 3];

  let pos = listFilter.findIndex((element) => element == criteria);
  console.log("l index du mot ", criteria, "est:", pos);
  if (pos == 0) {
    displayProjects(allProjects);
  } else {
    console.log("index:", pos, " listIdFilter[index]", listIdFilter[pos]);
    let tableauResult = createFilter(allProjects, listIdFilter[pos]);
    displayProjects(tableauResult);
  }
}

function setButtonListener() {
  // recuperer la liste des boutons
  // boucler sur cette liste et pour chaque element tu va
  // ajouter un event listener('click') avec le text du bouton
}
