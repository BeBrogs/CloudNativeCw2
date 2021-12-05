//The URIs of the REST endpoint
IUPS = "https://prod-165.westeurope.logic.azure.com:443/workflows/43cca9b9a3114d479de448db648946b7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wGJkgg5kgteD-QGpRv0q9EbDtU3PlMovXMdiOrb5j1Y";
RAI = "https://prod-09.westeurope.logic.azure.com:443/workflows/af69d8084e39452285543cc95021d8e6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=30S7mQqTvs3aTvmqzFYHkVqOW220WRQrD2vKzl5bk3w";

BLOB_ACCOUNT = "https://broganblobaccount.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
  submitData = new FormData();

  //Get form variables and append them to the form data obj
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $('#UpFile')[0].files[0]);
 

  $.ajax({
    url: IUPS,
    data:submitData,
    cache:false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data){

    }
  })

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAI, function( data ) {
    //Create an array to hold all the retrieved assets
    var items = [];
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
    items.push( "<hr />");
    items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br />");
    items.push( "File : " + val["fileName"] + "<br />");
    items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
    items.push( "<hr />");
    });
    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", {
    "class": "my-new-list", html: items.join( "" )
    }).appendTo( "#ImageList" ); });
 
}

