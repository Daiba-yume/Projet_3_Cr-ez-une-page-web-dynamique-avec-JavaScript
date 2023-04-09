// Show and hide modal //
const editProjects = document.getElementById("editProject");
const modal = document.getElementById("modal");

editProjects.addEventListener("click", function (event) {
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.textContent = "Galerie photo";

  const modalContent = document.querySelector(".modal-content");
  const contentEdit = editAllProjects();
  //  const contentEdit = createOneProject();
  modalContent.appendChild(contentEdit);

  showModal();
});

const modalClose = document.querySelector("#modal-close");

modalClose.addEventListener("click", hideModal);
function showModal() {
  modal.style.display = "block";
}
function hideModal() {
  modal.style.display = "none";
}

function editAllProjects() {
  const galleryPhoto = document.createElement("div");
  galleryPhoto.setAttribute("class", "gallery-photo");

  // boucler sur le tableau et creer la liste des element
  allProjects.forEach((element) => {
    const card = createOneCard(element);
    galleryPhoto.appendChild(card);
  });

  // Ajouter les deux bouton en bas de ajouter et supprimer
  const newPhotoBtn = document.getElementById("new-photo");
  newPhotoBtn.addEventListener("click", function () {});

  const deleteG = document.getElementById("delete-gallery");
  deleteG.addEventListener("click", function () {});

  // retourne finalement une dv globale qui contient que le content de edit
  return galleryPhoto;
}

function createOneCard(works) {
  const figure = document.createElement("figure");
  figure.setAttribute("class", "gallery-photo-card");
  figure.setAttribute("data-id", works.id); // Add a data-id attribute to store the work ID

  const figureImage = document.createElement("div");
  figureImage.setAttribute("class", "gallery-photo-card-img");
  figure.appendChild(figureImage);

  const image = document.createElement("img");
  image.src = works.imageUrl;
  image.alt = works.title;
  figureImage.appendChild(image);

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-regular fa-trash-can";
  // Ajout d'un event de suppression lors du click sur l'icon supprimer
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    //deleteWorkById(works.id);
  });
  figure.appendChild(deleteIcon);

  const figureCaption = document.createElement("figcaption");
  figureCaption.setAttribute("class", "editer");
  figureCaption.textContent = "éditer";
  figure.appendChild(figureCaption);

  return figure;
}

/// Ajout d'un new projet //
// const btnValider = document.getElementById("modal-valider");
// btnValider.addEventListener("click", addNewWork);

// function addNewWork(event) {
//   event.preventDefault();

//   const token = sessionStorage.getItem("Token");

//   const title = document.getElementById("modal-photo-title").value;
//   const category = document.getElementById("modal-photo-category").value;
//   const image = document.getElementById("image").files[0];

//   if (!title || !category || !image) {
//     alert("Veuillez remplir tous les champs du formulaire.");
//     return;
//   }

//   //check if the image does not exceed 4mo//
//   if (image.size > 4 * 1024 * 1024) {
//     alert("La taille de l'image ne doit pas dépasser 4 Mo.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("category", category);
//   formData.append("image", image);
//   fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     body: formData,
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((works) => {
//       //create and add the new work to the gallery//
//       const figure = createProjectContentModal(works);
//       const gallery = document.querySelector(".gallery");
//       gallery.appendChild(figure);

//       //create and add the new work to the modal gallery//
//       const figureModal = createProjectContentModal(works);
//       const galleryModal = document.querySelector(".gallery-modal");
//       galleryModal.appendChild(figureModal);

//       alert("Le nouvel travail a été ajouté avec succès.");
//     })
//     .catch((error) => console.error(error));
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
