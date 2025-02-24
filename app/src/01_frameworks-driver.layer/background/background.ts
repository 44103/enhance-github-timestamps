chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url?.includes("https://github.com/")) return;
  if (changeInfo.status !== "complete") return;
  chrome.tabs.sendMessage(tabId, undefined).catch(() => {});
});
