import { InputPort } from "../input.boundary/InputPort";
import { SettingsService } from "../services/SettingsService";
import { SettingsOutputData } from "../output.data/Settings.od";

export class GetSettingsInteractor extends InputPort<void, SettingsOutputData> {
  public async execute(): Promise<SettingsOutputData> {
    const settings = await SettingsService.getSettings();
    return { timezone: settings.timezone };
  }
}
