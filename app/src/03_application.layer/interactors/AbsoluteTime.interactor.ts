import dayjs from "dayjs";
import { ContentPresenter } from "../../02_interface-adapter.layer/presenters/Content.presenter";
import { Page } from "../../04_domain.layer/entites/Page.vo";
import { Theme } from "../../04_domain.layer/entites/Theme.vo";
import { Timestamp } from "../../04_domain.layer/entites/Timestamp.vo";
import { ContentEntity } from "../../contents/ContentEntity";
import { ContentInputData } from "../input.data/Content.id";
import { InputPort } from "../input.boundary/InputPort";

export class AbsoluteTimeInteractor extends InputPort<ContentInputData, void> {
  public async execute(input: ContentInputData): Promise<void> {
    const content = new ContentEntity({
      theme: new Theme(input.theme ?? "light"),
    });
    content.timestamp = new Timestamp(
      dayjs(input.element.getAttribute("datetime")!).valueOf()
    );
    content.page = new Page(
      (() => {
        switch (input.page) {
          case "react-directory-commit-age":
            return "commit";
          case "timestamp-ago":
            return "blame";
          default:
            return "undefined";
        }
      })()
    );

    const age = dayjs().valueOf() - content.timestamp.value;

    const presenter = new ContentPresenter();
    presenter.present({
      element: input.element,
      theme: content.theme.value,
      page: content.page.value,
      timestamp: content.timestamp.value,
      age,
    });
  }
}
