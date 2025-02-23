import { ValueObject } from "./ValueObject";

export abstract class Entity<T extends ValueObject> {
  abstract get id(): T;

  public equals(value: Entity<T>) {
    this.id.equals(value.id);
  }
}
