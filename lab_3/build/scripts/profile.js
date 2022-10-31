import {banUser, deletePost, getUserFriends, getUserPosts, getProfile} from "./client.js"

$(document)
    .ready( async function () {
        const user_id = document.location.href.split("/").slice(-1)
        
        // Getting user info
        const user    = await getProfile(user_id)
        const posts   = await getUserPosts(user_id);
        const friends = await getUserFriends(user_id);

        console.log(user)

        // Current user interaction buttons
        $(".edit_profile_link").attr("href", `/edit_profile/${user.id}`)
        $(".profile_ban_btn").attr("id", `banUser#${user.id}`)
        
        // Profile card
        $("#profile_user_img").attr("src", user.img)
        $("#profile_username").append($(`<p> Имя: <b> ${user.name} </b> </p>`))
        $("#profile_birthdate").append($(` <p>Дата рождения: <b> ${user.birth} </b> </p>`))
        $("#profile_role").append($(`<p>Роль: <b> ${user.role} </b> </p>`))
        $("#profile_email").append($(`<p>Электронная почта: <b> ${user.email} </b> </p>`))
        $("#profile_status").append($(`<p>Статус: <b> ${user.status} </b> </p>`))
        $("#profile_id").append($(`<p>Идентификатор: <b> ${user.id} </b> </p>`))

        // Post list
        posts.forEach( post => {
            let post_html =
                "<div class='profile_post'>" +
                    `<img src=${user.img} alt="post profile img" class="post_profile_img">` +
                    '<div class="profile_post_text_section">' +
                        '<div class="profile_post_header">' +
                            `<a href='/profile/${post.user_id}' class="profile_post_username">` +
                                user.name +
                            '</a>'+
                            '<div class="profile_post_control">' +
                                '<p>' + post.date + "</p>" +
                                `<button type="button" class="btn btn-danger delete_post_btn" id="deletePost#${post.id}">` +
                                    "<i class='fa-solid fa-trash-can'> </i>"+
                                '</button>' + 
                            '</div>' +
                        "</div>" +
                        '<p class="profile_post_text">' + post.text + "</p>" +
                    '</div>'+
                "</div>"

            $("#profile_posts").append($(post_html))
        })

        // Friends list
        friends.forEach( user => {
            let user_html = 
            "<tr>" +
                "<th class='table_user_name' scope='row'>" +
                    `<a href="/profile/${user.id}" class="user_friends_username">`+
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
}) 

