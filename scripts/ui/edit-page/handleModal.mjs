const blogPostForm = document.querySelector(".editor-wrapper");

export const openModal = function () {
  blogPostForm.classList.remove("hidden");
};

export const closeModal = function () {
  blogPostForm.classList.add("hidden");
};
