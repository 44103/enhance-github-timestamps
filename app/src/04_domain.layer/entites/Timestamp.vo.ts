import { ValueObject } from "./shared/ValueObject";

export class Timestamp extends ValueObject<number> {
  protected validate(value: number): void {
    if (!Number.isSafeInteger(value))
      throw Error("Invalid value for Timestamp");
  }
}
