
class WallhavenApi {
    endpoint = 'https://wallhaven.cc/api/v1';

    constructor(items) {
        this.api_key = items.text_wallhaven_api_key;
        this.image_url = items.text_wallhaven_image_url;
        this.screen_size = window.screen.width + 'x' + window.screen.height;
    }
    
    set_background_image() {
        if (this.image_url.length > 0) {
            this.update_body();
        } else {
            if (this.api_key.length > 0) {
                this.query('/search', {
                    'apikey': this.api_key,
                    'atleast': this.screen_size,
                    'categories': '100',
                    'q': 'nature',
                    'sorting': 'views',
                    'topRange': '1d'
                });
            } else {
                this.query('/search', {
                    'atleast': this.screen_size,
                    'categories': '100',
                    'q': 'nature',
                    'sorting': 'views',
                    'topRange': '1d'
                });
            }
        }
    }

    query(path, params=null) {
        console.log('Running API call');
        let vars = '';
        if (params != null) {
            vars = '?';
            for(const [key, value] of Object.entries(params)) {
                vars += key + '=' + value + '&';
            }
        }
        fetch(this.endpoint + path + vars)
            .then(response => response.json())
            .then(response => {
                this.update_image_url(response.data[0].path);
                this.update_body();
            });        
    }

    update_image_url(url) {
        this.image_url = url;
        chrome.storage.sync.set({ ['text_wallhaven_image_url']: url });
    }

    update_body() {
        console.log('Update body');
        document.body.style.backgroundImage = 'url("' + this.image_url + '")';
    }
}

export { WallhavenApi };
