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
      localStorage.setItem("access_token", data.token);

      localStorage.setItem("userId", data.userId);

      window.location.href = "/FrontEnd/";
    })
    .catch((error) => {
      console.log(error);
      alert("Veuillez introduire un login et mot de passe valides ! ");
    });

  const formLog = document.querySelector(".logout-tab");

  formLog.addEventListener("click", function (event) {
    event.preventDefault();
    window.localStorage.clear();

    window.location.href = "login.html";

    const user = window.localStorage.getItem("token");
    console.log(user);
    const login = document.querySelector(".login-tab");
    const logout = document.querySelector(".logout-tab");

    if (user) {
      logout.style.display = "block";
    } else {
      login.style.display = "block";
    }
  });
});
