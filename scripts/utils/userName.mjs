export const storeUsername = function (username) {
  localStorage.setItem("username", username);
};

export const getUsername = function () {
  const username = localStorage.getItem("username");
  return username;
};
