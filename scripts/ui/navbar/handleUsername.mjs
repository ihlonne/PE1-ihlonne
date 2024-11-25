import { getUsername } from "../../utils/userName.mjs";

// Adds name that is saved to local local storage by signing in, to the navbar

const welcomeDiv = document.querySelector(".navbar__left");
welcomeDiv.innerHTML = "";

export const handleUsername = async function () {
  const listItem = document.createElement("li");
  const pItem = document.createElement("p");
  pItem.textContent = `Welcome back, ${getUsername()}!`;

  listItem.append(pItem);
  welcomeDiv.append(listItem);
};
