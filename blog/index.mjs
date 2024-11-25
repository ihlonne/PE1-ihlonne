import { displayMessage } from "../scripts/ui/common/displayMessage.mjs";
import { getAllBlogPosts } from "../scripts/utils/getAllBlogPosts.mjs";
import { displayBlogPosts } from "../scripts/ui/blog/displayBlogPosts.mjs";
import { hideLoader, showLoader } from "../scripts/ui/common/loader.mjs";
import { handleLoginLogout } from "../scripts/ui/navbar/handleNavbar.mjs";
import {
  setupPagination,
  paginationState,
} from "../scripts/ui/blog/handlePagination.mjs";
import { addSearchEventListener } from "../scripts/ui/blog/handleSearch.mjs";

// Global variables for pagination
paginationState.currentPage = 1;
export const postsPerPage = 12; // Adjust the number of posts per page as needed

// Global variable to store all posts
export let allBlogPosts = [];

const main = async function () {
  try {
    showLoader();

    const blogPosts = await getAllBlogPosts();
    allBlogPosts = blogPosts.data; // Store all posts globally

    // Display the first page of posts
    displayBlogPosts(
      { data: allBlogPosts },
      paginationState.currentPage,
      postsPerPage
    );

    // Create pagination buttons
    setupPagination(allBlogPosts.length, postsPerPage);

    handleLoginLogout();

    // Add search event listener
    addSearchEventListener();
  } catch (error) {
    displayMessage(
      ".cards-wrapper",
      "danger",
      "Failed to load posts. Please try again later."
    );
    console.error("Error displaying carousel posts:", error);
  } finally {
    hideLoader();
  }
};

main();
