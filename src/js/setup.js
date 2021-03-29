
import { defaults } from '../js/defaults.js';
import { options_iterator } from '../js/functions.js';

options_iterator('', defaults, function (key, default_value) {
    let option = chrome.storage.sync.get({ key });
    if (option == 'undefined') {
        chrome.storage.sync.set({ [key]: default_value });
    }
});

chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.create({ 'url': './html/options.html' });
    chrome.tabs.remove(tab.id);
})
