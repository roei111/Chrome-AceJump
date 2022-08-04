function sendMessageToTabs(tabs: browser.tabs.Tab[]) {
  for (let tab of tabs) {
    if (tab.id) {
      void browser.tabs.sendMessage(tab.id, { action: 'highlight' });
    }
  }
}

browser.commands.onCommand.addListener(function (command) {
  if (command === "highlight") {
    browser.tabs.query({
      currentWindow: true,
      active: true,
    }).then(sendMessageToTabs);
  }
});
