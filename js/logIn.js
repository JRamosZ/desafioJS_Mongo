const BASE_URL3 = "http://localhost:8080";

let emailInput = document.getElementById("userEmail");
let passwordInput = document.getElementById("userPassword");
let logInBtn = document.getElementById("logInButton");

const checkForUsers = async () => {
  if (emailInput.value === "") {
    // alert("El campo Email no puede estar vacío");
    Swal.fire({
      title: "El campo Email no puede estar vacío",
      icon: "warning",
    });
    return;
  } else if (passwordInput.value === "") {
    // alert("El campo Password no puede estar vacío");
    Swal.fire({
      title: "El campo Password no puede estar vacío",
      icon: "warning",
    });
    return;
  }
  const body = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  let response = await fetch(`${BASE_URL3}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data = await response.json();
  if (!data.success) {
    // alert("No pudimos iniciar sesion");
    Swal.fire({
      title: "No pudimos iniciar sesion",
      icon: "error",
    });
    return;
  } else {
    await Swal.fire({
      title: "Bienvenido",
      icon: "success",
      timer: 1500,
    });
  }

  //alert("Haz iniciado sesion");

  // Guardamos token en el local storage;
  localStorage.setItem("token", data.token);

  //   Redirigimos a inicio
  window.location.replace(`../index.html`);
};

logInBtn.addEventListener("click", (event) => {
  checkForUsers();
});

const logInButton = document.getElementById("logIn");
logInButton.addEventListener("click", (event) => {
  window.location.replace("./login.html");
});

const registerButton = document.getElementById("createAccount");
registerButton.addEventListener("click", (event) => {
  window.location.replace("./register.html");
});

const indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", (event) => {
  window.location.replace("../index.html");
});
