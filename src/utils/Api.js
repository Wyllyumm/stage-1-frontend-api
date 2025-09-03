/*const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

function request(url, options) {
  return fetch(`${newsApiBaseUrl}/${url}`, options).then(checkResponse);
} */

const checkResponse = (res) => {
  /*try cons log here*/
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

/* real api request logic
function saveArticle(id , token) {
  return request(`saved-news/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function removeSavedArticle(id , token ) {
  return request(`saved-news/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`, 
    },
  });
}

function getItems() {
  return request(`saved-news`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}  */

// makeshift logic for interacting with db.json
const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(`${baseUrl}/${url}`, options).then(checkResponse);
}

function getItems() {
  return request(`savedNewsArticles`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function addCardLike(article) {
  // article is a result from the NewsAPI
  return fetch(`http://localhost:3001/savedNewsArticles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

function removeCardLike(article) {
  return fetch(`http://localhost:3001/savedNewsArticles/${article._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

function getArticle(article) {
  return fetch(`http://localhost:3001/savedNewsArticles?url=${article.url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

export {
  getArticle,
  checkResponse,
  request,
  addCardLike,
  removeCardLike,
  getItems,
};
