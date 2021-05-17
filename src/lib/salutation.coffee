
# TODO: If name size > x, insert a newline into salutation.
# TODO: Change font color to black or white dependent of the background.
set_salutation = (items) -> 
    hour = new Date().getHours()
    return greeting[hour] + ', ' + items.text_username + '.'
