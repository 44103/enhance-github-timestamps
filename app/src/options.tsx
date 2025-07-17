import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type TimezoneOption = "local" | "utc";

interface Settings {
  timezone: TimezoneOption;
}

const defaultSettings: Settings = {
  timezone: "local",
};

function Options() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from storage
    chrome.storage.sync.get(defaultSettings, (result) => {
      setSettings(result as Settings);
    });
  }, []);

  const handleTimezoneChange = (timezone: TimezoneOption) => {
    const newSettings = { ...settings, timezone };
    setSettings(newSettings);
    
    // Save to storage
    chrome.storage.sync.set(newSettings, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
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
                checked={settings.timezone === "local"}
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
                checked={settings.timezone === "utc"}
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);