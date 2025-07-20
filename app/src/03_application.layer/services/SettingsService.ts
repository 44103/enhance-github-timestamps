import { Settings, TimezoneOption } from "../../04_domain.layer/entites/Settings.vo";

export class SettingsService {
  public static async getSettings(): Promise<Settings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(Settings.default().value, (result) => {
        const settings = {
          timezone: (result.timezone as TimezoneOption) || "local"
        };
        resolve(new Settings(settings));
      });
    });
  }

  public static async saveSettings(settings: Settings): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set(settings.value, () => {
        resolve();
      });
    });
  }
}