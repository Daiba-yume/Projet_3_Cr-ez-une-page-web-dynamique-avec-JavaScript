fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((projets) => {
    console.log(projets);

    displayProjects(projets);
    createFilter(projets);
  })
  .catch((error) => {
    console.log(error);
    alert(
      "Une erreur est survenue! Veuillez contacter l'administrateur du site!! "
    );
  });

function createFilter(projets) {
  // coder la creation des filter
}
function displayProjects(projets) {
  const gallery = document.querySelector(".gallery");
  projets.forEach((element) => {
    const figure = displayProject(element);
    gallery.appendChild(figure);
  });
}
function displayProject(projet) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.setAttribute("src", projet.imageUrl);
  img.setAttribute("alt", projet.title);

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = projet.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}
