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
});


chrome.contextMenus.onClicked.addListener(sendClickInfoToCScript);

// This is necessary, because I don't want to query for the same tabId twice
var currTab;

chrome.runtime.onMessage.addListener((message) => {
    if (message.type == "url") {
        followPath(message.content)
    }
})

function sendClickInfoToCScript(tab) {
    chrome.tabs.query({active : true, currentWindow : true}, function (tabs) {
        currTab = tabs[0];
        chrome.tabs.sendMessage(currTab.id, {type : 'clicked'});
    })
}

function sendResponseToCSCript(response) {
    console.log(`sending ${response} to content script!`)
    chrome.tabs.sendMessage(currTab.id, {type: "response", content: response})
}

/* The function has to be defined here, because otherwise the request 
    won't get approved... of CORS. */
async function followPath(url) {
    var request = new Request(url)
    fetch(request)
        .then((response) => {
            if (response.redirected) {
                console.log(`going to url: ${response.url}`);
                followPath(response.url)
            }
            else if (response.status == 200) {
                sendResponseToCSCript(response.url);
            }
            else {
                console.log("Another status code was posted.");
            } 
        })
};
    