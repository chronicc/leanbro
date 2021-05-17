
index = ->
    console.log('Running index page ...')
    load_options (items) ->     
        update_background(items)
        update_fonts(items)
        document.getElementById('salutation').innerText = set_salutation(items)
        clock(items.select_clock_format)
