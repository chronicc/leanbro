
import { defaults } from './defaults.js';
import { load_options, options_iterator, store_option, store_options, update_background } from './functions.js';

// Sets the value of an input field of type text.
//   @key<str>      The name of text input. Should be the same in the defaults obect.
//   @items<object> An object with all items stored in the synchronous chrome storage.
function set_option(key, _, items) {
    $('#' + key).val(items[key]);
}

function reload() {
    load_options(function(items) {
        update_background(items);
        options_iterator(defaults, set_option, items);
    });
}

$('#btn-save').on('click', function() {
    $('input[type=text]').each(function(_, element) {
        store_option($(element));
    });
    $('select').each(function(_, element) {
        store_option($(element));
    });
    reload();
});

$('#btn-reset').on('click', function() {
    load_options(function(items) {
        options_iterator(defaults, set_option, items);
    });
});

$('#btn-purge').on('click', function() {
    store_options(defaults);
    reload();
});

reload();
