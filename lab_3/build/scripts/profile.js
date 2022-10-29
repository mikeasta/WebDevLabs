import {banUser, deletePost} from "./client.js"

// Current profile ban
$(".ban_btn")
    .on("click", async function() {
        const user_id = $(this).attr("id").split("banUser#")[1]
        await banUser(user_id)
        location.reload()
    })


// Switching profile wall
$("#profile_wall_header_posts")
    .on("click", function () {
        $(this).css("color", "#3498db")
        $("#profile_wall_header_friends").css("color", "#000000")
        $("#profile_posts").css("display", "block")
        $("#profile_friends").css("display", "none")
    })

$("#profile_wall_header_friends")
    .on("click", function () {
        $(this).css("color", "#3498db")
        $("#profile_wall_header_posts").css("color", "#000000")
        $("#profile_posts").css("display", "none")
        $("#profile_friends").css("display", "block")
    })

// Current profile ban
$(".delete_post_btn")
    .on("click", async function() {
        const post_id = $(this).attr("id").split("deletePost#")[1]
        await deletePost(post_id)
        location.reload()
    })