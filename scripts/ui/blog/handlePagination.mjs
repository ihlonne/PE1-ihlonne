import { getAllBlogPosts } from "../../utils/getAllBlogPosts.mjs";
import { hideLoader, showLoader } from "../common/loader.mjs";
import { displayBlogPosts } from "./displayBlogPosts.mjs";

// Pagination state object
export const paginationState = {
  currentPage: 1,
};

// Function to set up pagination controls
export const setupPagination = function (totalPosts, postsPerPage) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Create Previous and Next buttons
  const paginationWrapper = document.querySelector(".pagination-wrapper");
  paginationWrapper.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = paginationState.currentPage === 1;
  prevButton.addEventListener("click", () =>
    changePage(paginationState.currentPage - 1, postsPerPage)
  );

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = paginationState.currentPage === totalPages;
  nextButton.addEventListener("click", () =>
    changePage(paginationState.currentPage + 1, postsPerPage)
  );

  paginationWrapper.append(prevButton, nextButton);
};

// Function to handle page change, now with `postsPerPage` as a parameter
export const changePage = async function (page, postsPerPage) {
  showLoader();

  const blogPosts = await getAllBlogPosts();
  paginationState.currentPage = page;

  displayBlogPosts(blogPosts, paginationState.currentPage, postsPerPage);
  setupPagination(blogPosts.data.length, postsPerPage);

  window.scrollTo({ top: 0, behavior: "smooth" });

  hideLoader();
};
