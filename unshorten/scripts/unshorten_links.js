console.log("The file has been loaded...")

// from http://web.archive.org/web/20210924065742/https://j11y.io/javascript/parsing-urls-with-the-dom/
// uses DOM API to parse the url and return all the different properties of a link
// it's perfect for this use case, although I don't need all of the properties

console.log("loaded, I guess")
function parseURLfromAnchor(anchorElement) {
    return {
        source: anchorElement.href,
        host: anchorElement.hostname,
        text: anchorElement.innerHTML
    }
}


chrome.runtime.onMessage.addListener((message) => {
    // correct type of message?

    const anchor = document.activeElement;

    if (message.type == "clicked") {
        console.log(anchor);
        sendUrlToBackground(anchor.href);
    }

    else if (message.type == "result") {
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
