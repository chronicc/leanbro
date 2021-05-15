
class ImageSelector {
    endpoint = {
        'wallhaven': 'https://wallhaven.cc/api/v1'
    };

    constructor(items) {
        this.api_key = items.text_wallhaven_api_key;
        this.image_url = items.text_wallhaven_image_url;
        this.image_source = items.select_image_source;
        this.screen_size = window.screen.width + 'x' + window.screen.height;
    }
    
    set_background_image() {
        const time_threshold = Date.now() - 3600000;
        if ((this.image_url.length > 0) && (this.image_url_last >= time_threshold)) {
            this.update_body();
        } else {
            this.query();
        }
    }

    query() {
        // console.log('Running API call');
        const params = {
            'atleast': this.screen_size,
            'categories': '100',
            'q': 'nature',
            'sorting': 'views',
            'topRange': '1d'
        };
        let vars = '';
        if (params != null) {
            vars = '?';
            for(const [key, value] of Object.entries(params)) {
                vars += key + '=' + value + '&';
            }
        }
        if (this.api_key.length > 0) {
            vars += 'apikey=' + this.api_key;
        }
        fetch(this.endpoint + '/search' + vars)
            .then(response => response.json())
            .then(response => {
                let batch = Math.floor(Math.random() * response.data.length);
                console.log('Batch: ' + batch);
                let url = response.data[batch].path;
                this.update_image_url(url);
                this.update_body();
            });        
    }

    update_image_url(url) {
        this.image_url = url;
        chrome.storage.sync.set({ ['text_wallhaven_image_url']: url });
        chrome.storage.sync.set({ ['text_wallhaven_image_url_last']: Date.now() });
    }

}


chrome.alarms.onAlarm.addListener(function(alarm) {
    // console.log('Alarm Fired: ' + alarm.name);
    if (alarm.name == 'update_background_url') {
        chrome.storage.sync.get(, function(items) {
            let is = new ImageSelector(items);
        });
    }
});

// Load setup page to allow usage of modules.
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('update_background_url', {'delayInMinutes': 0.0, 'periodInMinutes': 1.0})
    chrome.tabs.create({ 'url': './html/setup.html'});
});
