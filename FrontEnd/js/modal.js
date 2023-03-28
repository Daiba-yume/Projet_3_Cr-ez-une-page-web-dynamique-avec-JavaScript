// Show and hide modal //
const editProfile = document.getElementById("editProfile");
const modal = document.querySelector("#modal");
editProfile.addEventListener("click", function (event) {
  const contentEdit = editContentModal();
  const modalContent = document.querySelector("#modal-content");
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

  // retourne finalement une dv globale qui contient que le content de edit
  return div;
}

function createProjectContentModal() {
  // creer en javascript les element pour l'ajout d'un projet
  // photo
  // titre
  // liste des categorie
  // retourne finalement une dv globale qui contient que le visuel de create Project
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
