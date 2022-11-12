// Map of roles
const roles = {
    "admin": "Администратор",
    "user": "Пользователь",
    "guest": "Гость"
}

// Map of statuses
const access = {
    "banned": "Заблокирован",
    "confirmed": "Подтвержден",
    "unconfirmed": "Неподтвержден"
}

// Class that converts data to representable string
class StringPreprocessor {
    getRole   = role   => roles[role]
    getStatus = status => access[status]
}

module.exports = StringPreprocessor