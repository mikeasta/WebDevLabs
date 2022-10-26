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

class StringPreprocessor {
    getRole = role => {
        return roles[role]
    }

    getStatus = status => {
        return access[status]
    }
}

module.exports = StringPreprocessor