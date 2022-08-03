"use strict";
function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, {});
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
