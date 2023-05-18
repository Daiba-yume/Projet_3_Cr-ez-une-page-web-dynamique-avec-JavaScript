// Show and hide modal //

// Récupération des éléments du DOM en utilisant leur ID ou leur classe//
const editProjects = document.getElementById("editProject");
const modal = document.getElementById("modal");
const modalClose = document.querySelector("#modal-close");
const modalReturn = document.querySelector("#modal-return");
const modalGallery = document.querySelector(".modalGallery");
const modalAjout = document.querySelector(".modalAjout");
const newPhoto = document.getElementById("new-photo");

// gérer le clic //
editProjects.addEventListener("click", function (event) {
  const modalContent = document.querySelector(".listGallery");
  modalContent.innerHTML = "";
  const contentEdit = editAllProjects();
  modalContent.appendChild(contentEdit);

  showModal();
});

modalClose.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  hideModal(event);
});
newPhoto.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  hideGallery();
});
modalReturn.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  hideAjout();
});

function showModal() {
  modal.style.display = "flex";
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// création de la gallery photo dans la modal //
function editAllProjects() {
  const galleryPhoto = document.createElement("div");
  galleryPhoto.setAttribute("class", "gallery-photo");

  // boucler sur le tableau et creer la liste des element
  allProjects.forEach((element) => {
    const card = createOneCard(element);
    galleryPhoto.appendChild(card);
  });

  // retourne finalement une dv globale qui contient que le content de edit
  return galleryPhoto;
}

// création des cards //
function createOneCard(works) {
  const figure = document.createElement("figure");
  figure.setAttribute("class", "gallery-photo-card");
  figure.setAttribute("data-id", works.id); // Add a data-id to store works.is

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
  deleteIcon.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    deleteWorkById(works.id);
  });
  figure.appendChild(deleteIcon);

  const figureCaption = document.createElement("figcaption");
  figureCaption.setAttribute("class", "editer");
  figureCaption.textContent = "éditer";
  figure.appendChild(figureCaption);

  return figure;
}

// Select category //
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

// Suppression de la galerie
function deleteGallery() {
  const token = localStorage.getItem("access_token");
  const galleryWorks = document.querySelectorAll(
    ".gallery-modal figure, .gallery figure"
  );
  galleryWorks.innerHTML = "";
  const workIds = Array.from(galleryWorks).map((galleryWork) =>
    galleryWork.getAttribute("data-id")
  );

  fetch("http://localhost:5678/api/works/batch-delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ workIds }),
  })
    .then((response) => {
      if (response.status === 204) {
        galleryWorks.forEach((galleryWork) => {
          galleryWork.remove();
        });
        alert("La galerie a été supprimée avec succès !");
      } else {
        alert("La suppression de la galerie a échoué !");
      }
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la suppression :",
        error
      );
      alert("Une erreur s'est produite lors de la suppression de la galerie.");
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

// ...

//DELETE WORK FROM API//

function deleteWorkById(worksId) {
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer ce travail ?"
  );
  if (confirmation) {
    deleteFromAPI(worksId);
  }
}

// suppression de tout les travaux dans la galerie grâce à l'ID
function deleteGallery() {
  const galleryWorks = document.querySelectorAll(
    ".gallery-modal figure, .gallery figure"
  );

  galleryWorks.forEach((galleryWork) => {
    const workId = galleryWork.getAttribute("data-id");
    deleteFromAPI(workId);
  });
}
// Delete work //
function deleteFromAPI(idWork) {
  console.log(idWork);
  const token = localStorage.getItem("access_token");

  fetch(`http://localhost:5678/api/works/${idWork}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status !== 204) {
        alert("La supression du travail a échoué!");
      } else {
        // supprimer l'element depuis le tableau des all project

        allProjects = allProjects.filter((element) => element.id !== idWork);

        //Supprimer le projet depuis la gallery modal
        const listFigureModal = document.querySelectorAll(
          ".gallery-photo-card"
        );
        listFigureModal.forEach((element) => {
          if (element.dataset.id == idWork) {
            element.remove();
          }
        });
        //Supprimer le projet depuis la gallery globale
        const listFigureGallery = document.querySelectorAll(".listGallery");
        listFigureGallery.forEach((element) => {
          console.log;
          if (element.dataset.id == idWork) {
            element.remove();
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Une erreur est survenue !! ");
    });
}

//Check form filled//
const titleInput = document.getElementById("modal-photo-title");
const categorySelect = document.getElementById("modal-photo-category");
const imageInput = document.getElementById("file");
const submitButton = document.getElementById("modal-valider");
function checkForm() {
  if (
    titleInput.value !== "" &&
    categorySelect.value !== "" &&
    imageInput.value !== ""
  ) {
    submitButton.style.backgroundColor = "#1D6154";
  } else {
    submitButton.style.backgroundColor = "";
  }
}
titleInput.addEventListener("input", checkForm);
categorySelect.addEventListener("change", checkForm);
imageInput.addEventListener("change", checkForm);

// Add new Work
const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);
function addNewWork(event) {
  event.preventDefault();
  const token = localStorage.getItem("access_token");
  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;
  const image = document.getElementById("file").files[0];
  if (!title || !category || !image) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  // créer un objet contenant les données du formulaire
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      Content: "multipart/form-data",
    },
  })
    .then((response) => {
      if (response.status == 201) return response.json();
    })
    .then((work) => {
      allProjects.push(work);
      //create and add the new work to the gallery//
      const figure = displayProject(work);
      const gallery = document.querySelector(".gallery");
      gallery.appendChild(figure);
      //create and add the new work to the modal gallery//
      const figureModal = createOneCard(work);
      const galleryModal = document.querySelector(".gallery-photo");
      galleryModal.appendChild(figureModal);
      hideAjout();
      alert("Le nouveau travail a été ajouté avec succès.");
    })
    .catch((error) => {
      console.error(error);
      alert("Une erreur est survenue ");
    });
}

/* PREVIEW IMAGE */
function previewImage(e) {
  const imagePreview = document.getElementById("imgAjout");

  const file = e.target.files[0]; // Vérifie si un fichier a été sélectionné
  if (file) {
    if (file.type.match("image.*")) {
      if (file.size <= 4194304) {
        // verifier la taille de l'image
        var reader = new FileReader();
        reader.onload = function (event) {
          imagePreview.src = event.target.result;
          imagePreview.style.display = "block";
          document.querySelector(".fa-image").style.display = "none";
          document.getElementById("buttonloadFile").style.display = "none";
          document.getElementById("file").style.display = "none";
          document.querySelector(".detailsImg").style.display = "none";
        };
        reader.readAsDataURL(file);
      } else {
        alert("Le fichier dépasse la taille maximale autorisée de 4 Mo.");

        imagePreview.style.display = "none";
        document.querySelector(".fa-image").style.display = "block";
        document.getElementById("buttonloadFile").style.display = "block";
        document.getElementById("file").style.display = "block";
        document.querySelector(".detailsImg").style.display = "block";
        removeImageButton.style.display = "none";
      }
    } else {
      alert("Le fichier sélectionné n'est pas une image.");

      imagePreview.style.display = "none";
      document.querySelector(".fa-image").style.display = "block";
      document.getElementById("buttonloadFile").style.display = "block";
      document.getElementById("file").style.display = "block";
      document.querySelector(".detailsImg").style.display = "block";
      removeImageButton.style.display = "none";
    }
  } else {
    imagePreview.style.display = "none";
    document.querySelector(".fa-image").style.display = "block";
    document.getElementById("buttonloadFile").style.display = "block";
    document.getElementById("file").style.display = "block";
    document.querySelector(".detailsImg").style.display = "block";
    removeImageButton.style.display = "none";
  }
}
