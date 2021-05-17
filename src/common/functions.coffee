
###
Load all stored options from the synchronous chrome storage.
@callback<func>     Run the callback when all options are loaded.
                    Will pass the options as object to the callback.
###
load_options = (callback) -> chrome.storage.sync.get(defaults, callback)

###
Store an option in the synchronous chrome storage.
@item<obj>          An object containing the key and value of one option.
###
store_option = (item) -> 
    if item.val() == ''
        item.val(defaults[item.attr('id')])
    chrome.storage.sync.set({ [item.attr('id')]: item.val() })
    # console.log('Stored {' + item.attr('id') + ': ' + item.val() + '} in synchronous storage.')

###
Store multiple options in the synchronous chrome storage.
@items<obj>         An list of objects containing the key and value of an option.
###
store_options = (items) -> chrome.storage.sync.set(items)

###
Iterate over all options, filter them and run a callback on those options.
@prefix<str>            Only use options that start with this prefix.
@object<object>         The object which will be iterated over.
@callback<function>     Use the filtered options as parameter for this callback.
@payload<object>        If a payload is added, it will be made available in the callback.
###
options_iterator = (object, callback, payload=null) -> 
    for key, default_value of Object.entries(object)
        if payload == null
            callback(key, default_value)
        else
            callback(key, default_value, payload)

###
Set the background image dependent on which image source has been configured.
TODO: Store the downloaded image in local browser storage.
###
set_background_image = (items) -> 
    if items.select_image_source == 'custom'
        document.body.style.backgroundImage = 'url("' + items.text_custom_image_url + '")'
    if items.select_image_source == 'wallhaven'
            api = new WallhavenApi(items)
            api.set_background_image()

###
Update the view representation.
@items<object>          An object with all items stored in the synchronous chrome storage.
###
update_background = (items) ->
    document.body.style.backgroundColor = items.text_background_color
    set_background_image(items)

###
Update the font families.
@items<object>          An object with all items stored in the synchronous chrome storage.
###
update_fonts = (items) -> document.body.style.fontFamily = items.text_font_family
