
// The defaults object containing the default values for all options.
// Ensure the html names (for radio) and ids (for the rest) are identical to the keys in this object.
// Also use the correct prefix corresponding to the input type to ensure the options_iterator works correct.
let defaults = {
    'radio_image_source': 'disabled',
    'text_background_color': '#222222',
    'text_custom_image_url': '',
    'text_font_family': 'sans-serif',
    'text_username': 'Beauty',
    'text_pixabay_api_key': 'not yet implemented',
    'text_wallhaven_api_key': 'not yet implemented'
}

// A prepared list of greeting depending on hour of day.
let greeting = {
    0: 'Good Morning',
    1: 'Good Morning',
    2: 'Good Morning',
    3: 'Good Morning',
    4: 'Good Morning',
    5: 'Good Morning',
    6: 'Good Morning',
    7: 'Good Morning',
    8: 'Good Morning',
    9: 'Good Morning',
    10: 'Good Morning',
    11: 'Good Afternoon',
    12: 'Good Afternoon',
    13: 'Good Afternoon',
    14: 'Good Afternoon',
    15: 'Good Afternoon',
    16: 'Good Afternoon',
    17: 'Good Afternoon',
    18: 'Good Evening',
    19: 'Good Evening',
    20: 'Good Evening',
    21: 'Good Evening',
    22: 'Good Evening',
    23: 'Good Evening',
}

// Load all stored options from the synchronous chrome storage.
//   @callback<function> Run the callback when all options are loaded.
//                       Options will be provided as the 'items' variable.
function load_options(callback) {
    let options = {};
    for (const [key, default_value] of Object.entries(defaults)) {
        options[key] = default_value
    }
    chrome.storage.sync.get(options, callback);
}

// Iterate over all options, filter them and run a callback on those options.
//   @prefix<str>           Only use options that start with this prefix.
//   @callback<function>    Use the filtered options as parameter for this callback.
//   @payload<object>       If a payload is added, it will be made available in the callback.
function options_iterator(prefix, callback, payload=null) {
    for (const [key, default_value] of Object.entries(defaults)) {
        if (key.startsWith(prefix)) {
            if (payload == null) {
                callback(key, default_value);
            } else {
                callback(key, default_value, payload);
            }
        }
    }
}
