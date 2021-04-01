
import { defaults, meta } from '../js/defaults.js';
import { options_iterator } from '../js/functions.js';

options_iterator(defaults, function (key, default_value) {
    chrome.storage.sync.get([key], function(result) {
        if (result[key] == null) {
            console.log('Set default value for ' + key + '.');
            chrome.storage.sync.set({ [key]: default_value });
        }
    });
});
options_iterator(meta, function (key, default_value) {
    chrome.storage.sync.get([key], function(result) {
        if (result[key] == null) {
            console.log('Set default value for ' + key + '.');
            chrome.storage.sync.set({ [key]: default_value });
        }
    });
});

chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.create({ 'url': './html/options.html' });
    chrome.tabs.remove(tab.id);
});
