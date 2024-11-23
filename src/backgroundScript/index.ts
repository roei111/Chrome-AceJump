import { COMMANDS } from "../constants/commands";
import { MessageType } from "../types/MessageType";

function sendMessageToTabs(tabs: chrome.tabs.Tab[]) {
  for (let tab of tabs) {
    if (tab.id) {
      const message: MessageType = { command: COMMANDS.HIGHLIGHT };
      void chrome.tabs.sendMessage(tab.id, message);
    }
  }
}

chrome.commands.onCommand.addListener(function (command) {
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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "openInBackground" && message.url) {
    chrome.tabs.create({ url: message.url, active: false });
  }
});
