import dayjs from "dayjs";
import { Entity } from "../04_domain.layer/entites/shared/Entity";
import { ContentId } from "../04_domain.layer/entites/ContentId.vo";
import { Theme } from "../04_domain.layer/entites/Theme.vo";
import { Timestamp } from "../04_domain.layer/entites/Timestamp.vo";
import { Page } from "../04_domain.layer/entites/Page.vo";

export class ContentEntity extends Entity<ContentId> {
  private _id: ContentId;
  private _theme: Theme;
  private _page: Page | undefined;
  private _timestamp: Timestamp;

  constructor(args: { theme: Theme }) {
    super();
    this._id = new ContentId(dayjs().format("YYYY-MM-DDTHH:mm:ss"));
    this._theme = args.theme;
    this._timestamp = new Timestamp(0);
  }

  get id(): ContentId {
    return this._id;
  }

  get theme() {
    return this._theme;
  }

  get page(): Page | undefined {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(value: Timestamp) {
    this._timestamp = value;
  }
}
