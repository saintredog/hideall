// popup.js

// Remove the event listener for the panic button
// document.getElementById("panic").addEventListener("click", () => {
//   chrome.runtime.sendMessage({ action: "activate_panic_button" });
//   window.close();
// });

// Keep the event listener for restoring tabs
document.getElementById("restore").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "restore_tabs" });
  window.close();
});

// Handle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "no_tabs_to_restore") {
    alert("No tabs to restore.");
  }
});