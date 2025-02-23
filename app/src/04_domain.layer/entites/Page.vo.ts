import { ValueObject } from "./shared/ValueObject";

export class Page extends ValueObject<string> {
  protected validate(value: string): void {
    if (value.length > 10) throw Error("Invalid value for Page");
  }
}
