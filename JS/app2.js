//The URIs of the REST endpoint
//Uri for following list
following_list = "https://prod-85.westeurope.logic.azure.com/workflows/e7befde12ec648b48261311c6e2139a0/triggers/manual/paths/invoke/rest/v1/following/" + sessionStorage.getItem('user') + "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4v3JGQChiaD4aetg8wWUckmASd2G0goK11ZBfLmWStw";

//URI to upload post
upload = "https://prod-165.westeurope.logic.azure.com:443/workflows/43cca9b9a3114d479de448db648946b7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wGJkgg5kgteD-QGpRv0q9EbDtU3PlMovXMdiOrb5j1Y";

//Uri to get photos belonging to users
get_photos1 = "https://prod-32.westeurope.logic.azure.com/workflows/944df60bc98544e2b55f43aab74c132f/triggers/manual/paths/invoke/rest/v1/posts/"
get_photos2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1rOucHdyCNv69QwcsxPuI4kGeIHhH29SRAApg48uAak"

//URI to blob account
BLOB_ACCOUNT = "https://broganblobaccount.blob.core.windows.net";

//URI to register user
registeruri = "https://prod-163.westeurope.logic.azure.com/workflows/e5f80ac99ceb4b0f9c440edf5bc1d379/triggers/manual/paths/invoke/rest/v1/register?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=srHzlHvQMwVHEoZ0g9Eh_nAHw6rHAKqpASK9vcWn6eQ";

//Login uri, append given username to qry string
q1a = "https://prod-209.westeurope.logic.azure.com/workflows/7c8802785fae4816a87dccb93d913290/triggers/manual/paths/invoke/rest/v1/login/user/";
q1b = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KuIDqJLbv3wlGYy37rzg-CzsVAQbw_lrHOuhBtaDiWI";

//URI to follow another user
followURI= "https://prod-126.westeurope.logic.azure.com/workflows/e074c45b90a74ffb820e3402970ceeb2/triggers/manual/paths/invoke/rest/v2/follow/?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cvexf4gDEnH7ASfWtm1691da3ylgboEUcUmnltIyZ_c";

//Query string used when validating that the user exists when trying to follow them
validate1 = "https://prod-168.westeurope.logic.azure.com/workflows/dea898708efa4e188fb41cca458e1933/triggers/manual/paths/invoke/rest/v1/users/";
validate2= "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GV-ZjH_4j__cWgoUznnuDO7vzRyr56zT6ZZ3r7nB7bY";

//Query strings to unfollow a user, since this is a DELETE method, we pass both usernames in the qry string
unfollw_uri1= "https://prod-215.westeurope.logic.azure.com/workflows/7d9d616813454849b31f044d33430830/triggers/manual/paths/invoke/rest/v1/";
unfollow_uri2 ="/unfollow/";
unfollow_uri3 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iHDKoGiLlvnpRXmvjBLKnUzd1OTbwwRYLCXfsFKjJ6E";

//URI strings to delete a post, only the logged in user can do this to their own posts
delete_post_uri1 = "https://prod-88.westeurope.logic.azure.com/workflows/6c990789020e4e659bf0573287116fd5/triggers/manual/paths/invoke/rest/v1/posts/";
delete_post_uri2="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LyfMoRTaaIxdnA8Hgvcy9yZblu4hZHCkoPnMhk3Ro5k";

//Uri strings used to check that when the current user tries to unfollow another user, they already follow user
check_following1 = "https://prod-195.westeurope.logic.azure.com/workflows/474f7dffe80e4fa19d582281022c2302/triggers/manual/paths/invoke/rest/v1/";
check_following2 = "/following/";
check_following3 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7DFOUpLt4OOfZmxh-kcevL4rLGX4RJZ_IrLyTSLH87c";

user = sessionStorage.getItem('user');
//Handlers for button clicks
$(document).ready(function() {
  $("#login").click(function(){
    login();
    
  }); 
  $("#register_btn").click(function(){
    register();
    
  });
  
  $("#getfollowing").click(function(){
    getFollowingList();

  }); 
  $("#subNewForm").click(function(){
    upload_func();
    
  });
  $("#follow").click(function(){
    follow(); 
  }); 

  $("#unfollow").click(function(){
    unfollow(); 
  }); 

  $("#logout").click(function(){
    logout(); 
  }); 

  $("#show_photos").click(function(){
    profile(); 
  }); 

  $("#delete_photo").click(function(){
    console.log('button pressed');
  }); 
});

//Function for logging in
function login(){
  //Check user isn't already logged in
  if (sessionStorage.getItem('user') == null || sessionStorage.getItem('user') == 'null'){
    username = $('#username').val();
    password_input = $('#password').val();
    //query to get user details to ensure proper name and validation
    login_query = q1a + username + q1b;
        $.getJSON(login_query, function(data){
            $.each(data['ResultSets']['Table1'], function(key, val){
                retr_pass = val['password']
                if (retr_pass == password_input){
                    alert('Logged in Successfully');
                    sessionStorage.setItem('user', username);
                }
                else{
                    alert('Wrong password, try again');
                }
            })
        })
  }else{
    console.log(sessionStorage.getItem('user'));
    alert('You are already logged in, log out')
}
}


//function to register user
function register(){
  //Check user isn't already logged in
  if (sessionStorage.getItem('user') != 'null'){
    alert('Log out to create a new account');
  }
  else{
    //Construct JSON Object for new item
    var subObj={
      username: $('#username').val(),
      password: $('#password').val()
    }
    if ($('#username').val() !='' && $('#password').val() != ''){
    //Convert to a JSON String
    subObj = JSON.stringify(subObj);
    //Post the JSON string to the endpoint
    $.post({
      url: registeruri,
      data: subObj,
      contentType: 'application/json; charset=utf-8'
    }).done( function (response){
      document.getElementById("myForm").reset();
    });
  }else{
    //Inform user of error
    alert('Enter both username and password');
    window.location.replace("register.html");
  }
    
  }
  
  }
  
function getFollowingList(){

      $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
    $.getJSON(following_list, function(data){
        var items=[];
        $.each(data['ResultSets']['Table1'], function(key, val){
            items.push(val['follows'])
             items.push("<button onclick=viewPosts('"+ val["follows"] +"')>View Posts</button>");
            });
    
    //Clear the assetlist div
    $('#AssetList').empty();
    //Append the contents of the items array to the AssetList Div
    $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "<br><br>" )
    }).appendTo( "#AssetList" );
    });
  }



function viewPosts(u, profile=false){
    $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    if (sessionStorage.getItem('user') == 'null'){
      alert('You must be logged in to show the users you follow');
      //window.location.replace("login.html");
    }
    else{
    //Url to 
    url =  get_photos1 + u + get_photos2
    
    $.getJSON(url, function(data){
        var photo_arr=[];
        $.each(data['value'], function(key, val){
            photo_arr.push("<hr/>");
            photo_arr.push("<img src='" + BLOB_ACCOUNT+ val["filePath"] + "' width='300'/><br/>");
            photo_arr.push("<p> Post uploaded by " + val['userID'] + "</p>");
            if (profile == true){
              photo_arr.push("<button onclick=delPost('"+ val["id"] +"')>Delete Post</button>");
              //photo_arr.push('<button type="button" onclick="delPost(' + val['id'] + ')">Delete Photo</button>')
              //photo_arr.push('<button id="delete_photo" onclick=delPost(' + val['id']+ ')>Delete</button>')
            }
            //photo_arr.push("<p>" + val['Caption'] + "</p>");
            photo_arr.push("<hr/>");
        });
            //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", {
    "class": "my-new-list", html: photo_arr.join( "" )
    }).appendTo( "#ImageList" ); });
  }
} 


function upload_func(){
  //Create a form data object
  submitData = new FormData();
  //Get form variables and append them to the form data obj
  submitData.append('FileName', "");
  submitData.append('userID', ""+user+"");
  submitData.append('userName', ""+user+"");
  submitData.append('File', $('#UpFile')[0].files[0]);
  //submitData.append('Caption', $('#Caption').val());
  //Check user is already logged in
  if (sessionStorage.getItem('user') == 'null'){
    alert('You must sign in to upload an image');
    window.location.replace("login.html");
  }
  else{

  $.ajax({
    url: upload,
    data:submitData,
    cache:false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){
        alert('Uploaded');
    }
  })}}

function follow(){
  //Check user is logged in
  if (sessionStorage.getItem('user') == 'null'){
    alert('You must sign in to follow another user')
    window.location.replace("login.html");
  }
  else{
  //Construct JSON Object for new item
  var subObj={
    username: user,
    follows: $('#account').val()
  }
  if ($('#account').val() != ''){
  //Convert to a JSON String
  validate_account =  validate1 + $('#account').val() + validate2;
  $.getJSON(validate_account, function(data){
    $.each(data, function(key, val){
        if (data['ResultSets']["Table1"] !==undefined){
          subObj = JSON.stringify(subObj);
          //Post the JSON string to the endpoint, note the need to set the content type header
          $.post({
           url: followURI,
           data: subObj,
           contentType: 'application/json; charset=utf-8'
          }).done( function (response){
           alert('Followed ' + $('#account').val());});
        }else{
          alert('User "' + $('#account').val() + '" does not exist');
        }
    })
  })

  }else{
    alert('You must enter the account you would like to follow');
  }
  }
}


function profile(){
  //Check user is already logged in
  if (user == null){
    alert('You must be logged in to view your profile posts')

  }else{
    viewPosts(user, true);

  }
}


function unfollow(){
  if (sessionStorage.getItem('user') == 'null'){
    alert('You must be logged in to perform this');
  }else{
  to_unfollow = $('#account').val();
  if (to_unfollow == ''){
    alert('You must enter all fields');
  }else{
    check_following = check_following1 + user + check_following2 + to_unfollow + check_following3;
    console.log(check_following);
    $.getJSON(check_following, function(data){
      $.each(data, function(key, val){
        if (data['ResultSets']["Table1"] !== undefined){
            unfollow_uri = unfollw_uri1 + user + unfollow_uri2 + to_unfollow + unfollow_uri3;
            console.log(unfollow_uri);
            $.ajax({
             url : unfollow_uri,
             method : 'delete',
            })
            alert('Unfollowed ' + to_unfollow);
        }else{
          alert("You don't follow " + to_unfollow + " yet");
        }
      })
    })
    }
}}

function logout(){
  if (sessionStorage.getItem('user') != 'null'){
    sessionStorage.setItem('user', null);
    user=null;
    alert('Logged out successfully');
    window.location.replace("index.html");
  }
  else{
    alert("You can't log out because you're not logged in");
  }
}

function delPost(id){
  console.log(id);
  console.log(delete_post_uri1 + id + delete_post_uri2);
  $.ajax({
    type:"DELETE",
    url: delete_post_uri1 + id + delete_post_uri2,
  }).done(function(msg){
    alert('Post deleted successfully');
    viewPosts(user, true);
  })
}