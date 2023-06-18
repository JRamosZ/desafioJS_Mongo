const BASE_URL3 = "http://localhost:8080";
let userId = "";

const getPostId = () => {
  let params = new URLSearchParams(document.location.search);
  postId = params.get("postId");
  return postId;
};

const getUsertId = () => {
  let params = new URLSearchParams(document.location.search);
  userId = params.get("userId");
  if (userId === null) {
    window.location.replace(`./views/login.html`);
  } else {
    return userId;
  }
};

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

  // let asideCard2 = document.getElementById("asideCard2")
  // asideCard2.appendChild(anchor)
  // console.log(asideCard2)
  // return asideCard2
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
