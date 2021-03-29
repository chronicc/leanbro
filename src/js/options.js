
import { defaults } from './defaults.js';
import { load_options, options_iterator, update_view } from './functions.js';

// Adds an event listener to an input field of type radio.
//   @key<str> The id of the input field. Should be the same in the defaults object.
function add_radio_listener(key, _) {
    let radios = document.querySelectorAll('input[name="' + key + '"]');
    for (const radio of radios) {
        radio.addEventListener('change', function() {
            if (radio.checked) {
                chrome.storage.sync.set({ [key]: radio.value })
            }
            load_options(update_view);
        });
    }
}

// Adds an event listener to a select field.
//   @key<str> The id of the select field. Should be the same in the defaults object.
function add_select_listener(key, _) {
    document.getElementById(key).addEventListener('change', function() {
        let value = document.getElementById(key).value;
        chrome.storage.sync.set({ [key]: value });
        load_options(update_view);
    });
}

// Adds an event listener to an input field of type text.
//   @key<str> The id of the input field. Should be the same in the defaults object.
function add_text_listener(key, _) {
    document.getElementById(key).addEventListener('focusout', function() {
        let value = document.getElementById(key).value;
        if (value.length == 0) {
            chrome.storage.sync.set({ [key]: defaults[key] });
        } else {
            chrome.storage.sync.set({ [key]: value });
        }
        load_options(update_view);
    });
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

// Sets the value of a select field.
//   @key<str>      The name of the select element. Should be the same in the defaults obect.
//   @items<object> An object with all items stored in the synchronous chrome storage.
function set_select_option(key, _, items) {
    let field = document.getElementById(key);
    field.value = items[key];
}

// Sets the value of an input field of type text.
//   @key<str>      The name of text input. Should be the same in the defaults obect.
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
    options_iterator('radio_', defaults, add_radio_listener);
    options_iterator('select_', defaults, add_select_listener);
    options_iterator('text_', defaults, add_text_listener);
}

// Register the value setters for all input types here.
function set_all_options(items) {
    options_iterator('radio_', defaults, set_radio_option, items);
    options_iterator('select_', defaults, set_select_option, items);
    options_iterator('text_', defaults, set_text_option, items);
}


load_options(function(items) {
    update_view(items);
    set_all_options(items);
});
add_all_listeners();
