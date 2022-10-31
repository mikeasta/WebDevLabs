import{banUser,deletePost,getUserFriends,getUserPosts,getProfile}from"./client.js";$(document).ready(async function(){var e=document.location.href.split("/").slice(-1);const t=await getProfile(e);var s=await getUserPosts(e),e=await getUserFriends(e);console.log(t),$(".edit_profile_link").attr("href","/edit_profile/"+t.id),$(".profile_ban_btn").attr("id","banUser#"+t.id),$("#profile_user_img").attr("src",t.img),$("#profile_username").append($(`<p> Имя: <b> ${t.name} </b> </p>`)),$("#profile_birthdate").append($(` <p>Дата рождения: <b> ${t.birth} </b> </p>`)),$("#profile_role").append($(`<p>Роль: <b> ${t.role} </b> </p>`)),$("#profile_email").append($(`<p>Электронная почта: <b> ${t.email} </b> </p>`)),$("#profile_status").append($(`<p>Статус: <b> ${t.status} </b> </p>`)),$("#profile_id").append($(`<p>Идентификатор: <b> ${t.id} </b> </p>`)),s.forEach(e=>{e="<div class='profile_post'>"+`<img src=${t.img} alt="post profile img" class="post_profile_img">`+'<div class="profile_post_text_section"><div class="profile_post_header">'+`<a href='/profile/${e.user_id}' class="profile_post_username">`+t.name+'</a><div class="profile_post_control"><p>'+e.date+"</p>"+`<button type="button" class="btn btn-danger delete_post_btn" id="deletePost#${e.id}">`+"<i class='fa-solid fa-trash-can'> </i></button></div></div><p class=\"profile_post_text\">"+e.text+"</p></div></div>";$("#profile_posts").append($(e))}),e.forEach(e=>{e="<tr><th class='table_user_name' scope='row'>"+`<a href="/profile/${e.id}" class="user_friends_username">`+e.name+"</a></th><td class='table_user_birth_date' scope=''>"+e.birth+"</td><td class='table_user_role' scope=''>"+e.role+"</td><td class='table_user_access_status' scope=''>"+e.status+"</td><td class='table_user_email' scope=''>"+e.email+"</td><td class='table_user_interaction_buttons' scope=''>"+`<a href="/edit_profile/${e.id}">`+"<button type='button' class='btn btn-primary user_interaction_btn'><i class='fa-solid fa-pen'> </i></button></a>"+`<a href="/profile/${e.id}">`+"<button type='button' class='btn btn-primary user_interaction_btn'><i class='fa-solid fa-circle-info'> </i></button></a>"+`<button type="button" class="btn btn-danger user_interaction_btn ban_btn" id="banUser#${e.id}">`+"<i class='fa-solid fa-ban'> </i></button></td></tr>";$("#table_body").append($(e))})}),$(".ban_btn").on("click",async function(){var e=$(this).attr("id").split("banUser#")[1];await banUser(e),location.reload()}),$("#profile_wall_header_posts").on("click",function(){$(this).css("color","#3498db"),$("#profile_wall_header_friends").css("color","#000000"),$("#profile_posts").css("display","block"),$("#profile_friends").css("display","none")}),$("#profile_wall_header_friends").on("click",function(){$(this).css("color","#3498db"),$("#profile_wall_header_posts").css("color","#000000"),$("#profile_posts").css("display","none"),$("#profile_friends").css("display","block")}),$(".delete_post_btn").on("click",async function(){var e=$(this).attr("id").split("deletePost#")[1];await deletePost(e),location.reload()});