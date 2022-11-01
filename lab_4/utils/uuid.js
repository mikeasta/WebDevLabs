// Random UUID generator
const generateUUID = () => Math.random().toString(36).slice(2, 15)

module.exports = generateUUID