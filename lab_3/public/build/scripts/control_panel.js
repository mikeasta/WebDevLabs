import {banUser, getUsers} from "./client.js"

// Fill table with user infos
$(document)
    .ready( async function () {
        const users = await getUsers()
        users.forEach( user => {
            let user_html = 
            "<tr>" +
                "<th class='table_user_name' scope='row'>" +
                    `<a href="/profile/${user.id}" class="control_panel_username">`+
                        user.name +
                    "</a>"+
                "</th>" +
                "<td class='table_user_birth_date' scope=''>" +
                    user.birth +
                "</td>" +
                "<td class='table_user_role' scope=''>" +
                    user.role +
                "</td>" +
                "<td class='table_user_access_status' scope=''>" +
                    user.status +
                "</td>" +
                "<td class='table_user_email' scope=''>" +
                    user.email +
                "</td>" +
                "<td class='table_user_interaction_buttons' scope=''>" +
                    `<a href="/edit_profile/${user.id}">`+
                        "<button type='button' class='btn btn-primary user_interaction_btn'>" +
                            "<i class='fa-solid fa-pen'> </i>" +
                        "</button>" +
                    "</a>" +
                    `<a href="/profile/${user.id}">`+
                        "<button type='button' class='btn btn-primary user_interaction_btn'>" +
                            "<i class='fa-solid fa-circle-info'> </i>" +
                        "</button>" +
                    "</a>" +
                    `<button type="button" class="btn btn-danger user_interaction_btn ban_btn" id="banUser#${user.id}">` +
                        "<i class='fa-solid fa-ban'> </i>" +
                    "</button>" +
                "</td>" +
            "</tr>"

            $("#table_body").append($(user_html))
        })

        // Ban user btn
        $(".ban_btn")
            .on("click", async function() {
                const user_id = $(this).attr("id").split("banUser#")[1]
                await banUser(user_id)
                location.reload()
        })
})



