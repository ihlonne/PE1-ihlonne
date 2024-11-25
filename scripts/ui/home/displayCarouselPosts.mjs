// Import the displayMessage function
import { displayMessage } from "../common/displayMessage.mjs";
import { initializeCarousel } from "./handleCarousel.mjs";

const carouselTextCharacterLimit = function (text, maxCharacters) {
  if (text.length > maxCharacters) {
    return text.slice(0, maxCharacters) + "...";
  }

  return text;
};

export const displayCarouselPosts = async function (posts) {
  const carouselWrapper = document.querySelector(".carousel__track");

  // Check if the wrapper exists in the DOM
  if (!carouselWrapper) {
    console.error("Carousel wrapper not found");
    return;
  }

  // Clear existing content in the carousel
  carouselWrapper.innerHTML = "";

  try {
    // Check if posts are available and not empty
    if (!posts || !posts.data || posts.data.length === 0) {
      displayMessage(
        ".carousel__track-wrapper",
        "warning",
        "No posts available to display."
      );
      return;
    }

    // Limit the number of posts to display
    posts.data.slice(0, 3).forEach((item) => {
      // Create a list item for the carousel card
      const carouselCard = document.createElement("li");
      carouselCard.classList.add("carousel__slide");

      // Create the banner wrapper
      const carouselBannerWrapper = document.createElement("div");
      carouselBannerWrapper.classList.add("carousel__banner");

      // Create the link wrapping the banner
      const carouselBannerUrl = document.createElement("a");
      carouselBannerUrl.href = `post/index.html?id=${item.id}`;

      // Create the image element
      const carouselBanner = document.createElement("img");
      carouselBanner.src = item.media.url;
      carouselBanner.alt = item.media.alt;
      carouselBanner.draggable = false;

      // Append image to link and link to banner wrapper
      carouselBannerUrl.append(carouselBanner);
      carouselBannerWrapper.append(carouselBannerUrl);

      // Create the info wrapper
      const carouselCardInfoWrapper = document.createElement("div");
      carouselCardInfoWrapper.classList.add("carousel__slide-info");

      // Create the header element
      const carouselHeader = document.createElement("h4");
      carouselHeader.textContent = item.title;

      // Create the text element with limited characters
      const carouselText = document.createElement("p");
      const limitedText = carouselTextCharacterLimit(item.body, 100);
      carouselText.textContent = limitedText;

      // Create the link element
      const carouselLink = document.createElement("a");
      carouselLink.textContent = "Read More";
      carouselLink.href = `/post/index.html?id=${item.id}`;

      // Append elements to the card and card to the wrapper
      carouselCardInfoWrapper.append(
        carouselHeader,
        carouselText,
        carouselLink
      );
      carouselCard.append(carouselBannerWrapper, carouselCardInfoWrapper);
      carouselWrapper.append(carouselCard);
    });

    // Initialize carousel behavior
    initializeCarousel();
  } catch (error) {
    // Display an error message if something goes wrong
    displayMessage(
      ".carousel__track-wrapper",
      "danger",
      "Failed to load posts. Please try again later."
    );
    console.error("Error displaying carousel posts:", error);
  }
};
