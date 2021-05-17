
###
Add a link to an element in the dom.
@id<str>        The unique identifier for the html element.
@url<str>       The location to where the link should lead.
###
add_link = (id, url) -> 
    $('#' + id).on 'click', ->
        chrome.tabs.create({'url': url })

popup = ->
    console.log('Running index page ...')
    add_link('btn-options', '/html/options.html')
    add_link('btn-homepage', 'https://github.com/chronicc/leanbro')
    add_link('btn-donate', 'https://www.buymeacoffee.com/chronicc')
