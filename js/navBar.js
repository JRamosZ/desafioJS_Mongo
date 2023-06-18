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

/**/
const BASE_URL2 = "https://desafiojs-1edc9-default-rtdb.firebaseio.com";
let userId2 = "";

const getUserId2 = () => {
  let params = new URLSearchParams(document.location.search);
  userId = params.get("userId");
  return userId;
};

const getUserData2 = async (userId) => {
  let response = await fetch(`${BASE_URL2}/users/${userId}.json`);
  let data = await response.json();
  return data;
};

const printUserData2 = async () => {
  let userNumber = getUserId2();
  let data = await getUserData2(userNumber);
  let user = document.getElementById("userDropName");
  user.textContent = `${data.userName} ${data.userLastname}`;
  let userNick = document.getElementById("userDropNick");
  userNick.textContent = `@${data.userNickName}`;
  let userProfilePicture = document.getElementById("userImgNavbar");
  userProfilePicture.setAttribute("src", data.userImage);
  buttonsNewPostFunctionality();
};

printUserData2();

const buttonsNewPostFunctionality = () => {
  let createPostButtonList = document.querySelectorAll(".create-post");
  createPostButtonList.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (window.location.pathname === "/index.html") {
        window.location.replace(`./views/newPost.html?userId=${userId}`);
      } else if (window.location.pathname === "/views/index_post.html") {
        console.log("aqui");
        window.location.replace(`./newPost.html?userId=${userId}`);
      }
    });
  });
};

let indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", () => {
  window.location.replace(`../index.html?userId=${userId}`);
});

const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", (event) => {
  if (window.location.pathname === "/index.html") {
    window.location.replace("./views/login.html");
  } else if (window.location.pathname === "/views/index_post.html") {
    console.log("aqui");
    window.location.replace("./login.html");
  }
});
