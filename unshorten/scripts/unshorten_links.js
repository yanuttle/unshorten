console.log("The file has been loaded...")

// from http://web.archive.org/web/20210924065742/https://j11y.io/javascript/parsing-urls-with-the-dom/
// uses DOM API to parse the url and return all the different properties of a link
// it's perfect for this use case, although I don't need all of the properties
function parseURLfromAnchor(anchorElement) {
    return {
        source: anchorElement.href,
        host: anchorElement.hostname,
        text: anchorElement.innerHTML
    }
}

// const all = document;
// const shortenerHosts = ["bit.ly", "tinyurl.com"];
// var allAnchorElements =  all.getElementsByTagName("a");

var anchor;

chrome.runtime.onMessage.addListener((message) => {
    anchor = message.anchor;
    console.log(anchor);
    alert("hello")
})


// for (let anchorElement of allAnchorElements) {
//     if (shortenerHosts.includes(parseURLfromAnchor(anchorElement).host)) {
//         anchorElement.classList.add("shortened_link");
//     }
// }
