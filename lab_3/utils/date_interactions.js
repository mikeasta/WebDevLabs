// Converts data to different forms
class DataInteractor {
    slashToDotDate = date => {
        return date.split("/").join(".")
    }
    
    dotToSlashDate = date => {
        return date.split(".").join("/")
    }
    
    invertedToSlash = date => {
        return date.split("-").reverse().join("/")
    }

    slashToInverted = date => {
        return date.split('/').reverse().join('-')
    }
}

module.exports = DataInteractor