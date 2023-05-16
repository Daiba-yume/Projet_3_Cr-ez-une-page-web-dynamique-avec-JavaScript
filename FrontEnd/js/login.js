// LOGIN FORM

let form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("test");
  // récupération des champs puis stocké
  let email = document.getElementById("email").value;
  console.log(email);
  let password = document.getElementById("password").value;
  console.log(password);

  let options = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  };

  fetch("http://localhost:5678/api/users/login", options)
    .then((response) => {
      console.log(response);
      if (response.ok) return response.json();
      if (response.status == 401) {
        alert("Erreur dans l'identifiant ou le mot de passe");
        return null;
      }
    })
    .then((data) => {
      if (data != null) {
        console.log(data);

        // stoker les info dans le localStorage
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("userId", data.userId);
        // redirection
        window.location.href = "./index.html";
      }
    })
    .catch((error) => {
      console.log(error);
      alert(
        "Une erreur est survenue ! Veuillez contacter l'administrateur du site ! "
      );
    });
});
