import { displayMessage } from "../common/displayMessage.mjs";

export const displayBlogPosts = async function (
  posts,
  currentPage = 1,
  postsPerPage = 5
) {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  cardsWrapper.innerHTML = "";

  if (!cardsWrapper) {
    console.log("Cards wrapper not found");
    return;
  }

  try {
    if (!posts || !posts.data || posts.data.length === 0) {
      displayMessage(
        ".cards-wrapper",
        "warning",
        "No posts available to display"
      );
      return;
    }

    // Calculate start and end index for the current page
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedPosts = posts.data.slice(startIndex, endIndex);

    // Generate and display the paginated posts
    paginatedPosts.map((item) => {
      const blogPostCard = document.createElement("div");
      blogPostCard.classList.add("card");

      const blogPostBannerWrapper = document.createElement("div");

      const blogPostCardA = document.createElement("a");
      blogPostCardA.href = `/post/index.html?id=${item.id}`;

      const blogPostBanner = document.createElement("img");
      blogPostBanner.src = item.media.url;
      blogPostBanner.alt = item.media.alt;

      blogPostCardA.append(blogPostBanner);
      blogPostBannerWrapper.append(blogPostCardA);

      const blogPostDate = document.createElement("p");

      const dateString = item.created;
      const dateObject = new Date(dateString);

      const day = dateObject.getUTCDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[dateObject.getUTCMonth()];
      const year = dateObject.getUTCFullYear();

      const formattedDate = `${day} ${month}, ${year}`;
      blogPostDate.textContent = formattedDate;

      const blogPostTitle = document.createElement("h2");
      blogPostTitle.textContent = item.title;

      const blogPostLink = document.createElement("a");
      blogPostLink.href = `/post/index.html?id=${item.id}`;
      blogPostLink.textContent = "Read More";

      blogPostCard.append(
        blogPostBannerWrapper,
        blogPostDate,
        blogPostTitle,
        blogPostLink
      );
      cardsWrapper.appendChild(blogPostCard);
    });
  } catch (error) {
    displayMessage(
      ".cards-wrapper",
      "danger",
      "Failed to load posts. Please try again later."
    );
    console.error("Error displaying carousel posts:", error);
  }
};
