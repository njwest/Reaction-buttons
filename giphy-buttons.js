window.onload = function(){

$('#addReaction').on('click', function(){
  reactionArray.push(reactionInput.value);
  renderButtons();
  giphyClick();
  return false;
});

  $('.clicky').on('click', function(){
    var state = $(this).attr('data-state');
    
    if (state === 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    }else{
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });


var reactionArray = ["surprised", "excited", "sad", "scared", "mad", "winning", "lolwut", "omg", "disappointed", "crying", "weird", "yelling", "wtf", "wat", "laugh", "giggle", "chortle", "disgust"];

function renderButtons(){
  $('#buttons').empty();

  for (var i = 0; i < reactionArray.length; i++){
    $('#buttons').append('<button class="giphy" data-state="still" data-reaction="' + reactionArray[i] + '">' + reactionArray[i] + '</button');
  }
};

function giphyClick(){
  $('.giphy').on('click', function(){
    $('#reactions').html('');
    var r = $(this).data('reaction');
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + r + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryUrl,
      method: 'GET'
    })
    .done(function(response){
      var results = response.data;

      for (var i = 0; i <results.length; i++){
        var gifDiv = $('<div class="item">');
        var rating = results[i].rating;
        var p = $('<p>').text("Rating: " + rating);

        var reactionImage = $('<img>');
        reactionImage.attr('class', 'clicky');
        reactionImage.attr('data-state', 'still');
        reactionImage.attr('src', results[i].images.fixed_height.url);
        reactionImage.attr('data-still', results[i].images.fixed_height_still.url);
        reactionImage.attr('data-animate', results[i].images.fixed_height.url);

        gifDiv.append(p);
        gifDiv.append(reactionImage);
        $('#reactions').prepend(gifDiv);
      }
    });
  });
};

renderButtons();
giphyClick();



};