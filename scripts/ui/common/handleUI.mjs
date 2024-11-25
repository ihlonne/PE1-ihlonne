export const handleUI = function () {
  const header = document.querySelector(".navigation");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("change");
    } else {
      header.classList.remove("change");
    }
  });
};
