import { Settings } from "../../04_domain.layer/entites/Settings.vo";
import { InputPort } from "../input.boundary/InputPort";
import { SaveSettingsInputData } from "../input.data/Settings.id";
import { SettingsService } from "../services/SettingsService";

export class SaveSettingsInteractor extends InputPort<SaveSettingsInputData, void> {
  public async execute(input: SaveSettingsInputData): Promise<void> {
    const settings = new Settings({ timezone: input.timezone });
    await SettingsService.saveSettings(settings);
  }
}
