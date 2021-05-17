
###
Sets the value of an input field of type text.
@key<str>           The name of text input. Should be the same in the defaults obect.
@items<object>      An object with all items stored in the synchronous chrome storage.
###
set_option = (key, _, items) -> $('#' + key).val(items[key])

reload = -> 
    load_options (items) -> 
        update_background(items)
        options_iterator(defaults, set_option, items)

options = ->
    console.log('Running options page ...')
    $('#btn-save').on 'click', ->
        $('input[type=text]').each (_, element) -> store_option($(element))
        $('select').each (_, element) -> store_option($(element))
        reload
        alertify.notify('Saved changes.', 'success')
    $('#btn-reset').on 'click', ->
        reload
        alertify.notify('Resetted changes.', 'success')
    $('#btn-purge').on 'click', ->
        chrome.storage.sync.clear
        store_options(defaults)
        reload
        alertify.notify('Purged config.', 'success')
    reload
