
class WallhavenApi {
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
            chrome.runtime.sendMessage({query: 'wallhaven', screenSize: this.screen_size},
            response => this.update_image_url(response.url));
        }
    }

    update_image_url(url) {
        this.image_url = url;
        chrome.storage.sync.set({ ['text_wallhaven_image_url']: url });
        chrome.storage.sync.set({ ['text_wallhaven_image_url_last']: Date.now() });
        this.update_body();
    }

    update_body() {
        document.body.style.backgroundImage = 'url("' + this.image_url + '")';
    }
}

export { WallhavenApi };