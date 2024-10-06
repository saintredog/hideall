// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
    // Get references to the save button and input field
    const saveButton = document.getElementById("save");
    const redirectUrlInput = document.getElementById("redirectUrl");
  
    // Ensure elements exist
    if (!saveButton || !redirectUrlInput) {
      console.error("Save button or redirect URL input not found in the DOM.");
      return;
    }
  
    // Add click event listener to save button
    saveButton.addEventListener("click", () => {
      const redirectUrl = redirectUrlInput.value;
  
      // Ensure the redirectUrl input is not empty before saving
      if (redirectUrl) {
        chrome.storage.sync.set({ redirectUrl }, () => {
          alert("Options saved successfully!");
        });
      } else {
        alert("Please enter a valid URL.");
      }
    });
  
    // Load saved options from chrome.storage.sync
    chrome.storage.sync.get("redirectUrl", (data) => {
      if (data.redirectUrl) {
        redirectUrlInput.value = data.redirectUrl;
      }
    });
  });