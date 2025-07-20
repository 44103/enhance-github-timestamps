import { TimezoneOption } from "../../04_domain.layer/entites/Settings.vo";

export type ConentOutputData = {
  element: HTMLElement;
  theme: string;
  page: string;
  timestamp: number;
  age: number;
  timezone: TimezoneOption;
};
