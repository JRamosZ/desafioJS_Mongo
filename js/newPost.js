const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
const BASE_URL = "http://localhost:8080";
const token = localStorage.getItem("token") || "";
const payload = token.split(".")[1];
const destructuracion = atob(payload);
const userId = JSON.parse(atob(payload)).id; // atob
const userName = JSON.parse(atob(payload)).userName;

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

let postId = "";

const getPostData = async (postId) => {
  let response = await fetch(`${BASE_URL}/posts/${postId}`); // ESTA LINEA ES LA BUENA
  let data = await response.json();
  return data;
};
const getPostId = () => {
  let params = new URLSearchParams(document.location.search);
  postId = params.get("postId");
  return postId;
};

const verifyEdit = async () => {
  const postEdit = getPostId();
  if (postEdit) {
    const data = await getPostData(postEdit);
    const url = document.querySelector("#postImageURL");
    const postReadTime = document.querySelector("#postReadTime");
    const postTitle = document.querySelector("#postTitle");
    const postTags = document.querySelector("#postTags");
    const postContent = document.querySelector("#postContent");

    url.value = data.data.postImageURL;
    postReadTime.value = data.data.postReadTime;
    postTitle.value = data.data.postTitle;
    postTags.value = data.data.postTags.join(" ");
    postContent.textContent = data.data.postContent;

    return true;
  } else {
    return false;
  }
};

let isEdit = "";
const starterFunction = async () => {
  isEdit = await verifyEdit();
};
// const isEdit = verifyEdit();
starterFunction();

const getNewPostInputs = async () => {
  let post = {};
  let inputs = document.querySelectorAll("input");
  inputs.forEach((item) => {
    if (item.id === "postTags") {
      if (item.value === "") {
        post["postTags"] = ["devto"];
      } else {
        let list = item.value.split(" ").slice(0, 4);
        post["postTags"] = list;
      }
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
      // alert(`El campo ${key} está vacío`);
      Swal.fire({
        title: `El campo ${key} está vacío`,
        icon: "warning",
      });
      return none;
    }
  }
  let date = new Date();
  post["postDateDay"] = date.toDateString().split(" ").slice(2, 3)[0];
  post["postDateMonth"] = date.toDateString().split(" ").slice(1, 2)[0];

  let relevance = Math.ceil(Math.random() * 10);
  post["postRelevance"] = relevance;
  post["postAuthor"] = userName;
  post["postAuthorId"] = userId;
  return post;
};

const saveNewPost = async (post) => {
  let response = "";
  if (isEdit === true) {
    response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  } else if (!isEdit) {
    response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  }

  let data = await response.json();
  if (data.success) {
    //alert("Post guardado con éxito");
    await Swal.fire({
      title: "Post guardado con éxito",
      icon: "success",
    });
    window.location.replace(`../index.html`);
  } else {
    //alert("Post no guardado, intenta nuevamente");
    Swal.fire({
      title: "Post no guardado, intenta nuevamente",
      icon: "error",
    });
  }
  return data;
};

let publishButton = document.getElementById("publishButton");
publishButton.addEventListener("click", async (event) => {
  let post = await getNewPostInputs();
  post ? saveNewPost(post) : null;
});

let indexButton = document.getElementById("indexButton");
indexButton.addEventListener("click", () => {
  window.location.replace(`../index.html`);
});

let closeNewPost = document.getElementById("closeNewPost");
closeNewPost.addEventListener("click", () => {
  window.location.replace(`../index.html`);
});
