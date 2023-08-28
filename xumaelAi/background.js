chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "xumaelAi",
        "title": "xumaelAi",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "xumaelAi") {
        chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
    }
});
