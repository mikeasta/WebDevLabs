export const generateUUID = () => {
    return Math.random().toString(36).slice(2, 15)
}
