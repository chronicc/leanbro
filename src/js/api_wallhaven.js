
import { defaults } from './defaults.js';


class WallhavenApi {
    endpoint = 'https://wallhaven.cc/api/v1';

    constructor(api_key) {
        this.api_key = api_key;
        this.screen_size = window.screen.width + 'x' + window.screen.height;
    }
    
    set_background_image() {
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

    query(path, params=null) {
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
                this.update_body(response.data[0].path)
            });        
    }

    update_body(url) {
        document.body.style.backgroundImage = 'url("' + url + '")';
    }
}

export { WallhavenApi };
