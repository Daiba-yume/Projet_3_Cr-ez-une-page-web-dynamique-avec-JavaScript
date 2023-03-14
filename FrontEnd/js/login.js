let form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("test");

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
    })
    .then((data) => {
      console.log(data);
      // stoker les info dans le localStorage
    })
    .catch((error) => {
      console.log(error);
    });
});
