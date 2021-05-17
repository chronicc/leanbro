
// Add a link to an element in the dom.
//   @id<str>   The unique identifier for the html element.
//   @url<str>  The location to where the link should lead.
function add_link(id, url) {
    document.getElementById(id).addEventListener('click', function() {
        chrome.tabs.create({'url': url });
    });
}

add_link('btn-options', '/html/options.html');
add_link('btn-homepage', 'https://github.com/chronicc/leanbro');
add_link('btn-donate', 'https://www.buymeacoffee.com/chronicc');
