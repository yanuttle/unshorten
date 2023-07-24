// chrome.browserAction.onClicked.addListener((tab) {
//     chrome.tabs.executeScript(null, {file: "unshorten_links.js"};
// });


////"matches": ["https://*/"]} for manifest.json



chrome.runtime.onInstalled.addListener(() => {
    context = "link"
    chrome.contextMenus.create({
        title: "Show Target Link",
        contexts: [context],
        id: context })
    console.log("creating context menu")
});

async function getCurrentTab() {

    return tab;
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: async function() {
            let queryOptions = { active: true, lastFocusedWindow: true };
            // `tab` will either be a `tabs.Tab` instance or `undefined`.
            let [tab] = await chrome.tabs.query(queryOptions);
            var currentTabId = getCurrentTab().id;
            var anchor = document.activeElement;
            var href = anchor.getAttribute("href");
            chrome.runtime.sendMessage(tab.id, {href: href});
        }
      });
});