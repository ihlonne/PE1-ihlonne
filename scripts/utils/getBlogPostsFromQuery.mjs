// Save unique ID from selected blog post

export const getBlogPostIdFromQuery = async function () {
  const urlParam = new URLSearchParams(window.location.search);
  return urlParam.get("id");
};
