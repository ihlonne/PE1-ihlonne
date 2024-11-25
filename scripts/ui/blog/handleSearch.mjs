import { allBlogPosts, postsPerPage } from "../../../blog/index.mjs";
import { displayBlogPosts } from "./displayBlogPosts.mjs";
import { setupPagination } from "./handlePagination.mjs";

// Function to add search functionality
export const addSearchEventListener = function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Listen for changes in the input field
  searchInput.addEventListener("input", () => {
    filterPosts(searchInput.value.trim());
  });

  // Listen for "Enter" key press on input
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      filterPosts(searchInput.value.trim());
    }
  });

  // Listen for "Search" button click
  searchButton.addEventListener("click", () => {
    filterPosts(searchInput.value.trim());
  });
};

// Filter posts based on search query
const filterPosts = function (query) {
  if (!query) {
    // If query is empty, reset to all posts
    displayBlogPosts({ data: allBlogPosts }, 1, postsPerPage);
    setupPagination(allBlogPosts.length, postsPerPage);
    return;
  }

  // Filter posts based on title or content
  const filteredPosts = allBlogPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
    const contentMatch =
      post.content && post.content.toLowerCase().includes(query.toLowerCase());
    return titleMatch || contentMatch;
  });

  // Display filtered posts
  displayBlogPosts({ data: filteredPosts }, 1, postsPerPage);
  setupPagination(filteredPosts.length, postsPerPage);
};
