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

    //MAKES NEW SONG BUTTON WORK
    $('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    //modal function to make modal un hidden
    $('#songModal').data('album-id', id);
    $('#songModal').modal('toggle');

    $('#saveSong').on('click', function(e){
      e.preventDefault();
      var dataSong = $('#modalFieldset').serializeArray();
      console.log(dataSong);
      $.post('/api/albums'+id, dataSong, function(album){
        renderAlbum(album);
      });
      $(this).trigger("reset");
    });
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
  console.log(album);
  var albumHtml = $('#album-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}
