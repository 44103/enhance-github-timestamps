export abstract class OutputPort<OD = unknown, VM = unknown> {
  abstract present(output: OD): VM;
}
