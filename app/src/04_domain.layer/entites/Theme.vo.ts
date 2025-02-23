import { ValueObject } from "./shared/ValueObject";

export class Theme extends ValueObject<string> {
  protected validate(value: string): void {
    if (value.length > 20) throw Error("Invalid value for Theme");
  }
}
