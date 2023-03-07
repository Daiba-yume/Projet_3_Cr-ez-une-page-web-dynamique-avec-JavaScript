function validateForm() {
  var un = document.loginform.usr.value;
  var pw = document.loginform.pword.value;
  var username = "username";
  var password = "password";
  if (un == username && pw == password) {
    window.location = "login.html";
    return false;
  } else {
    alert("Erreur dans l'identifiant ou le mot de passe");
  }
}

let user = "";
let paswd = "";
