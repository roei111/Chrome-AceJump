import { COMMANDS } from "../constants/commands";
import { MessageType } from "../types/MessageType";

function sendMessageToTabs(tabs: browser.tabs.Tab[]) {
  for (let tab of tabs) {
    if (tab.id) {
      const message: MessageType = { command: COMMANDS.HIGHLIGHT };
      void browser.tabs.sendMessage(tab.id, message);
    }
  }
}

browser.commands.onCommand.addListener(function (command) {
  if (command === COMMANDS.HIGHLIGHT) {
    browser.tabs.query({
      currentWindow: true,
      active: true,
    }).then(sendMessageToTabs);
  }
});
