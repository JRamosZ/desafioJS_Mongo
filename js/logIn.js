const BASE_URL3 = "https://desafiojs-1edc9-default-rtdb.firebaseio.com/";

let emailInput = document.getElementById("userEmail");
let passwordInput = document.getElementById("userPassword");
let logInButton = document.getElementById("logInButton");

const goToHome = (key) => {
  window.location.replace(`../index.html?userId=${key}`);
};

const checkForUsers = async () => {
  if (emailInput.value === "") {
    alert("El campo Email no puede estar vacío");
    return;
  } else if (passwordInput.value === "") {
    alert("El campo Password no puede estar vacío");
    return;
  }

  let response = await fetch(`${BASE_URL3}/users/.json`);
  let data = await response.json();
  for (let item in data) {
    if (
      data[item]["userEmail"] === emailInput.value &&
      data[item]["userPassword"] === passwordInput.value
    ) {
      goToHome(item);
      return;
    }
  }
  alert("Correo o Contraseña incorrectos");
};

logInButton.addEventListener("click", (event) => {
  checkForUsers();
});
