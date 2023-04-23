// Show and hide modal //
const editProjects = document.getElementById("editProject");
const modal = document.getElementById("modal");
const modalClose = document.querySelector("#modal-close");
const modalReturn = document.querySelector("#modal-return");
const modalGallery = document.querySelector(".modalGallery");
const modalAjout = document.querySelector(".modalAjout");
const newPhoto = document.getElementById("new-photo");

editProjects.addEventListener("click", function (event) {
  const modalContent = document.querySelector(".listGallery");
  const contentEdit = editAllProjects();
  modalContent.appendChild(contentEdit);

  //fillCategories();
  showModal();
});

modalClose.addEventListener("click", hideModal);
newPhoto.addEventListener("click", hideGallery);
modalReturn.addEventListener("click", hideAjout);

function showModal() {
  modal.style.display = "block";
}
function hideModal() {
  modal.style.display = "none";
}
function hideGallery() {
  modalGallery.style.display = "none";
  modalAjout.style.display = "flex";
  console.log(modalReturn);
  modalReturn.style.visibility = "unset";
}
function hideAjout() {
  modalGallery.style.display = "flex";
  modalAjout.style.display = "none";
  modalReturn.style.visibility = "hidden";
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
    // event.stopPropagation();
    // event.preventDefault();
    deleteWorkById(works.id);
  });
  figure.appendChild(deleteIcon);

  const figureCaption = document.createElement("figcaption");
  figureCaption.setAttribute("class", "editer");
  figureCaption.textContent = "éditer";
  figure.appendChild(figureCaption);

  return figure;
}

function fillCategories() {
  const selectCategory = document.getElementById("modal-photo-category");

  listCategories.forEach((category) => {
    console.log(category);
    const categoryOption = document.createElement("option");

    categoryOption.setAttribute("value", category.id);
    categoryOption.setAttribute("text", category.name);
    selectCategory.appendChild(categoryOption);
  });
}
//DELETE WORK//
function deleteWorkById(worksId) {
  const token = localStorage.getItem("access_token");
  /*
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer ce travail ?"
  );*/
  //if (confirmation)
  {
    fetch(`http://localhost:5678/api/works/${worksId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status !== 204) {
          alert("La supression du travail à echoué!");
        } else {
          console.log("test");
          // supprimer l'element depuis le tableau des all project
          //let pos =allProjects.findIndex((element) => (element.id == ${worksId}));
          // allProjects.slice(pos, 1);
          allProjects = allProjects.filter((element) => element.id !== worksId);
          /*
          //sinon eliminer le projet depuis la modale
          const modalWorkToRemove = document.querySelector(
            `figure[data-id="${worksId}"]`
          );
          if (modalWorkToRemove) {
            //modalWorkToRemove.remove();
          }
          console.log("test2");
          //Supprimer le projet depuis la gallery

          const galleryWorkToRemove = document.querySelector(
            `figure[data-id="${worksId}"]`
          );
          if (galleryWorkToRemove) {
            // galleryWorkToRemove.remove();
          }*/
        }
      })
      .catch((error) => console.error(error));
  }
}

//Delete all gallery//
/*
function deleteGallery() {
  const token = localStorage.getItem("token");
  const galleryWorks = document.querySelectorAll(
    ".gallery-modal figure, .gallery figure"
  );
  galleryWorks.forEach((galleryWork) => {
    const workId = galleryWork.getAttribute("data-id");
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        Content: "multipart/form-data",
      },
    });
    galleryWork.remove();
  });
}

document
  .getElementById("delete-gallery")
  .addEventListener("click", function () {
    const confirmation = confirm(
      "Êtes-vous sûr de vouloir supprimer la galerie ?"
    );
    if (confirmation) {
      deleteGallery();
    }
  });

function createOneProject() {}

// // Add new Work
// const btnValider = document.getElementById("modal-valider");
// btnValider.addEventListener("click", addNewWork);
// function addNewWork(event) {
//   event.preventDefault();
//   const token = localStorage.getItem("access_token");
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
//       Content: "multipart/form-data",
//     },
//   })
//     .then((response) => response.json())
//     .then((works) => {
//       //create and add the new work to the gallery//
//       const figure = displayProject(works);
//       const gallery = document.querySelector(".gallery");
//       gallery.appendChild(figure);
//       //create and add the new work to the modal gallery//
//       const figureModal = createOneCard(works);
//       const galleryModal = document.querySelector(".content-modal");
//       galleryModal.appendChild(figureModal);
//       alert("Le nouveau travail a été ajouté avec succès.");
//     })
//     .catch((error) => console.error(error));
// }
*/
