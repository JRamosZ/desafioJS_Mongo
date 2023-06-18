/*hamburger botton*/
function deployMenuNav() {
  let navlateral = document.querySelector("#navlateralOpen");
  let hamburgerBotton = document.querySelector("#hamburgerButton");
  hamburgerBotton.addEventListener("click", () => {
    navlateral.classList.toggle("d-none");
  });
}
deployMenuNav();

/*close botton*/
function closeMenuNav() {
  let navlateral = document.querySelector("#navlateralOpen");
  let closeBotton = document.querySelector("#navlateralClose_post");
  closeBotton.addEventListener("click", () => {
    navlateral.classList.add("d-none");
  });
}
closeMenuNav();

// Getting data

const token = localStorage.getItem("token") || "";
let id = (userImage = userNickName = userName = null);
if (token !== "") {
  const payload = token.split(".")[1];
  const destructuracion = atob(payload);
  id = JSON.parse(destructuracion).id;
  userImage = JSON.parse(destructuracion).userImage;
  userNickName = JSON.parse(destructuracion).userNickName;
  userName = JSON.parse(destructuracion).userName;
}

const notLogged = document.getElementById("notLoggedDiv");
const loggedIn = document.getElementById("loggedIn");

if (!id) {
  notLogged.classList.add("nav_bar_conteiner_login_one");
  loggedIn.classList.add("visually-hidden");
} else {
  notLogged.classList.add("visually-hidden");
  loggedIn.classList.add("nav_bar_conteiner_login");
}

const buttonsNewPostFunctionality = () => {
  let createPostButtonList = document.querySelectorAll(".create-post");
  createPostButtonList.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (window.location.pathname === "/index.html") {
        console.log("click");
        window.location.replace(`./views/newPost.html`);
      } else if (window.location.pathname === "/views/index_post.html") {
        console.log("aqui");
        window.location.replace(`./newPost.html`);
      }
    });
  });
};

const printUserData2 = async () => {
  let user = document.getElementById("userDropName");
  user.textContent = userName;
  let userNick = document.getElementById("userDropNick");
  userNick.textContent = `@${userNickName}`;
  let userProfilePicture = document.getElementById("userImgNavbar");
  userProfilePicture.setAttribute("src", userImage);
  buttonsNewPostFunctionality();
};

printUserData2();

let indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", () => {
  console.log(window.location.pathname);
  window.location.replace(`../index.html`);
});

const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", (event) => {
  if (window.location.pathname === "/index.html") {
    localStorage.clear();
    window.location.replace("./views/login.html");
  } else if (window.location.pathname === "/views/index_post.html") {
    localStorage.clear();
    window.location.replace("./login.html");
  }
});

const logInButton = document.getElementById("logIn");
logInButton.addEventListener("click", (event) => {
  window.location.replace("./views/login.html");
});

const registerButton = document.getElementById("createAccount");
registerButton.addEventListener("click", (event) => {
  window.location.replace("./views/register.html");
});
