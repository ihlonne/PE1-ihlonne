import { getAccessToken } from "../../utils/accessToken.mjs";
import { deleteBlogPost } from "./deleteBlogPost.mjs";
import { openCreateForm, openEditForm } from "./handleBlogPosts.mjs";

export const displayPostsToEdit = async function (posts) {
  const postsOuterWrapper = document.querySelector(".blog-posts-list");
  const postsWrapper = document.querySelector(".list-of-posts");
  postsOuterWrapper.innerHTML = "";
  postsWrapper.innerHTML = "";

  const confirmDeleteModal = document.querySelector(".delete-modal");

  if (getAccessToken()) {
    // generate new post button outside of the loop
    const newPostButtonWrapper = document.createElement("div");
    newPostButtonWrapper.classList.add("new-post-button-wrapper");

    const newPostButton = document.createElement("button");
    newPostButton.classList.add("new-post-button");

    const newPostButtonPlusIcon = document.createElement("i");
    newPostButtonPlusIcon.classList.add("fa-solid", "fa-plus");
    newPostButton.append(newPostButtonPlusIcon, "New Post");
    newPostButton.addEventListener("click", () => {
      openCreateForm();
    });

    newPostButtonWrapper.append(newPostButton);

    // append newPostButtonWrapper to the postsOuterWrapper before the loop
    postsOuterWrapper.append(newPostButtonWrapper);

    // now loop through posts and generate list items
    posts.data.map((post) => {
      // generate list item
      const listItem = document.createElement("li");
      listItem.setAttribute("id", post.id);

      // generate list item div
      const listItemDiv = document.createElement("div");

      // generate list item header
      const listItemHeader = document.createElement("h2");
      listItemHeader.textContent = post.title;

      // generate icons wrapper
      const iconsWrapper = document.createElement("div");
      iconsWrapper.classList.add("edit-options");

      // generate icons
      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-btn");
      editIcon.addEventListener("click", async () => {
        openEditForm(post.id);
      });

      // Assuming `post` is defined correctly when creating each item
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash", "delete-btn");

      // Each trash icon needs to know the specific post ID it's related to
      trashIcon.addEventListener("click", () => {
        // Store the post ID on the confirm delete button for reference later

        confirmDeleteModal.dataset.postId = post.id; // Attach post id to modal
        confirmDeleteModal.classList.remove("hidden");
      });

      // Handle delete button click on modal
      const deleteButton = document.querySelector("#yes");
      deleteButton.addEventListener("click", async () => {
        try {
          // Get the specific post ID attached to the modal
          const postIdToDelete =
            document.querySelector(".delete-modal").dataset.postId;
          const isDeleted = await deleteBlogPost(postIdToDelete);

          if (isDeleted) {
            // Post successfully deleted from server, now remove from DOM
            const listItemToRemove = document.querySelector(
              `[data-post-id="${postIdToDelete}"]`
            );
            if (listItemToRemove) {
              listItemToRemove.remove();
              window.location.reload();
              confirmDeleteModal.classList.add("hidden");
            }
          } else {
            console.log("Error deleting post");
          }
        } catch (error) {
          console.log("Error:", error.message);
        }
      });

      const dontDeleteButton = document.querySelector("#no");
      dontDeleteButton.addEventListener("click", () => {
        confirmDeleteModal.classList.add("hidden");
      });

      iconsWrapper.append(editIcon, trashIcon);
      listItemDiv.append(listItemHeader, iconsWrapper);
      listItem.append(listItemDiv);

      postsWrapper.append(listItem);
    });

    postsOuterWrapper.append(postsWrapper);
  } else {
    const loginButtonWrapper = document.createElement("div");
    loginButtonWrapper.classList.add("login-button-wrapper");

    const loginButton = document.createElement("a");
    loginButton.href = "../../../account/login.html";
    loginButton.textContent = "Log in";

    loginButtonWrapper.append(loginButton);
    postsOuterWrapper.append(loginButtonWrapper);
  }
};
