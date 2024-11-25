import { getAccessToken } from "../utils/accessToken.mjs";
import { getUsername } from "../utils/userName.mjs";

const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_LOGIN = `${API_BASE_URL}/auth/login`;

const REGISTERED_BLOG_NAME = getUsername();
const DEFAULT_USERNAME = "knittingcasually";

export const BLOG_POSTS_API_ENDPOINT = `${API_BASE_URL}/blog/posts/${
  getAccessToken() ? REGISTERED_BLOG_NAME : DEFAULT_USERNAME
}`;
