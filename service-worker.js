// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const ALTO_ORIGIN = "providers.alto.com";

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on alto.com
  if (url.origin.includes(ALTO_ORIGIN)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html",
      enabled: true,
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
});

// Listen for messages in the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "EXTRACT_PATIENT") {
    // Store data or handle it
    // Check if local storage already has some patient data
    chrome.storage.local.get("patients", function (result) {
      const patients = result.patients || [];
      patients.push(message.payload);
      chrome.storage.local.set({ patients });
    });
  }
});
