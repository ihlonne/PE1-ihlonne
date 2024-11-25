import { getAllBlogPosts } from "./scripts/utils/getAllBlogPosts.mjs";
import { displayCarouselPosts } from "./scripts/ui/home/displayCarouselPosts.mjs";
import { handleUI } from "./scripts/ui/common/handleUI.mjs";
import { hideLoader, showLoader } from "./scripts/ui/common/loader.mjs";
import { handleLoginLogout } from "./scripts/ui/navbar/handleNavbar.mjs";

const main = async function () {
  handleUI();
  handleLoginLogout();
  try {
    showLoader();

    const blogPosts = await getAllBlogPosts();
    displayCarouselPosts(blogPosts);
  } catch (error) {
    displayMessage(
      ".carousel__track-wrapper",
      "danger",
      "Failed to load posts. Please try again later."
    );
    console.error("Error displaying carousel posts:", error);
  } finally {
    hideLoader();
  }
};

main();
