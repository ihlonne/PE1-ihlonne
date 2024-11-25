export const displayMessage = function (wrapper, messageType, message) {
  let parent = wrapper;

  if (typeof wrapper === "string") {
    parent = document.querySelector(wrapper);
  }

  if (!parent) {
    console.error(`Parent element not found for selector: ${wrapper}`);
    return;
  }

  parent.innerHTML = `
    <div class="alert alert-${messageType}" role="alert">${message}</div>
    `;
};
