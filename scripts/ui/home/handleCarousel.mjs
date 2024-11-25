// This code is borrowed from Code Nepal as I followed his tutorial to create the carousel
// Video used: https://www.youtube.com/watch?v=6QE8dXq9SOE&t=631s

export const initializeCarousel = function () {
  const carousel = document.querySelector(".carousel");
  const arrowButtons = document.querySelectorAll(
    ".carousel-wrapper__buttons button"
  );
  const firstCardWidth = carousel.querySelector(".carousel__slide").offsetWidth;
  const carouselChildren = [...carousel.children];

  let isDragging = false,
    startX,
    startScrollLeft;
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Clone the first and last set of cards for infinite scroll effect
  carouselChildren
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildren.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Add event listeners to buttons for scroll control
  arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      carousel.scrollLeft +=
        button.id === "button-left" ? -firstCardWidth : firstCardWidth;
    });
  });

  // Dragging functionality
  const dragStart = function (e) {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = function (e) {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = function () {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = function () {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
};
