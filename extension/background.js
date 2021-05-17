
// Load setup page to allow usage of modules.
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ 'url': './html/setup.html' });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.query == 'wallhaven') {
      let params = {
        atleast: request.screenSize,
        categories: '100',
        q: 'nature',
        sorting: 'views',
        topRange: '1d'
      }
      let vars = ''
      if (params != null) {
        vars = '?'
      }
      for (const [key, value] of Object.entries(params)) {
        vars += key + '=' + value + '&'
      }
      endpoint = 'https://wallhaven.cc/api/v1/search' + vars
      fetch(endpoint)
        .then(response => response.json())
        .then(json => function (json) {
          winner = Math.floor(Math.random() * json.data.length);
          return json.data[winner].path;
        })
        .then(url => sendResponse({ url: url }))
      return true
    }
  }
);