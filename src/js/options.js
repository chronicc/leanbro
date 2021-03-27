
// Adds an event listener to an input field of type text.
//   @key<str> The id of the input field. Should be the same in the defaults object.
function add_text_listener(key, _) {
    document.getElementById(key).addEventListener('input', function() {
        let value = document.getElementById(key).value;
        if (value.length == 0) {
            chrome.storage.sync.set({ [key]: defaults[key] });
        } else {
            chrome.storage.sync.set({ [key]: value });
        }
    });
}

// Adds an event listener to an input field of type radio.
//   @key<str> The id of the input field. Should be the same in the defaults object.
function add_radio_listener(key, _) {
    let radios = document.querySelectorAll('input[name="' + key + '"]');
    for (const radio of radios) {
        radio.addEventListener('change', function() {
            if (radio.checked) {
                chrome.storage.sync.set({ [key]: radio.value })
            }
        });
    }
}

// Sets the checked property on a form with radio buttons.
//   @key<str>      The name of the radio buttons. Should be the same in the defaults obect.
//   @items<object> An object with all items stored in the synchronous chrome storage.
function set_radio_option(key, _, items) {
    let radios = document.querySelectorAll('input[name="' + key + '"]');
    for (const radio of radios) {
        if (items[key] == radio.value) {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    }
}

// Sets the value of a input field of type text.
//   @key<str>      The name of the radio buttons. Should be the same in the defaults obect.
//   @items<object> An object with all items stored in the synchronous chrome storage.
function set_text_option(key, _, items) {
    let field = document.getElementById(key);
    if (items[key] == defaults[key]) {
        field.value = '';
        field.placeholder = items[key];
    } else {
        field.value = items[key];
    }
}

// Register the event listeners for all input types here.
function add_all_listeners() {
    options_iterator('radio_', add_radio_listener)
    options_iterator('text_', add_text_listener)
}

// Register the value setters for all input types here.
function set_all_options(items) {
    options_iterator('radio_', set_radio_option, items)
    options_iterator('text_', set_text_option, items);
}


load_options(set_all_options);
add_all_listeners();
