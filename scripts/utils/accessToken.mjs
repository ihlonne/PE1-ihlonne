// Create function that will store the access token

export const storeAccessToken = function (accessToken) {
  localStorage.setItem("accessToken", accessToken);
};

// Create function that retrievers the access token

export const getAccessToken = function () {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};
