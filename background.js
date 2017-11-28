var isSet = true;
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active && isSet) {
        // ...inject 'jquery.min.js' and...
        chrome.tabs.executeScript(tab.id, {
            file: "jquery-3.2.1.min.js",
            allFrames: true,
            runAt: "document_idle"
        });

        // ...inject 'content.js' into the active tab's page
        chrome.tabs.executeScript(tab.id, {
            file: "content.js",
            allFrames: true,
            runAt: "document_idle"
        });
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    // Look through all the pages in this extension to find one we can use.
    if (isSet) {
        isSet = false;
        chrome.browserAction.setIcon({
            path : "off-icon.png"
        });
    }
    else{
        isSet = true;
        chrome.browserAction.setIcon({
            path : "on-icon.png"
        });
    }
});


