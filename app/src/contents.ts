import dayjs from "dayjs";

const replaceRelativeTime = () => {
  document.querySelectorAll<HTMLElement>("relative-time").forEach((element) => {
    element.shadowRoot!.innerHTML = dayjs(
      element.getAttribute("datetime")
    ).format("YYYY-MM-DD HH:mm");

    if (element.parentElement!.className !== "react-directory-commit-age")
      return;

    const parentWidth =
      element.parentElement!.clientWidth -
      +element.parentElement!.style.paddingLeft.replace("px", "");

    for (let size = 14; size > 9 && getWidth(element) > parentWidth; --size)
      element.style.fontSize = `${size}px`;
  });
};

const getWidth = (element: Element) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context!.font = getComputedStyle(element).font;
  return context!.measureText(element.shadowRoot!.innerHTML).width;
};

setTimeout(replaceRelativeTime, 0.5 * 1000);
setInterval(replaceRelativeTime, 10 * 1000);
