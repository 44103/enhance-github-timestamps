export abstract class InputPort<ID = unknown, OD = unknown> {
  public abstract execute(input: ID): Promise<OD>;
}
