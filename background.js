chrome.windows.getLastFocused(
    {populate: false}, 
    function(currentWindow) {
        chrome.windows.update(currentWindow.id, { width: 1000 });
    }
);