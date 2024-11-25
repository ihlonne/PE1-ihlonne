import { BLOG_POSTS_API_ENDPOINT } from "../scripts/common/constants.mjs";
import { handleBlogPostPage } from "../scripts/ui/blog/handleBlogPostPage.mjs";
import { fetchData } from "../scripts/utils/fetchData.mjs";
import { getBlogPostIdFromQuery } from "../scripts/utils/getBlogPostsFromQuery.mjs";
import { showLoader, hideLoader } from "../scripts/ui/common/loader.mjs";
import { handleLoginLogout } from "../scripts/ui/navbar/handleNavbar.mjs";

const main = async function () {
  handleLoginLogout();
  try {
    showLoader();
    const id = await getBlogPostIdFromQuery();
    const blogPostUrl = `${BLOG_POSTS_API_ENDPOINT}/${id}`;

    const blogPost = await fetchData(blogPostUrl);
    handleBlogPostPage(blogPost);
  } catch (error) {
    displayMessage(
      ".blog-article-wrapper",
      "danger",
      "Failed to load posts. Please try again later."
    );
    console.error("Error displaying carousel posts:", error);
  } finally {
    hideLoader();
  }
};

main();
