import { 
    editUser, 
    deleteUser, 
    banUser, 
    controlPanelPage, 
    editProfilePage, 
    uploadPhoto,
    confirmUser
} from "./client.js"


// Ban user
$(".ban_btn")
    .on("click", async function () {
        const user_id = $(this).attr("id").split("profile_ban_user#")[1]
        await banUser(user_id)
        editProfilePage(user_id)
    })

// Confirm user
$(".confirm_btn")
    .on("click", async function () {
        const user_id = $(this).attr("id").split("profile_confirm_user#")[1]
        await confirmUser(user_id)
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

        await editUser(user, id)
        editProfilePage(id)
    })


// Deletes profile avatar (changing to standart one)
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

        await editUser(user, id)
        editProfilePage(id)
    })

$("#load_image")
    .on("click", async function () {
        // Import image path
        const img = $("#load_image_input").val()

        // Check if input is empty 
        if (!img) return

        // Upload new photo
        const id = $("#InputId").val()
        await uploadPhoto(id, img)
        editProfilePage(id)
    })