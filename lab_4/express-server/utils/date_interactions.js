// Converts data to different forms
class DataInteractor {
    slashToDotDate  = date => date.split("/").join(".")
    dotToSlashDate  = date => date.split(".").join("/")
    invertedToSlash = date => date.split("-").reverse().join("/")
    slashToInverted = date => date.split('/').reverse().join('-')
}

module.exports = DataInteractor