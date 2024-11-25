import { BLOG_POSTS_API_ENDPOINT } from "../../common/constants.mjs";
import { getAccessToken } from "../../utils/accessToken.mjs";
import { fetchData } from "../../utils/fetchData.mjs";
import { showLoader, hideLoader } from "../common/loader.mjs";
import { openModal, closeModal } from "./handleModal.mjs";

const blogPostForm = document.querySelector("#blog-post-form");
const titleInput = document.querySelector("#blog-title");
const urlInput = document.querySelector("#blog-image-url");
const altInput = document.querySelector("#blog-image-alt");
const bodyInput = document.querySelector("#blog-body");
const tagInput = document.querySelector("#blog-tags");

let isEditMode = false;
let currentPostId = null;

export const openCreateForm = function () {
  isEditMode = false;
  currentPostId = null;
  resetForm();
  blogPostForm.querySelector(".publish-button").textContent = "Create Post";
  openModal();
};

export const openEditForm = async function (id) {
  isEditMode = true;
  currentPostId = id;
  blogPostForm.querySelector(".publish-button").textContent = "Edit post";

  try {
    const postData = await fetchData(`${BLOG_POSTS_API_ENDPOINT}/${id}`);
    titleInput.value = postData.data.title;
    urlInput.value = postData.data.media.url;
    altInput.value = postData.data.media.alt;
    bodyInput.value = postData.data.body;
    tagInput.value = postData.data.tags.join(", ");

    openModal();
  } catch (error) {
    console.error("Error fetching post for editing:", error);
  }
};

const resetForm = () => {
  blogPostForm.reset();
};

export const handleSubmit = async function (event) {
  event.preventDefault();

  const blogPost = {
    title: titleInput.value,
    body: bodyInput.value,
    tags: tagInput.value.split(",").map((tag) => tag.trim()),
    media: {
      url: urlInput.value,
      alt: altInput.value,
    },
  };

  try {
    showLoader();

    const options = {
      method: isEditMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(blogPost),
    };

    const response = await fetchData(
      isEditMode
        ? `${BLOG_POSTS_API_ENDPOINT}/${currentPostId}`
        : BLOG_POSTS_API_ENDPOINT,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to submit blog post.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }

  window.location.reload();
  closeModal();
};
