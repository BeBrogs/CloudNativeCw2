//The URIs of the REST endpoint
CIAURI = "https://prod-79.westeurope.logic.azure.com/workflows/1a926d4fcb214c498f5f0bc6b2016d61/triggers/manual/paths/invoke/rest/v1/follow?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vEMc8PcXtApyFmGQDqkOwx8bgk_VLPaS5T9eJt1D0E8";


//Handlers for button clicks
$(document).ready(function() {
   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
  //Construct JSON Object for new item
  var subObj={
    username: $('#username').val(),
    follows: $('#follow').val()
  }

  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header

  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done( function (response){
    alert('Account Followed');
  });

}

