import { getAccessToken } from "../../utils/accessToken.mjs";

const loginOrLogoutDiv = document.querySelector(".navbar__right");
loginOrLogoutDiv.innerHTML = "";

// Checks if there is an access token to determine whether there should be a login link or logout link

export const handleLoginLogout = async function () {
  // i wanted to try and create a ternary operator
  // since i'm quite comfortable with if/else
  getAccessToken()
    ? (() => {
        const listItem = document.createElement("li");
        const linkItem = document.createElement("a");
        linkItem.textContent = "Logout";

        listItem.append(linkItem);
        loginOrLogoutDiv.append(listItem);
        linkItem.addEventListener("click", () => {
          localStorage.clear();
          linkItem.href = "/";
        });
      })()
    : (() => {
        const listItem = document.createElement("li");
        const linkItem = document.createElement("a");
        linkItem.textContent = "Login";

        listItem.append(linkItem);
        loginOrLogoutDiv.append(listItem);
        linkItem.addEventListener("click", () => {
          linkItem.href = "../account/login.html";
        });
      })();
};
