export const slashToDotDate = date => {
    return date.split("/").join(".")
}

export const dotToSlashDate = date => {
    return date.split(".").join("/")
}

export const invertedToSlash = date => {
    return date.split("-").reverse().join("/")
}