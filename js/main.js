const BASE_URL = "http://localhost:8080";
let allPosts = [];

const getAllPosts = async () => {
  let i = 0;
  let response = await fetch(`${BASE_URL}/posts/`);
  let responseObject = await response.json();
  allPosts = responseObject.data;
};

const getAuthorData = async (authorId) => {
  let author = await fetch(`${BASE_URL}/users/${authorId}`);
  let authorData = await author.json();
  return authorData;
};

const insertAutorData = async () => {
  for (post in allPosts) {
    let postAuthor = await getAuthorData(allPosts[post]["postAuthorId"]);
    allPosts[post]["postAuthorImage"] = postAuthor["data"]["userImage"];
  }
};

const starterFunction = async () => {
  await getAllPosts();
  await insertAutorData();
  printAllPostsRelevant("postCard");
  searchFilter(".card-filter", ".cardList");
  getRelevantLatest();
};

starterFunction();

const createCard = (post) => {
  let {
    postAuthor,
    postDateDay,
    postDateMonth,
    postImageURL,
    postTitle,
    postAuthorImage,
    postKey,
    postTags,
    postReadTime,
    postComments,
  } = post;

  let card = document.createElement("div");
  card.classList.add("w-100", "cardList", "mb-2", "border", "rounded");

  let imgCard = document.createElement("img");
  imgCard.setAttribute("src", postImageURL);
  imgCard.classList.add("card-img-top", "w-100", "imgList");

  let divCard = document.createElement("div");
  divCard.classList.add("card", "ps-3", "border-0", "pb-3");

  let divData = document.createElement("div");
  divData.classList.add("data-name");

  let imgAuthor = document.createElement("img");
  imgAuthor.setAttribute("src", postAuthorImage);
  imgAuthor.classList.add("card-img-top", "img-circle");

  let divAuthor = document.createElement("div");
  divAuthor.classList.add("card-body", "pb-1");

  let h5Author = document.createElement("h5");
  h5Author.classList.add("card-title", "name-author");
  namAuthor = document.createTextNode(postAuthor);
  let pAuthor = document.createElement("p");
  pAuthor.classList.add("card-text", "date-author", "text-mute");
  let dateAuthor = document.createTextNode(`${postDateDay} ${postDateMonth}`);

  h5Author.appendChild(namAuthor);
  pAuthor.appendChild(dateAuthor);

  let aTitle = document.createElement("a");
  aTitle.classList.add("ms-5", "h4", "textPointer");
  aTitle.setAttribute("href", `./views/index_post.html?postId=${post["_id"]}`);
  titleText = document.createTextNode(postTitle);
  aTitle.appendChild(titleText);

  let divHashtag = document.createElement("div");
  divHashtag.classList.add("d-flex", "hashtag", "py-2");
  for (key in postTags) {
    let span = document.createElement("span");
    // paragraph2.classList.add("aside-card2__paragraph2")
    divHashtag.appendChild(span);
    let textSpan = document.createTextNode(`#${postTags[key]} `);
    span.appendChild(textSpan);
  }
  divHashtag.classList.add("gap-3");

  let spanReact = document.createElement("span");
  let spanJavascript = document.createElement("span");
  let spanNextjs = document.createElement("span");
  let spanProgramming = document.createElement("span");

  let textReact = document.createTextNode("");
  let textJavascript = document.createTextNode("");
  let textNextjs = document.createTextNode("");
  let textProgramming = document.createTextNode("");
  ///////////////////////////////////////////////////////////
  let divSpan = document.createElement("div");
  divSpan.classList.add(
    "d-flex",
    "justify-content-between",
    "px-lg-5",
    "px-md-4",
    "px-sm-2",
    "align-items-center",
    "flex-wrap"
  );

  let spanContainer = document.createElement("span");
  spanContainer.classList.add("icons_container");

  let spanContainer2 = document.createElement("span");
  spanContainer2.classList.add("readTime_container");

  let spanReaction = document.createElement("span");
  spanReaction.classList.add("reactions", "px-2");
  let textReaction = document.createTextNode("22 Reactions");

  spanReaction.appendChild(textReaction);

  let aComments = document.createElement("a");
  aComments.classList.add("text-decoration-none", "text-black");
  let svgComments = document.createElement("svg");
  svgComments.classList.add("crayons-icon", "w-25");
  let pathComments = document.createElement("patch");

  pathComments.setAttribute(
    "d",
    "M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"
  );

  let aCommentText = document.createTextNode(`${postComments.length} comments`);

  let aReadTime = document.createElement("a");
  aReadTime.classList.add(
    "d-flex",
    "text-decoration-none",
    "text-secondary",
    "align-items-center",
    "gap-1"
  );
  let spanReadTime = document.createElement("span");
  let spanReadTimeText = document.createTextNode(`${postReadTime} min`);
  spanReadTime.appendChild(spanReadTimeText);
  let spanReadTimeSimbol = document.createElement("span");
  spanReadTimeSimbol.classList.add("material-symbols-outlined");
  let spanReadTimeTextSimbol = document.createTextNode("bookmark");
  spanReadTimeSimbol.appendChild(spanReadTimeTextSimbol);
  aReadTime.appendChild(spanReadTime);
  aReadTime.appendChild(spanReadTimeSimbol);

  let spanIcon = document.createElement("span");
  let imgIcon = document.createElement("img");
  imgIcon.setAttribute(
    "src",
    "https://dev.to/assets/fire-f60e7a582391810302117f987b22a8ef04a2fe0df7e3258a5f49332df1cec71e.svg"
  );
  imgIcon.style.width = "18px";
  imgIcon.style.height = "18px";

  let imgIcon2 = document.createElement("img");
  imgIcon2.setAttribute(
    "src",
    "https://dev.to/assets/raised-hands-74b2099fd66a39f2d7eed9305ee0f4553df0eb7b4f11b01b6b1b499973048fe5.svg"
  );
  imgIcon2.style.width = "18px";
  imgIcon2.style.height = "18px";

  let imgIcon3 = document.createElement("img");
  imgIcon3.setAttribute(
    "src",
    "https://dev.to/assets/exploding-head-daceb38d627e6ae9b730f36a1e390fca556a4289d5a41abb2c35068ad3e2c4b5.svg"
  );
  imgIcon3.style.width = "18px";
  imgIcon3.style.height = "18px";

  let imgIcon4 = document.createElement("img");
  imgIcon4.setAttribute(
    "src",
    "https://dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg"
  );
  imgIcon4.style.width = "18px";
  imgIcon4.style.height = "18px";

  let imgIcon5 = document.createElement("img");
  imgIcon5.setAttribute(
    "src",
    "https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg"
  );
  imgIcon5.style.width = "18px";
  imgIcon5.style.height = "18px";

  spanIcon.append(imgIcon, imgIcon2, imgIcon3, imgIcon4, imgIcon5);

  svgComments.appendChild(pathComments);
  aComments.append(svgComments, aCommentText);
  spanContainer.append(spanIcon, spanReaction, aComments);
  spanContainer2.append(aReadTime);
  divSpan.appendChild(spanContainer);
  divSpan.appendChild(spanContainer2);

  spanReact.appendChild(textReact);
  spanJavascript.appendChild(textJavascript);
  spanNextjs.appendChild(textNextjs);
  spanProgramming.appendChild(textProgramming);

  divHashtag.append(spanReact, spanJavascript, spanNextjs, spanProgramming);
  divAuthor.append(h5Author, pAuthor);
  divData.append(imgAuthor, divAuthor);
  divCard.append(divData, aTitle, divHashtag, divSpan);

  card.append(imgCard, divCard);
  return card;
};

const printAllPostsLatest = (listtId) => {
  let latestList = allPosts.slice();
  let list = document.getElementById(listtId);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  latestList.reverse();
  latestList.forEach((item) => {
    let card = createCard(item);
    list.appendChild(card);
  });
};

let latestButton = document.getElementById("latestButton");
latestButton.addEventListener("click", (event) => {
  printAllPostsLatest("postCard");
  event.target.classList.add("fw-bold");
  let topButton = document.getElementById("topButton");
  topButton.classList.remove("fw-bold");
  let relevantButton = document.getElementById("relevantButton");
  relevantButton.classList.remove("fw-bold");
});

const printAllPostsRelevant = (listtId) => {
  let relevantList = allPosts.slice();
  let list = document.getElementById(listtId);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  relevantList.sort(function (a, b) {
    return b.postRelevance - a.postRelevance;
  });
  relevantList.forEach((item) => {
    let card = createCard(item);
    list.appendChild(card);
  });
};

let relevantButton = document.getElementById("relevantButton");
relevantButton.classList.add("fw-bold");
relevantButton.addEventListener("click", (event) => {
  printAllPostsRelevant("postCard");
  event.target.classList.add("fw-bold");
  let topButton = document.getElementById("topButton");
  topButton.classList.remove("fw-bold");
  let latestButton = document.getElementById("latestButton");
  latestButton.classList.remove("fw-bold");
});

const printAllPostsTop = async (listtId) => {
  let topList = allPosts.slice();
  let list = document.getElementById(listtId);
  topList.sort(function (a, b) {
    return a.postReadTime - b.postReadTime;
  });
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (let i = 0; i < topList.length; i++) {
    let card = createCard(topList[i]);
    list.appendChild(card);
  }
};

let topButton = document.getElementById("topButton");
topButton.addEventListener("click", (event) => {
  printAllPostsTop("postCard");
  event.target.classList.add("fw-bold");
  let latestButton = document.getElementById("latestButton");
  latestButton.classList.remove("fw-bold");
  let relevantButton = document.getElementById("relevantButton");
  relevantButton.classList.remove("fw-bold");
});

// const searchBar = ()

const searchFilter = (input, selector) => {
  document.addEventListener("keyup", (event) => {
    if (event.target.matches(input)) {
      document
        .querySelectorAll(selector)
        .forEach((item) =>
          item.textContent
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
            ? item.classList.remove("d-none")
            : item.classList.add("d-none")
        );
    }
  });
};

// Relevant más reciente

const getRelevantLatest = () => {
  let relevantList = allPosts.slice();
  relevantList.reverse();
  relevantList.sort(function (a, b) {
    return b.postRelevance - a.postRelevance;
  });
  let relevantLatestImg = document.getElementById("relevantLatestImg");
  relevantLatestImg.setAttribute("src", relevantList[0]["postImageURL"]);
  let relevantLatestTitle = document.getElementById("relevantLatestTitle");
  relevantLatestTitle.textContent = relevantList[0]["postTitle"];
  relevantLatestTitle.setAttribute(
    "href",
    `./views/index_post.html?postId=${relevantList[0]["_id"]}`
  );
  let relevantLatestContent = document.getElementById("relevantLatestContent");
  let wordsListToAdd = relevantList[0]["postContent"].slice(0, 160) + "...";
  relevantLatestContent.textContent = wordsListToAdd;
  let relevantLatestAuthor = document.getElementById("relevantLatestAuthor");
  relevantLatestAuthor.textContent = relevantList[0]["postAuthor"];
};

// Hashtags

const getHashtagPosts = async (hashtag) => {
  let response = await fetch(`${BASE_URL}/posts/`);
  let postsData = await response.json();
  let postsList = {};
  for (key in postsData.data) {
    for (tag in postsData.data[key]["postTags"]) {
      if (postsData.data[key]["postTags"][tag] === hashtag) {
        postsList[key] = postsData.data[key];
      }
    }
  }
  return postsList;
};

const createHashtagsItems = async () => {
  let hashtagsList1 = await getHashtagPosts("code");
  let hashtagsList2 = await getHashtagPosts("development");
  for (key in hashtagsList1) {
    createHashtag(hashtagsList1[key], hashtagsList1[key]["_id"], "hashList1");
  }
  for (key in hashtagsList2) {
    createHashtag(hashtagsList2[key], hashtagsList2[key]["_id"], "hashList2");
  }
};

const createHashtag = (post, key, fatherId) => {
  let liHash = document.createElement("li");
  liHash.classList.add("list-group-item", "py-3");
  let aHash = document.createElement("a");
  aHash.setAttribute("href", `./views/index_post.html?postId=${key}`);
  let textHash = document.createTextNode(post.postTitle);
  aHash.appendChild(textHash);
  liHash.appendChild(aHash);
  let fatherList = document.getElementById(fatherId);
  fatherList.appendChild(liHash);
};

createHashtagsItems();
