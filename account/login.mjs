import { loginUser, loginForm } from "../scripts/account/login/login.mjs";

const main = async function () {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(), loginUser();
  });
};

main();
