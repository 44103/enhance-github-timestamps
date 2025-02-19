import dayjs from "dayjs";

const replaceRelativeTime = () => {
  document.querySelectorAll<HTMLElement>("relative-time").forEach((element) => {
    element.shadowRoot!.innerHTML = dayjs(
      element.getAttribute("datetime")
    ).format("YYYY-MM-DD HH:mm");

    const age = new Date(element.getAttribute("datetime")!).getTime();
    const now = new Date().getTime();

    switch (true) {
      case now - age < 86400000: // 1day
        setDecoration(element, "#39d353");
        break;
      case now - age < 86400000 * 7: // 1week
        setDecoration(element, "#26a641");
        break;
      case now - age < 86400000 * 30: // 1month
        setDecoration(element, "#006d32");
        break;
      case now - age < 86400000 * 30 * 6: // 6months
        setDecoration(element, "#0e4429");
        break;
    }

    if (element.parentElement!.className !== "react-directory-commit-age")
      return;

    const parentWidth =
      element.parentElement!.clientWidth -
      +getComputedStyle(element.parentElement!).paddingRight.replace("px", "");

    for (let size = 14; size > 9 && getWidth(element) > parentWidth; --size)
      element.style.fontSize = `${size}px`;
  });
};

const setDecoration = (element: HTMLElement, color: string) => {
  element.style.textDecorationColor = color;
  element.style.fontFamily = "monospace";
  element.style.textDecorationLine = "underline";
  element.style.textUnderlineOffset = "3px";
};

const getWidth = (element: Element) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context!.font = getComputedStyle(element).font;
  return context!.measureText(element.shadowRoot!.innerHTML).width;
};

setTimeout(replaceRelativeTime, 0.5 * 1000);
setInterval(replaceRelativeTime, 10 * 1000);
