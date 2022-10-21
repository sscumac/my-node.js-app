const setRandomValue = (length) => {
    let value = ""
    const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i=0; i < length; i++ ) {
        value += char_list.charAt(Math.floor(Math.random() * char_list.length))
    }
    return value
}

module.exports = {
    setRandomValue,
}
