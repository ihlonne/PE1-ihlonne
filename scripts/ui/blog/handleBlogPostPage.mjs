export const handleBlogPostPage = async function (post) {
  const blogPostWrapper = document.querySelector(".blog-article-wrapper");
  blogPostWrapper.innerHTML = "";

  // generate blog post title

  const blogPostHeader = document.createElement("h1");
  blogPostHeader.textContent = post.data.title;

  // generate blog post info

  const blogPostInfoWrapper = document.createElement("div");
  blogPostInfoWrapper.classList.add("article-info-wrapper");

  const blogPostDate = document.createElement("p");

  // convert the api date string to a date object
  const dateString = post.data.created;
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
  blogPostDate.textContent = "Posted: " + formattedDate;

  // generate share button
  const blogPostShare = document.createElement("i");
  blogPostShare.setAttribute("id", "blogPostShare");
  blogPostShare.setAttribute("data-tooltip", "Click to copy URL");
  blogPostShare.classList.add("fa-solid", "fa-share-from-square");
  blogPostShare.addEventListener("click", () => {
    const blogPostUrl = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(blogPostUrl)
      .then(function () {
        // Change the tooltip to a success message
        blogPostShare.setAttribute("data-tooltip", "URL copied!");

        // Reset the tooltip message after 3 seconds
        setTimeout(() => {
          blogPostShare.setAttribute("data-tooltip", "Click to copy URL");
        }, 3000);
      })
      .catch(function (err) {
        // Set failure message in the tooltip
        blogPostShare.setAttribute("data-tooltip", "Failed to copy");
        console.error("Could not copy text: ", err);

        // Reset the tooltip message after 3 seconds
        setTimeout(() => {
          blogPostShare.setAttribute("data-tooltip", "Click to copy URL");
        }, 3000);
      });
  });

  const blogPostAuthor = document.createElement("p");
  blogPostAuthor.textContent =
    "Author: " +
    post.data.author.name.charAt(0).toUpperCase() +
    post.data.author.name.slice(1);

  // append blog post info to wrapper

  blogPostInfoWrapper.append(
    blogPostDate,
    blogPostShare,
    blogPostShare,
    blogPostAuthor
  );

  // generate blog post banner

  const blogPostBannerWrapper = document.createElement("div");
  blogPostBannerWrapper.classList.add("article-banner");

  const blogPostBanner = document.createElement("img");
  blogPostBanner.src = post.data.media.url;
  blogPostBanner.alt = post.data.media.alt;

  // append to blog post banner wrapper

  blogPostBannerWrapper.append(blogPostBanner);

  // generate blog post body

  const blogPostBodyWrapper = document.createElement("div");
  blogPostBodyWrapper.classList.add("article-content-wrapper");

  const blogPostBody = document.createElement("p");
  blogPostBody.textContent = post.data.body;

  // generate tags

  const tagsWrapper = document.createElement("div");
  tagsWrapper.classList.add("blog-post-tags-wrapper");
  tagsWrapper.textContent = `Tags: `;

  post.data.tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.classList.add("blog-post-tags");
    tag.textContent = tagText;
    tagsWrapper.append(tag);
  });

  // append to blog post body wrapper

  blogPostBodyWrapper.append(blogPostBody);

  blogPostWrapper.append(
    blogPostHeader,
    blogPostInfoWrapper,
    blogPostBannerWrapper,
    blogPostBodyWrapper,
    tagsWrapper
  );
};
