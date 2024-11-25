import { API_REGISTER } from "../../common/constants.mjs";

export const registerForm = document.querySelector("#register-form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

export const registerUser = async function () {
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const customOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };

    const response = await fetch(API_REGISTER, customOptions);
    const json = response.json;

    window.location.href = "./login.html";
    return json;
  } catch (error) {
    console.log(error);
  }
};
