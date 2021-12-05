RAAURI = "https://prod-85.westeurope.logic.azure.com/workflows/e7befde12ec648b48261311c6e2139a0/triggers/manual/paths/invoke/rest/v1/following/Brogan?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4v3JGQChiaD4aetg8wWUckmASd2G0goK11ZBfLmWStw";
get_photos1 = "https://prod-32.westeurope.logic.azure.com/workflows/944df60bc98544e2b55f43aab74c132f/triggers/manual/paths/invoke/rest/v1/posts/"
get_photos2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1rOucHdyCNv69QwcsxPuI4kGeIHhH29SRAApg48uAak"
BLOB_ACCOUNT = "https://broganblobaccount.blob.core.windows.net";

$(document).ready(function() {
    //Handler for the new asset submission button
    $("#retAssets").click(function(){

        //Run the get asset list function
        getFollowingList();
  
    }); 
     
   }); 

   

function getFollowingList(){
    //Replace the current HTML in that div with a loading message
    $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
    $.getJSON(RAAURI, function(data){
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


function viewPosts(user){
    $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    url =  get_photos1 + user + get_photos2
    console.log(url);
    $.getJSON(url, function(data){
        var photo_arr=[];
        $.each(data['value'], function(key, val){
            console.log(BLOB_ACCOUNT + val['filePath']);
            photo_arr.push("<hr/>");
            photo_arr.push("<img src='" + BLOB_ACCOUNT+ val["filePath"] + "' width='300'/><br/>")
            photo_arr.push("<hr/>");
        });
            //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", {
    "class": "my-new-list", html: photo_arr.join( "" )
    }).appendTo( "#ImageList" ); });

}

function test(user){
    console.log(user);
}