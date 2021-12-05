//The URIs of the REST endpoint
RAAURI = "";
CIAURI = "https://prod-57.westeurope.logic.azure.com/workflows/ac41bc3d5a0642b5b470806d5344cd35/triggers/manual/paths/invoke/rest/v1/accounts?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kuzkIB_d4tUiOLYGerIvWZiKEU5pSYoGzkyVbKiTMxo";

DIAURI0 = "";
DIAURI1 = "";


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
    password: $('#password').val()
  }

  //Convert to a JSON String
  subObj = JSON.stringify(subObj);

  //Post the JSON string to the endpoint, note the need to set the content type header

  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done( function (response){
    alert('Account Added');
  });

}

