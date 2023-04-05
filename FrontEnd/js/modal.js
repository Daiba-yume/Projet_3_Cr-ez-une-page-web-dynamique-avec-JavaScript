// Show and hide modal //
const editProjects = document.getElementById("editProject");
const modal = document.querySelector("#modal-Galerie");
editProjects.addEventListener("click", function (event) {
  const contentEdit = editContentModal();
  const modalContent = document.querySelector(".modal-content");
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

//************************ */
/*
const modalPhoto = document.querySelector("#modal-photo");

modalContent.addEventListener("click", function (e) {
  e.stopPropagation();
});
modalPhoto.addEventListener("click", function (e) {
  e.stopPropagation();
});

modal.addEventListener("click", hideModal);
modalContent.addEventListener("click", function (e) {
  e.stopPropagation();
});
*/

// affichage de la modal photo //
/*
const newPhotoBtn = document.querySelector("#new-photo");
const returnBtn = document.querySelector("#modal-return");
const modalPhotoClose = document.querySelector("#modal-photo-close");
newPhotoBtn.addEventListener("click", function () {
  modalContent.style.display = "none";
  modalPhoto.style.display = "block";
});
returnBtn.addEventListener("click", function () {
  modalContent.style.display = "flex";
  modalPhoto.style.display = "none";
});
modalPhotoClose.addEventListener("click", hideModal);

// ajout des travaux dans la modal //
const imagesModalContainer = document.querySelector(".gallery-modal");
/*
const reponses = fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((datas) => {
    datas.forEach((works) => {

    });
  });
*/

function editContentModal() {
  const div = document.createElement("div");
  // boucler sur le tableau et creer la liste des element
  allProjects.forEach((element) => {
    const card = createOneCard(element);
    div.appendChild(card);
  });
  // Ajouter les deux bouton en bas de ajouter et supprimer
  /* const newPhotoBtn = document.getElementById("new-photo");
  newPhotoBtn.addEventListener("click", function () {
    modalContent.style.display = "none";
    modalPhoto.style.display = "block";
  });

  const deleteG = document.getElementById("delete-gallery");
  deleteG.addEventListener("click", function () {
    modalContent.style.display = "flex";
    modalPhoto.style.display = "block";
  }); */

  // retourne finalement une dv globale qui contient que le content de edit
  return div;
}

function createProjectContentModal() {
  // creer en javascript les element pour l'ajout d'un projet
  const addNewProject = document.createElement("div");
  // photo
  const img = document.createElement("img");
  img.src = imageUrl;
  // titre
  const titleImg = document.createElement("p");
  titleImg.textContent = "";
  // liste des categorie
  getAllGategories;
  // retourne finalement une dv globale qui contient que le visuel de create Project
  return addNewProject;
}

function createOneCard(works) {
  const figure = document.createElement("figure");
  const figureCaption = document.createElement("figcaption");
  const figureImage = document.createElement("img");
  const deleteIcon = document.createElement("i");

  figureImage.src = works.imageUrl;
  figureImage.alt = works.title;
  figureCaption.innerHTML = "éditer";
  figure.setAttribute("data-id", works.id); // Add a data-id attribute to store the work ID
  deleteIcon.className = "fa-regular fa-trash-can";

  figure.appendChild(figureImage);
  figure.appendChild(figureCaption);
  figure.appendChild(deleteIcon);
  // Ajout d'un event de suppression lors du click sur l'icon supprimer
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    //deleteWorkById(works.id);
  });

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
