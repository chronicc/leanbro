
// Presets
//---------

let background_container = document.getElementById('background');
let salutation_container = document.getElementById('salutation');


// Background
//------------

// TODO: Make background color configurable in options page.
let background_color = "#222222";

// TODO: Store the downloaded image in local browser storage.
// TODO: Download a random image from pixabay every hour.
let image_url = 'https://w.wallhaven.cc/full/k9/wallhaven-k9qw91.jpg';

background_container.style.backgroundColor = background_color;
background_container.style.backgroundImage = 'url(' + image_url + ')';


// Salutation
//------------

// TODO: Make name configurable in options page.
let salutation_name = 'Thomas';

// TODO: Change greeting depending on local day time.
let salutation_greeting = 'Good Morning';

// TODO: If name size > x, insert a newline into salutation.
// TODO: Change font color to black or white dependent of the background.
salutation_container.innerHTML = salutation_greeting + ', ' + salutation_name + '.';


// Clock
//-------
let clock_timezone = '';

function clock() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    // TODO: Make clock format configurable in options page.
    // var session = "AM";

    // if(h == 0){
    //     h = 12;
    // }

    // if(h > 12){
    //     h = h - 12;
    //     session = "PM";
    // }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    let time = h + ":" + m + ":" + s;
    document.getElementById("clock").innerText = time;
    document.getElementById("clock").textContent = time;

    setTimeout(clock, 1000);
}
clock()


// Weather
//---------