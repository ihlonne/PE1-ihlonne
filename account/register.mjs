import {
  registerUser,
  registerForm,
} from "../scripts/account/register/register.mjs";

const main = async function () {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(), registerUser();
  });
};

main();
