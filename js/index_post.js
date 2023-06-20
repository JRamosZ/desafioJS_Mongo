const BASE_URL3 = "http://localhost:8080";
userId = "";

const getPostId = () => {
  let params = new URLSearchParams(document.location.search);
  postId = params.get("postId");
  return postId;
};

const tokenUser = localStorage.getItem("token") || "";
const payloadUser = tokenUser.split(".")[1];

let userIdToken = "";
if (payloadUser) {
  userIdToken = JSON.parse(atob(payloadUser)).id; // atob
}
const getPostData = async (postId) => {
  let response = await fetch(`${BASE_URL3}/posts/${postId}`); // ESTA LINEA ES LA BUENA
  let data = await response.json();
  return data;
};

const getUserData = async (UserId) => {
  let response = await fetch(`${BASE_URL3}/users/${UserId}`);
  let data = await response.json();
  return data;
};

const fillAllData = async () => {
  let postId = getPostId();
  let postData = await getPostData(postId);
  let postAuthorData = await getUserData(postData["data"]["postAuthorId"]);
  let imagePost = document.getElementById("cardMainImagePost");
  imagePost.setAttribute("src", postData.data.postImageURL);
  let nameAutor = document.getElementById("author-name");
  nameAutor.textContent = postData.data.postAuthor;
  let datePost = document.getElementById("posted-date");
  datePost.textContent = `Posted on ${postData.data.postDateMonth} ${postData.data.postDateDay}`;
  let textPost = document.getElementById("titlePost");
  textPost.textContent = postData.data.postTitle;
  let pageTitle = document.getElementById("pageTitle");
  pageTitle.textContent = postData.data.postTitle;
  let contentPost = document.getElementById("postContent");
  contentPost.textContent = postData.data.postContent;
  let authorImage = document.getElementById("authorImage");
  authorImage.setAttribute("src", postAuthorData.data.userImage);
  let dropdownMenuButton1 = document.getElementById("dropdownMenuButton1");
  dropdownMenuButton1.textContent = `Top comments (${postData.data.postComments.length})`;
  if (tokenUser !== "") {
    let commentTextAreaImg = document.getElementById("commentTextAreaImg");
    commentTextAreaImg.setAttribute(
      "src",
      JSON.parse(atob(payloadUser)).userImage
    );
  }
  if (userIdToken === postAuthorData.data._id) {
    let btnContainer = document.getElementById("btnContainer");
    btnContainer.classList.remove("visually-hidden");

    document
      .getElementById("btnDelete")
      .addEventListener("click", async (event) => {
        let response = await fetch(`${BASE_URL3}/posts/${postData.data._id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${tokenUser}` },
        });
        let data = await response.json();
        if (data.success) {
          //alert("Post Eliminado con éxito");
          await Swal.fire({
            title: "Post Eliminado con éxito",
            icon: "success",
            timer: 1500,
          });
          window.location.replace("../index.html");
        } else {
          //alert("Post No eliminado");
          await Swal.fire({
            title: "Post No eliminado",
            icon: "success",
            timer: 1500,
          });
        }
      });

    document.getElementById("btnEdit").addEventListener("click", (event) => {
      window.location.replace(`./newPost.html?postId=${postId}`);
    });
  }
  let commentFrame = "";
  postData.data.postComments = postData.data.postComments.reverse();
  for (let index in postData.data.postComments) {
    commentFrame += `<div class="comments__comment">
    <div class="comments__comment__profile">
        <button class="b3">
            <img src="${postData.data.postComments[index].commentAuthorImg}" alt="">
        </button>
        <button class="b4">
            <img src="https://cdn-icons-png.flaticon.com/512/84/84263.png" alt="">
        </button>
    </div>
    <div class="comments__comment_text">
        <div class="comments__comment_text__box">
            <div class="comments__comment_text__head">
                <div class="author">
                    <button class="b5">
                        <b>${postData.data.postComments[index].commentAuthorName}</b>
                    </button>
                    <p>~</p>
                    <button class="b6">
                        ${postData.data.postComments[index].commentDate}
                    </button>
                </div>
                <div class="button">
                    <button class="b7">
                        ...
                    </button>
                </div>
            </div>
        
            <div>
                <p>${postData.data.postComments[index].commentText}</p>
            </div>
        </div>
        <div class="comment__reactions">
            <button><p><img src="https://cdn-icons-png.flaticon.com/512/535/535285.png" alt=""> 6 likes</p></button>
            <button><p><img src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png" alt=""> Reply</p></button>
        </div>
    </div>
  </div>`;
    let divPostComments = document.getElementById("postComments");
    divPostComments.innerHTML = commentFrame;
  }
};

fillAllData();

const fillUserCardData = async () => {
  let postId = getPostId();
  let postData = await getPostData(postId);
  let postAuthorData = await getUserData(postData.data.postAuthorId);
  let authorPhoto = document.getElementById("asideCard1AuthorImg");
  authorPhoto.setAttribute("src", postAuthorData.data.userImage);
  let authorPostName = document.getElementById("asideCard1AuthorName");
  authorPostName.textContent = `${postAuthorData.data.userName} ${postAuthorData.data.userLastname}`;
  let authordescription = document.getElementById("asideCard1Description");
  authordescription.textContent = postAuthorData.data.userdescription;
  let authorLocation = document.getElementById("asideCard1Location");
  authorLocation.textContent = postAuthorData.data.userLocation;
  let authorEducation = document.getElementById("asideCard1Education");
  authorEducation.textContent = postAuthorData.data.userEducation;
  let authorDateJoined = document.getElementById("asideCard1Joined");
  authorDateJoined.textContent = postAuthorData.data.userJoined;
  for (let i = 0; i < postData.data.postTags.length; i++) {
    let tag = document.getElementById(`tag${i + 1}`);
    let text = document.createTextNode(postData.data.postTags[i]);
    tag.appendChild(text);
  }
  for (let i = postData.data.postTags.length; i < 4; i++) {
    let tag = document.getElementById(`tag${i + 1}`);
    tag.classList.add("visually-hidden");
  }
};

fillUserCardData();

// <!-- <a href="#" class="aside-card2__anchor2">
//     <p class="aside-card2__paragraph1">Join the WeCoded Virtual Meetup 🌟</p>
//     <p class="aside-card2__paragraph2">#wecoded&nbsp;&nbsp;#meta</p>
// </a>

const createCard2Aside = (userPost, postKey) => {
  let { postTitle, postTags } = userPost;

  let paragraph1 = document.createElement("p");
  paragraph1.classList.add("aside-card2__paragraph1");
  let textParagraph1 = document.createTextNode(postTitle);
  paragraph1.appendChild(textParagraph1);

  let divTags = document.createElement("div");
  divTags.classList.add("d-flex");
  for (key in postTags) {
    let paragraph2 = document.createElement("p");
    paragraph2.classList.add("aside-card2__paragraph2");
    divTags.appendChild(paragraph2);
    let textParagraph2 = document.createTextNode(`#${postTags[key]} `);
    paragraph2.appendChild(textParagraph2);
  }
  divTags.classList.add("gap-3");
  let anchor = document.createElement("a");
  user = userId;
  anchor.setAttribute("href", `index_post.html?postId=${postKey}`);
  anchor.classList.add("aside-card2__anchor2");

  anchor.appendChild(paragraph1);
  anchor.appendChild(divTags);

  return anchor;
};

const getAllPosts = async () => {
  let response = await fetch(`${BASE_URL3}/posts/`);
  let postsData = await response.json();
  return postsData;
};
const printAllAnchors = async () => {
  let allPosts = await getAllPosts();
  let asideCard2 = document.getElementById("asideCard2");
  let asideCard2Author = document.getElementById("asideCard2Author");
  let postId = getPostId();
  let postData = await getPostData(postId);
  asideCard2Author.textContent = postData.data.postAuthor;
  for (key in allPosts.data) {
    if (postData.data.postAuthor === allPosts.data[key].postAuthor) {
      if (allPosts.data[key]._id !== postId) {
        let response = allPosts.data[key];
        let card = createCard2Aside(response, allPosts.data[key]._id);
        asideCard2.appendChild(card);
      }
    }
  }
};
printAllAnchors();

/*nav side index post close-and-open*/
function deployMenuNavPost() {
  let navlateralPost = document.querySelector("#navSide_post");
  let hamburgerBottonPost = document.querySelector("#hamburgerButton");
  hamburgerBottonPost.addEventListener("click", () => {
    navlateralPost.classList.toggle("openNavPost");
  });
}
deployMenuNavPost();

function closeMenuNavPost() {
  let navlateralPost = document.querySelector("#navSide_post");
  let hamburgerBottonPost = document.querySelector("#navlateralClose_post");
  hamburgerBottonPost.addEventListener("click", () => {
    navlateralPost.classList.toggle("openNavPost");
  });
}
closeMenuNavPost();

// Funcionalidad Extra [Flujo de comentarios]

const getCommentData = () => {
  let commentContent = document.getElementById("commentContent").value;
  if (commentContent === "") {
    return false;
  } else {
    let commentData = {
      commentAuthorId: JSON.parse(atob(payloadUser)).id,
      commentAuthorImg: JSON.parse(atob(payloadUser)).userImage,
      commentAuthorName: JSON.parse(atob(payloadUser)).userName,
      commentDate: new Date().toDateString(),
      commentText: commentContent,
    };
    return commentData;
  }
};

if (tokenUser === "") {
  let commentTextArea = document.getElementById("commentTextArea");
  commentTextArea.classList.add("visually-hidden");
} else {
  let commentSubmit = document.getElementById("commentSubmit");
  commentSubmit.addEventListener("click", async () => {
    let commentData = getCommentData();
    if (commentData) {
      let postId = getPostId();
      let response = await fetch(`${BASE_URL3}/complements/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: JSON.stringify(commentData),
      });
      let postsData = await response.json();
      if (postsData.success) {
        window.location.replace(`./index_post.html?postId=${postId}`);
      } else {
        Swal.fire({
          title: "Error al subir el comentario",
          icon: "error",
        });
      }
    }
  });
}
