import { API_LOGIN } from "../../common/constants.mjs";
import { getAccessToken, storeAccessToken } from "../../utils/accessToken.mjs";
import { storeUsername } from "../../utils/userName.mjs";

export const loginForm = document.querySelector("#login-form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");

export const loginUser = async function () {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic input validation
  if (!name || !email || !password) {
    alert("Please fill out all fields.");
    return; // Stop the function from proceeding
  }

  // Email validation: must end with @stud.noroff.no
  const emailPattern = /^[^\s@]+@stud\.noroff\.no$/;
  if (!emailPattern.test(email)) {
    alert(
      "Please enter a valid Noroff student email (must end with @stud.noroff.no)."
    );
    return; // Stop the function from proceeding
  }

  try {
    const customOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    };

    const response = await fetch(API_LOGIN, customOptions);
    const json = await response.json();

    if (response.ok) {
      // Success: handle login
      const editPanel = "../../post/edit.html";

      storeAccessToken(json.data.accessToken);
      storeUsername(json.data.name);

      fetch(editPanel, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }).then(() => {
        window.location.href = editPanel;
      });
    } else {
      // If user does not exist or there is an error, show error message
      if (
        json.message === "User not found" ||
        json.message === "Invalid credentials"
      ) {
        alert("User does not exist. Please check your credentials.");
      } else {
        alert(json.message || "Login failed. Please try again.");
      }
    }
  } catch (e) {
    console.log(e);
    alert("An error occurred. Please try again later.");
  }
};
