import dayjs from "dayjs";

const replaceRelativeTime = () => {
  document.querySelectorAll("relative-time").forEach((element) => {
    element.shadowRoot!.innerHTML = dayjs(
      element.getAttribute("datetime")
    ).format("YYYY-MM-DD HH:mm");
  });
};

setTimeout(replaceRelativeTime, 0.5 * 1000);
setInterval(replaceRelativeTime, 10 * 1000);
