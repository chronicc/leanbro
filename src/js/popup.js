
document.getElementById('btn-options').addEventListener('click', function() {
    chrome.tabs.create({'url': '/html/options.html' } )
});

document.getElementById('btn-homepage').addEventListener('click', function() {
    chrome.tabs.create({'url': 'https://github.com/chronicc/leanbro' } )
});
