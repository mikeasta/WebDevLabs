import { editUser, deleteUser, banUser, controlPanelPage, editProfilePage} from "./client.js"

// Ban user
$(".ban_btn")
    .on("click", async function () {
        const user_id = $(this).attr("id").split("profile_ban_user#")[1]
        await banUser(user_id)
        editProfilePage(user_id)
    })


// Delete user
$(".dlt_btn")
    .on("click", async function () {
        const user_id = $(this).attr("id").split("profile_delete_user#")[1]
        await deleteUser(user_id)
        controlPanelPage()
    })


// Edit user and save new data
$(".save_btn")
    .on("click", async function () {
        const name   = $("#InputUsername").val()
        const birth  = $("#InputBirthdate").val()
        const role   = $("#InputRole").val()
        const email  = $("#InputEmail").val()
        const status = $("#InputStatus").val()
        const id     = $("#InputId").val()
        const img    = $("#edit_profile_img").attr("src")

        const user = {
            name,
            birth,
            role,
            email,
            status,
            img
        }

        console.log(user)

        await editUser(user, id)
        editProfilePage(id)
    })

$("#delete_image")
    .on("click", async function () {
        $("#edit_profile_img").attr("src", "https://cdn-icons-png.flaticon.com/512/149/149071.png")
        
        const name   = $("#InputUsername").val()
        const birth  = $("#InputBirthdate").val()
        const role   = $("#InputRole").val()
        const email  = $("#InputEmail").val()
        const status = $("#InputStatus").val()
        const id     = $("#InputId").val()
        const img    = $("#edit_profile_img").attr("src")

        const user = {
            name,
            birth,
            role,
            email,
            status,
            img
        }

        console.log(user)

        await editUser(user, id)
        editProfilePage(id)
    })

    