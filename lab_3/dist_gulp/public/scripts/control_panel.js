import{banUser,getUsers}from"./client.js";$(document).ready(async function(){(await getUsers()).forEach(t=>{t="<tr><th class='table_user_name' scope='row'>"+`<a href="/profile/${t.id}" class="control_panel_username">`+t.name+"</a></th><td class='table_user_birth_date' scope=''>"+t.birth+"</td><td class='table_user_role' scope=''>"+t.role+"</td><td class='table_user_access_status' scope=''>"+t.status+"</td><td class='table_user_email' scope=''>"+t.email+"</td><td class='table_user_interaction_buttons' scope=''>"+`<a href="/edit_profile/${t.id}">`+"<button type='button' class='btn btn-primary user_interaction_btn'><i class='fa-solid fa-pen'> </i></button></a>"+`<a href="/profile/${t.id}">`+"<button type='button' class='btn btn-primary user_interaction_btn'><i class='fa-solid fa-circle-info'> </i></button></a>"+`<button type="button" class="btn btn-danger user_interaction_btn ban_btn" id="banUser#${t.id}">`+"<i class='fa-solid fa-ban'> </i></button></td></tr>";$("#table_body").append($(t))})}),$(".ban_btn").on("click",async function(){var t=$(this).attr("id").split("banUser#")[1];await banUser(t),location.reload()});