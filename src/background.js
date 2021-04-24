
function get_image_url() {
    console.log('Fetching image url from API');
    fetch(url)
        .then(response => response.json())
        .then(response => {
            chrome.storage.sync.set({ ['background_image_url']: response.data[0].path });
        });
}

// Load setup page to allow usage of modules.
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ 'url': './html/setup.html'});
});
