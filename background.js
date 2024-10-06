// background.js

// Listen for the keyboard shortcut command
chrome.commands.onCommand.addListener((command) => {
    if (command === "panic_button") {
      activatePanicButton();
    }
  });
  
  function activatePanicButton() {
    chrome.storage.sync.get(["redirectUrl"], (data) => {
      // Create a new tab with the redirect URL
      chrome.tabs.create({ url: data.redirectUrl || "https://www.google.com" }, (newTab) => {
        // Close all other tabs except the new one
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
          const tabsToClose = tabs.filter((tab) => tab.id !== newTab.id).map((tab) => tab.id);
          if (tabsToClose.length > 0) {
            // Save the session before closing
            const savedSession = tabs.filter((tab) => tab.id !== newTab.id).map((tab) => ({
              url: tab.url,
              pinned: tab.pinned,
            }));
            chrome.storage.local.set({ savedSession }, () => {
              chrome.tabs.remove(tabsToClose);
            });
          }
        });
      });
    });
  }
  
  function restoreTabs() {
    chrome.storage.local.get("savedSession", (data) => {
      if (data.savedSession && data.savedSession.length > 0) {
        data.savedSession.forEach((tab) => {
          chrome.tabs.create({ url: tab.url, pinned: tab.pinned });
        });
        chrome.storage.local.remove("savedSession");
      } else {
        // Send a message to popup to notify user
        chrome.runtime.sendMessage({ action: "no_tabs_to_restore" });
      }
    });
  }
  
  // Listen for messages from popup or other scripts
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "restore_tabs") {
      restoreTabs();
    }
  });
  