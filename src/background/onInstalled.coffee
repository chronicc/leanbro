
chrome.runtime.onInstalled.addListener -> 
    options_iterator(defaults, (key, default_value) -> 
        chrome.storage.sync.get([key], (result) -> 
            if result[key] == null
                console.log('Set default value for ' + key + '.')
                chrome.storage.sync.set({ [key]: default_value })
        )
    )
    options_iterator(meta, (key, default_value) -> 
        chrome.storage.sync.get([key], (result) -> 
            if result[key] == null
                console.log('Set default value for ' + key + '.')
                chrome.storage.sync.set({ [key]: default_value })
        )
    )
