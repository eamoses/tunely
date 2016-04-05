/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');
  //***OBJECTIVE BUTTON FUNCTIONALITY***//
    $(".adding").on("click", function(){
      $("div.col-md-6.col-md-offset-3.popup.hidden").removeClass("hidden");//opens popup to explain objective
    });
    $(".close").on("click", function(){
      $("div.col-md-6.col-md-offset-3.popup").addClass("hidden"); //makes popup go hidden again so you can play the game
    });
  //get function to get the albums and loop thru for each
  $.get('/api/albums').success(function (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  });
//use the #album-form form - not the button's id.
  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    //strings all the form data together into a string
    var formData = $(this).serialize();
    console.log('formData', formData);
    //grabs the form data and goes thru the post function to render it to the handlebars (function below)
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    //trigger reset is a function that automatically resets the form
    $(this).trigger("reset");
  });

});


// this function takes a single album and renders it to the page with handlebars
function renderAlbum(album) {
  console.log('rendering album', album);
  var albumHtml = $('#album-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}
