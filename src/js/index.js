
// Set the salutation in context to the daytime.
// TODO: If name size > x, insert a newline into salutation.
// TODO: Change font color to black or white dependent of the background.
function set_salutation(items) {
    let hour = new Date().getHours();
    return greeting[hour] + ', ' + items.text_username + '.';
}

// Set the clock.
// TODO: Make clock format configurable in options page.
function clock() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

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

    document.getElementById('clock').innerText = time;
    document.getElementById('clock').textContent = time;

    setTimeout(clock, 1000);
}


load_options(function(items) {    
    update_view(items);
    document.getElementById('salutation').innerText = set_salutation(items);
    clock();
});
