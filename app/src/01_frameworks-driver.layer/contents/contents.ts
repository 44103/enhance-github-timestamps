import { AbsoluteTimeInteractor } from "../../03_application.layer/interactors/AbsoluteTime.interactor";

const theme = document.querySelector("html")?.getAttribute("data-color-mode");

const useCase = new AbsoluteTimeInteractor();

const observers: MutationObserver[] = [];
const observeOption = {
  attributes: true,
};

const controller = () => {
  document.querySelectorAll<HTMLElement>("relative-time").forEach((element) => {
    const page = element.parentElement?.className;
    useCase.execute({ theme, page, element });

    const observer = new MutationObserver(() => {
      observer.disconnect();
      const page = element.parentElement?.className;
      useCase.execute({ theme, page, element });
      observer.observe(element, observeOption);
    });

    observer.observe(element, observeOption);
    observers.push(observer);
  });
};

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
  while (observers.length !== 0) observers.pop()?.disconnect();
  setTimeout(controller, 1 * 1000);
  sendResponse();
});
