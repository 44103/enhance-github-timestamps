import { ValueObject } from "./shared/ValueObject";

export class ContentId extends ValueObject<string> {
  protected validate(value: string): void {
    if (value.length !== 19) throw Error("Invalid value for Content ID");
  }
}
