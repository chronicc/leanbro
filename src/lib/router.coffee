
page = $('script[data-name*="leanbro"]').attr('data-page')
console.log('Page: ' + page)
switch page
    when 'index' then index()
    when 'options' then options()
    when 'popup' then popup()
    else break
