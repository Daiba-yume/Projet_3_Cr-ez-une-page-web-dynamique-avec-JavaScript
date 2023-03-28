// Get the modal
createModal();

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function createModal() {
  const myModal = document.createElement("div");
  myModal.setAttribute("id", "myModal");
  myModal.setAttribute("class", "modal");

  const content = document.createElement("div");
  content.setAttribute("class", "modal-content");

  const close = document.createElement("span");
  close.setAttribute("class", "close");
  close.textContent = "X";

  const text = document.createElement("p");
  text.textContent = "Some text in the Modal..";
  content.appendChild(text);
  content.appendChild(close);
  myModal.appendChild(content);

  const section = document.getElementById("introduction");
  section.appendChild(myModal);
}

// Empêche le click à l'intérieur du contenu (donc pas de prop vers les parents)
const stopPropagation = function (e) {
  e.stopPropagation();
};
