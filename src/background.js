
// Load setup page to allow usage of modules.
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ 'url': './html/setup.html'});
});
