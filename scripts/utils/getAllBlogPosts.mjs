import { BLOG_POSTS_API_ENDPOINT } from "../common/constants.mjs";
import { fetchData } from "./fetchData.mjs";

export const getAllBlogPosts = async function () {
  try {
    const json = await fetchData(BLOG_POSTS_API_ENDPOINT);
    return json;
  } catch (e) {
    console.log(e);
  }
};
