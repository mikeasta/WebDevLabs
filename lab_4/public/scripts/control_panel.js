import { 
    banUser,
    confirmUser
} from "./client.js"

$(".ban_btn")
    .on("click", async function() {
        const user_id = $(this).attr("id").split("banUser#")[1]
        await banUser(user_id)
        location.reload()
    })

$(".confirm_btn")
    .on("click", async function() {
        const user_id = $(this).attr("id").split("confirmUser#")[1]
        await confirmUser(user_id)
        location.reload()
    })