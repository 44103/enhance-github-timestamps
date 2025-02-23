import dayjs from "dayjs";
import { OutputPort } from "../../03_application.layer/output.boundary/OutputPort";
import { ConentOutputData } from "../../03_application.layer/output.data/Content.od";

export class ContentPresenter extends OutputPort<ConentOutputData, void> {
  private static lightColors = [
    "#216e39", // new
    "#30a14e",
    "#40c463",
    "#9be9a8",
    "#ebedf0", // old
  ];
  private static darkColors = [
    "#39d353", // new
    "#26a641",
    "#006d32",
    "#0e4429",
    "#161b22", // old
  ];

  present(output: ConentOutputData): void {
    const { element, theme, page, timestamp, age } = output;
    // text
    element.shadowRoot!.innerHTML = dayjs(timestamp).format("YYYY-MM-DD HH:mm");

    // color
    const colors =
      theme === "dark"
        ? ContentPresenter.darkColors
        : ContentPresenter.lightColors;

    element.style.textDecorationColor = (() => {
      switch (true) {
        case this.isWithinXDays({ days: 1, age }):
          return colors[0];
        case this.isWithinXDays({ days: 7, age }):
          return colors[1];
        case this.isWithinXDays({ days: 30, age }):
          return colors[2];
        case this.isWithinXDays({ days: 180, age }):
          return colors[3];
        default:
          return colors[4];
      }
    })();

    element.style.textDecorationLine = "underline";
    element.style.textUnderlineOffset = "3px";

    // font
    element.style.fontFamily = "monospace";

    switch (page) {
      case "commit":
        this.ajustFontSize(element, this.getCommitPadding(element));
        break;
      case "blame":
        this.ajustFontSize(element, this.getBlamePadding(element));
        break;
    }
  }

  private isWithinXDays(args: { days: number; age: number }): boolean {
    const day = 86400000;
    return args.age < day * args.days;
  }

  private getCommitPadding(element: HTMLElement): number {
    return Number(
      getComputedStyle(element.parentElement!).paddingRight.replace("px", "")
    );
  }

  private getBlamePadding(element: HTMLElement): number {
    return Number(
      getComputedStyle(element.parentElement!).paddingLeft.replace("px", "")
    );
  }

  private getTextWidth(element: HTMLElement): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context!.font = getComputedStyle(element).font;
    return context!.measureText(element.shadowRoot!.innerHTML).width;
  }

  private ajustFontSize(element: HTMLElement, padding: number): void {
    const parentWidth = element.parentElement!.clientWidth - padding;
    for (let size = 14; this.getTextWidth(element) > parentWidth; --size) {
      element.style.fontSize = `${size}px`;
      if (size < 9) break;
    }
  }
}
