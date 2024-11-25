import { BLOG_POSTS_API_ENDPOINT } from "../../common/constants.mjs";
import { getAccessToken } from "../../utils/accessToken.mjs";
import { fetchData } from "../../utils/fetchData.mjs";

export const deleteBlogPost = async function (id) {
  const blogPostUrl = `${BLOG_POSTS_API_ENDPOINT}/${id}`;

  try {
    const response = await fetchData(blogPostUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    // If response is null, it means 204 No Content (successful deletion)
    if (response === null) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error deleting the blog post:", error.message);
    return false;
  }
};
