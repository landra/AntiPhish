chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
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
