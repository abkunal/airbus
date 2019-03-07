let url = "https://l4ukon2x0i.execute-api.us-east-1.amazonaws.com/";

export const Get = urlPath => {
  return fetch(url + urlPath).then(response => response.json());
};

export const Post = (urlPath, body) => {
  return fetch(url + urlPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
};

/**
 * prod/newsfeed = to fetch the news feed
 */
