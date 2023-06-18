const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
const BASE_URL = "htt://localhost:8080";
let userId = "";

let textBlock1 = document.getElementById("popText1");
let textBlock2 = document.getElementById("popText2");
let textBlock3 = document.getElementById("popText3");

document.getElementById("postTitle").addEventListener("click", () => {
  textBlock1.classList = [];
  textBlock2.classList.add("visually-hidden");
  textBlock3.classList.add("visually-hidden");
});

document.getElementById("postTags").addEventListener("click", () => {
  textBlock1.classList.add("visually-hidden");
  textBlock2.classList = [];
  textBlock3.classList.add("visually-hidden");
});

document.getElementById("postContent").addEventListener("click", () => {
  textBlock1.classList.add("visually-hidden");
  textBlock2.classList.add("visually-hidden");
  textBlock3.classList = [];
});

const getNewPostInputs = async () => {
  let post = {};
  let inputs = document.querySelectorAll("input");
  inputs.forEach((item) => {
    if (item.id === "postTags") {
      let list = item.value.split(" ").slice(0, 4);
      post["postTags"] = list;
    } else if (item.id === "postReadTime") {
      post["postReadTime"] = Number(item.value);
    } else {
      post[item.id] = item.value;
    }
  });
  let postContent = document.querySelector("textarea");
  post[postContent.id] = postContent.value;

  for (key in post) {
    if (post[key] === "") {
      alert(`El campo ${key} está vacío`);
      return none;
    }
  }
  let date = new Date();
  post["postDateDay"] = date.toDateString().split(" ").slice(2, 3)[0];
  post["postDateMonth"] = date.toDateString().split(" ").slice(1, 2)[0];

  let relevance = Math.ceil(Math.random() * 10);
  post["postRelevance"] = relevance;

  let userKey = getUserId();
  let data = await getUserData(userKey);
  post["postAuthor"] = `${data.userName} ${data.userLastname}`;
  post["postAuthorId"] = userKey;
  console.log(post);
  return post;
};

const saveNewPost = async (post) => {
  let response = await fetch(`${BASE_URL}/posts/.json`, {
    method: "POST",
    body: JSON.stringify(post),
  });

  let data = await response.json();
  console.log(data);
  return data;
};

let publishButton = document.getElementById("publishButton");
publishButton.addEventListener("click", async (event) => {
  let post = await getNewPostInputs();
  post ? saveNewPost(post) : null;
  alert("Post guardado con éxito");
  window.location.replace(`../index.html?userId=${userId}`);
});

const getUserId = () => {
  let params = new URLSearchParams(document.location.search);
  userId = params.get("userId");
  return userId;
};

const getUserData = async (userId) => {
  let response = await fetch(`${BASE_URL}/users/${userId}.json`);
  let data = await response.json();
  console.log(data);
  return data;
};

let indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", () => {
  window.location.replace(`../index.html?userId=${userId}`);
});

let closeNewPost = document.getElementById("closeNewPost");
closeNewPost.addEventListener("click", () => {
  window.location.replace(`../index.html?userId=${userId}`);
});

getUserId();
