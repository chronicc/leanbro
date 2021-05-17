
# TODO: Make clock format configurable in options page.
clock = (format) -> 
    date = new Date()
    h = date.getHours()
    m = date.getMinutes()
    s = date.getSeconds()
    session = ''

    if format == 'half'
        session = ' AM'
    
        if h == 0
            h = 12
    
        if h > 12
            h = h - 12
            session = ' PM'

    h = (h < 10) ? '0' + h : h
    m = (m < 10) ? '0' + m : m
    s = (s < 10) ? '0' + s : s
    time = h + ':' + m + ':' + s

    document.getElementById('time').innerText = time
    document.getElementById('time').textContent = time
    document.getElementById('time-format').innerText = session

    runClock = ->
        clock(format)
    setTimeout(runClock, 1000)
