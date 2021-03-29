
// The defaults object containing the default values for all options.
// Ensure the html names (for radio) and ids (for the rest) are identical to the keys in this object.
// Also use the correct prefix corresponding to the input type to ensure the options_iterator works correct.
const defaults = {
    'select_clock_format': 'full',
    'select_image_source': 'disabled',
    'text_background_color': '#f8f9fa',
    'text_custom_image_url': '',
    'text_font_family': 'sans-serif',
    'text_username': 'Beauty',
    'text_pixabay_api_key': 'not yet implemented',
    'text_wallhaven_api_key': 'not yet implemented'
}

// A prepared list of greeting depending on hour of day.
const greeting = {
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

export { defaults, greeting };
