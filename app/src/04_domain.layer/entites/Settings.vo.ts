import { ValueObject } from "./shared/ValueObject";

export type TimezoneOption = "local" | "utc";

export class Settings extends ValueObject<{
  timezone: TimezoneOption;
}> {
  protected validate(value: { timezone: TimezoneOption }): void {
    if (!value.timezone || !["local", "utc"].includes(value.timezone)) {
      throw new Error("Invalid timezone option");
    }
  }

  public get timezone(): TimezoneOption {
    return this.value.timezone;
  }

  public static default(): Settings {
    return new Settings({ timezone: "local" });
  }
}