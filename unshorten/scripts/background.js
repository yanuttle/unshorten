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

var currTab;

chrome.contextMenus.onClicked.addListener(sendInfoToContextScript);

function sendInfoToContextScript(tab) {
    console.log("context menu item clicked");

    console.log("sendind message to background");
    chrome.tabs.query({active : true, currentWindow : true}, function (tabs) {
        currTab = tabs[0];
        chrome.tabs.sendMessage(currTab.id, {type : 'clicked'});
     })
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type == "url") {
        console.log("got message from foreground!");
        console.log("processing link")
        console.log(followPath(message.content))
    }
})

async function followPath(url) {
    var request = new Request(url)
    fetch(request)
        .then((response) => {
            if (response.redirected) {
                console.log(`going to url: ${response.url}`);
                followPath(response.url)
            }
            else if (response.status == 200) {
                sendResponseToContent(response.url);
            }
            else {
                console.log("Another status code was posted.");
            } 
        })
};

function sendResponseToContent(message) {
    console.log(`sending ${message} to content script!`)
    chrome.tabs.sendMessage(currTab.id, {type: "result", content: message})
}

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         func: async function() {
//             let queryOptions = { active: true, lastFocusedWindow: true };
//             // `tab` will either be a `tabs.Tab` instance or `undefined`.
//             let [tab] = await chrome.tabs.query(queryOptions);
//             var currentTabId = getCurrentTab().id;
//             var anchor = document.activeElement;
//             var href = anchor.getAttribute("href");
//             chrome.runtime.sendMessage(tab.id, {href: href});
//         }
//       });
// });