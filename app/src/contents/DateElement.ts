import dayjs from "dayjs";

export class DateElement {
  constructor(private element: HTMLElement) {}

  public getFormatedDate(): string {
    return dayjs(this.element.getAttribute("datetime")).format(
      "YYYY-MM-DD HH:mm"
    );
  }

  public getElapsedTime(): number {
    const age = new Date(this.element.getAttribute("datetime")!).getTime();
    const now = new Date().getTime();
    return now - age;
  }

  public getMode(): "commit" | "blame" | "undefined" {
    switch (this.element.parentElement?.className) {
      case "react-directory-commit-age":
        return "commit";
      case "timestamp-ago":
        return "blame";
      default:
        return "undefined";
    }
  }

  public setAjustedFontSize(parentWidth: number): void {
    for (let size = 14; size > 9 && this.getWidth() > parentWidth; --size)
      this.element.style.fontSize = `${size}px`;
  }

  private getWidth() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context!.font = getComputedStyle(this.element).font;
    return context!.measureText(this.element.shadowRoot!.innerHTML).width;
  }

  public setCommitDate() {
    const parentWidth =
      this.element.parentElement!.clientWidth -
      +getComputedStyle(this.element.parentElement!).paddingRight.replace(
        "px",
        ""
      );

    this.setAjustedFontSize(parentWidth);
  }

  public setBlameDate() {
    const parentWidth =
      this.element.parentElement!.clientWidth -
      +getComputedStyle(this.element.parentElement!).paddingLeft.replace(
        "px",
        ""
      );

    this.setAjustedFontSize(parentWidth);
  }
}
