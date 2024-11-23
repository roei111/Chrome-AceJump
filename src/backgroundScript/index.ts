import { COMMANDS } from "../constants/commands";
import { MessageType } from "../types/MessageType";

function sendMessageToTabs(tabs: chrome.tabs.Tab[]) {
  for (let tab of tabs) {
    console.log("Tab: ", tab);
    if (tab.id) {
      const message: MessageType = { command: COMMANDS.HIGHLIGHT };
      console.log("sensing message", message);
      console.log("tab.id", tab.id);
      void chrome.tabs.sendMessage(tab.id, message, function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log("Response from content script:", response);
        }
      });
    }
  }
}

chrome.commands.onCommand.addListener(function (command) {
  console.log("**********", command);
  if (command === COMMANDS.HIGHLIGHT) {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      sendMessageToTabs
    );
  }
});
