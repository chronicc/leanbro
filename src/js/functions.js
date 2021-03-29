
import { defaults } from './defaults.js'

// Load all stored options from the synchronous chrome storage.
//   @callback<function> Run the callback when all options are loaded.
//                       Will pass the options as object to the callback.
function load_options(callback) {
    chrome.storage.sync.get(defaults, callback);
}

// Iterate over all options, filter them and run a callback on those options.
//   @prefix<str>           Only use options that start with this prefix.
//   @object<object>        The object which will be iterated over.
//   @callback<function>    Use the filtered options as parameter for this callback.
//   @payload<object>       If a payload is added, it will be made available in the callback.
function options_iterator(prefix, object, callback, payload=null) {
    for (const [key, default_value] of Object.entries(object)) {
        if (key.startsWith(prefix)) {
            if (payload == null) {
                callback(key, default_value);
            } else {
                callback(key, default_value, payload);
            }
        }
    }
}


// Set the background image dependent on which image source has been configured.
// TODO: Store the downloaded image in local browser storage.
function set_background_image(items) {
    switch (items.radio_image_source) {
        case 'custom':
            return 'url("' + items.text_custom_image_url + '")';
        case 'pixabay':
            // TODO: Download a random image from pixabay every hour.
            break;
        case 'wallhaven':
            // TODO: Download a random image from wallhaven every hour.
            break;
        default:
            return 'none'
    }
}

// Update the view representation.
//   @items<object> An object with all items stored in the synchronous chrome storage.
function update_view(items) {
    document.body.style.backgroundColor = items.text_background_color;
    document.body.style.backgroundImage = set_background_image(items);
    document.body.style.fontFamily = items.text_font_family;
}

export { load_options, options_iterator, set_background_image, update_view };
