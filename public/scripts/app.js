/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
console.log('Sanity check, JS is working!');

$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/albums').success(function (albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  });

$('#album-form form').on('submit', function(e){
  e.preventDefault();
  var formData = $(this).serialize();
  //print out form data
  console.log('formData: ', formData);

  $.post('/api/albums').success(function(albums){
    albums.forEach(function(album){
      renderAlbum(album);
      console.log(album);
    });
    $(this).trigger('reset');
    });
  });
});

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album', album);
  var albumHtml = $('#album-template').html();
      albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}
