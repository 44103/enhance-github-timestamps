export abstract class ValueObject<T = unknown> {
  constructor(private readonly _value: T) {
    this.validate(_value);
  }

  protected abstract validate(value: T): void;

  get value(): T {
    return this._value;
  }

  equals(other: ValueObject<T>): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}
