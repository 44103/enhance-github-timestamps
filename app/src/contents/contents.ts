import { DateElement } from "./DateElement";

const replaceRelativeTime = () => {
  document.querySelectorAll<HTMLElement>("relative-time").forEach((element) => {
    const dateElement = new DateElement(element);
    element.shadowRoot!.innerHTML = dateElement.getFormatedDate();

    switch (true) {
      case dateElement.getElapsedTime() < 86400000: // 1day
        setDecoration(element, "#39d353");
        break;
      case dateElement.getElapsedTime() < 86400000 * 7: // 1week
        setDecoration(element, "#26a641");
        break;
      case dateElement.getElapsedTime() < 86400000 * 30: // 1month
        setDecoration(element, "#006d32");
        break;
      case dateElement.getElapsedTime() < 86400000 * 30 * 6: // 6months
        setDecoration(element, "#0e4429");
        break;
    }

    switch (dateElement.getMode()) {
      case "commit":
        dateElement.setCommitDate();
        break;
      case "blame":
        dateElement.setBlameDate();
        break;
    }
  });
};

const setDecoration = (element: HTMLElement, color: string) => {
  element.style.textDecorationColor = color;
  element.style.fontFamily = "monospace";
  element.style.textDecorationLine = "underline";
  element.style.textUnderlineOffset = "3px";
};

setTimeout(replaceRelativeTime, 0.5 * 1000);
setInterval(replaceRelativeTime, 10 * 1000);
