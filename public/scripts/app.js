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
    // $('#albums').on('click', '.add-song', function(e) {
    // console.log('add-song clicked!');
    // var id = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    // console.log('id',id);
    //modal function to make modal un hidden
    // $('#songModal').data('id', id);
    // $('#songModal').modal('toggle');
    // });

    // catch and handle the click on an add song button
    $('#albums').on('click', '.add-song', handleAddSongClick);

    // save song modal save button
    $('#saveSong').on('click', handleNewSongSubmit);

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


  // when the add song button is clicked, display the modal
  function handleAddSongClick(e) {
    console.log('add-song clicked!');
    var currentAlbumId = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',currentAlbumId);
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();  // display the modal!
  }


  // when the song modal submit button is clicked:
  function handleNewSongSubmit(e) {
    e.preventDefault();
    var $modal = $('#songModal');
    var $songNameField = $modal.find('#songName');
    var $trackNumberField = $modal.find('#trackNumber');

    // get data from modal fields
    // note the server expects the keys to be 'name', 'trackNumber' so we use those.
    var dataToPost = {
      name: $songNameField.val(),
      trackNumber: $trackNumberField.val()
    };
    var albumId = $modal.data('albumId');
    console.log('retrieved songName:', songName, ' and trackNumber:', trackNumber, ' for album w/ id: ', albumId);
    // POST to SERVER
    var songPostToServerUrl = '/api/albums/'+ albumId + '/songs';
    $.post(songPostToServerUrl, dataToPost, function(data) {
      console.log('received data from post to /songs:', data);
      // clear form
      $songNameField.val('');
      $trackNumberField.val('');

      // close modal
      $modal.modal('hide');
      // update the correct album to show the new song
      $.get('/api/albums/' + albumId, function(data) {
        // remove the current instance of the album from the page
        $('[data-album-id=' + albumId + ']').remove();
        // re-render it with the new album data (including songs)
        renderAlbum(data);
      });
    }).error(function(err) {
      console.log('post to /api/albums/:albumId/songs resulted in error', err);
    });
  }


// this function takes a single album and renders it to the page with handlebars
function renderAlbum(album) {
  console.log(album);
  var albumHtml = $('#album-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}
