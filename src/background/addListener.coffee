-
chrome.runtime.onMessage.addListener (request, sender, sendResponse) -> 
    if request.query == 'wallhaven'
        params =
            atleast: request.screenSize,
            categories: '100',
            q: 'nature',
            sorting: 'views',
            topRange: '1d'
        vars = ''
        if params != null
            vars = '?'
            for key, value of Object.entries(params)
                vars += key + '=' + value + '&'
        endpoint = 'https://wallhaven.cc/api/v1/search' + vars
        fetch(endpoint)
            .then (response) -> response.json()
            .then (json) ->
                winner = Math.floor(Math.random() * json.data.length)
                return json.data[winner].path
            .then (url) -> sendResponse({ url: url })
        return true
