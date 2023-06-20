const BASE_URL4 = "http://localhost:8080";

const dataValidation = async () => {
  let inputs = document.querySelectorAll("form input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      // alert(`El campo ${inputs[i].name} no puede estar vacío`);
      Swal.fire({
        title: `El campo ${inputs[i].name} no puede estar vacío`,
        icon: "warning",
      });
      return;
    }
  }
  if (inputs[4].value !== inputs[5].value) {
    //alert(`Los campos de contraseña no coinciden`);
    Swal.fire({
      title: "Los campos de contraseña no coinciden",
      icon: "error",
    });
    return;
  }
  // Exitoso
  const schoolsArray = [
    "UCR & UPC BarcelonaTech",
    "UBA Universidad",
    "PUCP: Pontificia Universidad Católica del Perú",
    "Universidad de Guadalajara",
    "Instituto Politécnico Nacional",
    "UNAM",
    "UAG",
    "Universidad La Salle",
  ];

  const locationsArray = [
    "México",
    "USA",
    "Perú",
    "Argentina",
    "Canada",
    "Colombia",
    "España",
  ];

  const date = new Date().toString();
  const userDate = `${date.split(" ")[1]} ${date.split(" ")[2]}, ${
    date.split(" ")[3]
  }`;
  const body = {
    userEducation:
      schoolsArray[Math.floor(Math.random() * schoolsArray.length)],
    userEmail: inputs[3].value,
    userImage: inputs[2].value,
    userJoined: userDate,
    userLastname: inputs[1].value,
    userLocation:
      locationsArray[Math.floor(Math.random() * locationsArray.length)],
    userName: inputs[0].value,
    userNickName: `${inputs[1].value.slice(0, 3).toLowerCase()}${inputs[0].value
      .slice(0, 3)
      .toLowerCase()}`,
    userPassword: inputs[4].value,
  };

  let response = await fetch(`${BASE_URL4}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data = await response.json();
  if (!data.success) {
    // alert("No pudimos registrar usuario");
    Swal.fire({
      title: "No pudimos registrar usuario",
      icon: "error",
    });
    return;
  } else {
    await Swal.fire({
      title: "Usuario Registrado",
      icon: "success",
      timer: 1500,
    });
  }
  // alert("Usuario Registrado");
  const logInBody = {
    email: body.userEmail,
    password: body.userPassword,
  };
  let response2 = await fetch(`${BASE_URL4}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logInBody),
  });
  let data2 = await response2.json();
  if (!data2.success) {
    //alert("No pudimos iniciar sesion");
    Swal.fire({
      title: "No pudimos iniciar sesión",
      icon: "error",
    });
    window.location.replace(`./login.html`);
    return;
  }
  // Guardamos token en el local storage;
  localStorage.setItem("token", data2.token);

  window.location.replace(`../index.html`);
};

const registerBtn = document.getElementById("registerButton");
registerBtn.addEventListener("click", (event) => {
  dataValidation();
  //   window.location.replace("./login.html");
});

// Nav Bar
const logInButton = document.getElementById("logIn");
logInButton.addEventListener("click", (event) => {
  window.location.replace("./login.html");
});

const createAccountBtn = document.getElementById("createAccount");
createAccountBtn.addEventListener("click", (event) => {
  window.location.replace("./register.html");
});

const indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", (event) => {
  window.location.replace("../index.html");
});
