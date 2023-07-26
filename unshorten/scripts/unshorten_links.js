console.log("The file has been loaded...")


chrome.runtime.onMessage.addListener((message) => {
    const anchor = document.activeElement;

    if (message.type == "clicked") {
        sendUrlToBackground(anchor.href);
    }

    else if (message.type == "response") {
        var url = message.content;
        replaceUrl(anchor, url);
        showLoading(anchor);
    }  
})

function replaceUrl(anchor, url) {
    anchor.innerHTML = url;
}

function showLoading(anchor) {
    anchor.classList.add("loading");
}

function sendUrlToBackground(url) {
    chrome.runtime.sendMessage({type: 'url', content: url});
}
