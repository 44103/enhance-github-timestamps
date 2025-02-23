import { AbsoluteTimeInteractor } from "../03_application.layer/interactors/AbsoluteTime.interactor";

const controller = () => {
  const theme = document.querySelector("html")?.getAttribute("data-color-mode");

  const useCase = new AbsoluteTimeInteractor();

  document.querySelectorAll<HTMLElement>("relative-time").forEach((element) => {
    const page = element.parentElement?.className;
    useCase.execute({ theme, page, element });
  });
};

setTimeout(controller, 0.5 * 1000);
setInterval(controller, 10 * 1000);
