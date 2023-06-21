/*open botton menu mobile*/
function deployMenuNav() {
  let navlateral = document.querySelector("#navlateralOpen");
  let hamburgerBotton = document.querySelector("#hamburgerButton");
  hamburgerBotton.addEventListener("click", () => {
    navlateral.classList.toggle("d-none");
  });
}
deployMenuNav();

/*close botton menu mobile*/
function closeMenuNav() {
  let navlateral = document.querySelector("#navlateralOpen");
  let closeBotton = document.querySelector("#navlateralClose_post");
  closeBotton.addEventListener("click", () => {
    navlateral.classList.add("d-none");
  });
}
closeMenuNav();

/*block scroll*/
function blockScroll() {
  let bodyBlock = document.querySelector("body");
  let hamburgerButton = document.querySelector("#hamburgerButton");
  hamburgerButton.addEventListener("click", () => {
    bodyBlock.classList.toggle("block");
  });
}
blockScroll();

function enableScroll() {
  let bodyBlock = document.querySelector("body");
  let closeButton = document.querySelector("#navlateralClose_post");
  closeButton.addEventListener("click", () => {
    bodyBlock.classList.toggle("block");
  });
}
enableScroll();

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

const buttonsNewPostFunctionality = () => {
  let createPostButtonList = document.querySelectorAll(".create-post");
  createPostButtonList.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (window.location.pathname === "/index.html") {
        window.location.replace(`./views/newPost.html`);
      } else if (window.location.pathname === "/views/index_post.html") {
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

const notLogged = document.getElementById("notLoggedDiv");
const loggedIn = document.getElementById("loggedIn");

if (!id) {
  notLogged.classList.add("nav_bar_conteiner_login_one");
  loggedIn.classList.add("visually-hidden");
} else {
  printUserData2();
  notLogged.classList.add("visually-hidden");
  loggedIn.classList.add("nav_bar_conteiner_login");
}
// printUserData2();

let indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", () => {
  window.location.replace(`../index.html`);
});

const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", (event) => {
  if (window.location.pathname === "/index.html") {
    localStorage.clear();
    window.location.replace("./views/login.html");
  } else {
    localStorage.clear();
    window.location.replace("./login.html");
  }
});

const logInButton = document.getElementById("logIn");
logInButton.addEventListener("click", (event) => {
  if (window.location.pathname === "/index.html") {
    window.location.replace("./views/login.html");
  } else {
    window.location.replace("./login.html");
  }
});

const registerButton = document.getElementById("createAccount");
registerButton.addEventListener("click", (event) => {
  if (window.location.pathname === "/index.html") {
    window.location.replace("./views/register.html");
  } else {
    window.location.replace("./register.html");
  }
});
