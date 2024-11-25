import { displayPostsToEdit } from "../scripts/ui/edit-page/displayPostsToEdit.mjs";
import { getAllBlogPosts } from "../scripts/utils/getAllBlogPosts.mjs";
import { handleLoginLogout } from "../scripts/ui/navbar/handleNavbar.mjs";
import { hideLoader, showLoader } from "../scripts/ui/common/loader.mjs";
import { handleUsername } from "../scripts/ui/navbar/handleUsername.mjs";
import { closeModal } from "../scripts/ui/edit-page/handleModal.mjs";
import { handleSubmit } from "../scripts/ui/edit-page/handleBlogPosts.mjs";

const blogPostForm = document.querySelector("#blog-post-form");
const closeModalButton = document.querySelector(".close-button i");

const main = async function () {
  try {
    showLoader();

    const blogPosts = await getAllBlogPosts();
    displayPostsToEdit(blogPosts);
    handleLoginLogout();
    handleUsername();

    closeModalButton.addEventListener("click", () => {
      closeModal();
    });

    blogPostForm.addEventListener("submit", handleSubmit);
  } catch (error) {
    displayMessage(
      ".blog-posts-list",
      "danger",
      "Failed to load posts. Please try again later."
    );
    console.error("Error displaying carousel posts:", error);
  } finally {
    hideLoader();
  }
};
main();
