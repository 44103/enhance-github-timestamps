import { useState, useEffect } from "react";
import { TimezoneOption } from "../../04_domain.layer/entites/Settings.vo";
import { GetSettingsInteractor } from "../../03_application.layer/interactors/GetSettings.interactor";
import { SaveSettingsInteractor } from "../../03_application.layer/interactors/SaveSettings.interactor";

const getSettings = new GetSettingsInteractor();
const saveSettings = new SaveSettingsInteractor();

export function OptionsView() {
  const [timezone, setTimezone] = useState<TimezoneOption>("local");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettings.execute().then((result) => {
      setTimezone(result.timezone);
    });
  }, []);

  const handleTimezoneChange = async (tz: TimezoneOption) => {
    setTimezone(tz);
    await saveSettings.execute({ timezone: tz });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Enhance GitHub Timestamps - Settings
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Timezone Display
          </h2>
          <p className="text-gray-600 mb-4">
            Choose how timestamps should be displayed on GitHub pages.
          </p>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="timezone"
                value="local"
                checked={timezone === "local"}
                onChange={() => handleTimezoneChange("local")}
                className="mr-3"
              />
              <div>
                <span className="font-medium">Local Timezone</span>
                <p className="text-sm text-gray-500">
                  Display timestamps in your local timezone
                </p>
              </div>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="timezone"
                value="utc"
                checked={timezone === "utc"}
                onChange={() => handleTimezoneChange("utc")}
                className="mr-3"
              />
              <div>
                <span className="font-medium">UTC</span>
                <p className="text-sm text-gray-500">
                  Display timestamps in UTC (Coordinated Universal Time)
                </p>
              </div>
            </label>
          </div>
        </div>
        
        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}
