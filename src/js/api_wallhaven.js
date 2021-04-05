
class WallhavenApi {
    endpoint = 'https://wallhaven.cc/api/v1';

    constructor(items) {
        this.api_key = items.text_wallhaven_api_key;
        this.image_url = items.text_wallhaven_image_url;
        this.image_url_last = items.text_wallhaven_image_url_last;
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
                this.update_image_url(response.data[0].path);
                this.update_body();
            });        
    }

    update_image_url(url) {
        this.image_url = url;
        chrome.storage.sync.set({ ['text_wallhaven_image_url']: url });
        chrome.storage.sync.set({ ['text_wallhaven_image_url_last']: Date.now() });
    }

    update_body() {
        // console.log('Update body');
        document.body.style.backgroundImage = 'url("' + this.image_url + '")';
    }
}

export { WallhavenApi };
