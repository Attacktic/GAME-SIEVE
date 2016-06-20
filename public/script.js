$(document).ready(function(){
  var key = "AIzaSyANqby7sShLVr5kPjqejVdaos9m-A00yzM";

   var queryString = location.search;
   var gamesearchquery = queryString.substring(queryString.indexOf("=")+1, queryString.indexOf("&"));
   $('#nav').hide();

   function createStarRating(channelname){
     var span = document.createElement("span");
     span.className = "rating";
     var form = document.createElement("form");
     form.className = "subform";
     var ichannel = document.createElement("input");
     ichannel.name = "channel";
     ichannel.type = "text";
     ichannel.style.display = "none";
     ichannel.id = channelname;
     ichannel.value = channelname;
     form.appendChild(ichannel);
     for (var i = 5; i > 0; i--) {
       i = String(i);
       var inp = document.createElement("input");
       var lab = document.createElement("label");
       inp.className = "rating-input";
       inp.id = "rating-input-1-" + i;
       inp.name = "rating-input-1";
       inp.type = "radio";
       inp.value = i;
       lab.setAttribute("for", "rating-input-1-" + i);
       lab.className = "rating-star";
       form.appendChild(inp);
       form.appendChild(lab);
       span.appendChild(form);
     }
     return form;
   }


  function createVideoCase(results){
    for (var searchdata in results){
      var videocase = document.createElement("div");
      var mediacase =  document.createElement("iframe");
      var description = document.createElement("div");
      var videoautor = document.createElement("p");
      var channelname = results[searchdata].autor;
      var score = document.createElement("div");
      var rating = document.createElement("div");
      var rate = document.createElement("button");
      rating.className = "ratingcase";
      rate.className = "ratenow";
      score.innerHTML = "score: ";
      score.className = "score";
      description.className = "description";
      videoautor.innerHTML =  '<i class="fa fa-youtube-play" aria-hidden="true"></i>' + ' ' + results[searchdata].autor;
      videoautor.className = "videoautor";
      mediacase.className = "videoplayer";
      mediacase.src = "https://www.youtube.com/embed/videoseries?list=" + results[searchdata].id;
      mediacase.setAttribute('allowFullScreen', '');
      videocase.className = "videocase";
      videocase.appendChild(mediacase);
      description.appendChild(videoautor);
      score.appendChild(rate);
      description.appendChild(score);
      description.appendChild(rating);
      $(rating).hide();
      videocase.appendChild(description);
      $('#vidiv').append(videocase);
    }
  }

  //create rating on click of .ratenow

  $(document).on("click", ".ratenow", function(){
    var channelnametag = $(this).parent().parent().children(".videoautor").html();
    var channelname =  channelnametag.substring(channelnametag.lastIndexOf(">")+1, channelnametag.length);
    console.log(channelname)
  $(this).parent().parent().children(".ratingcase").append(createStarRating(channelname))
  });

  function loadGameResults(searchresults){
    for (var game in searchresults){
      var gamebox = document.createElement("div");
      var gameimg = document.createElement("img");
      var gameimgdiv = document.createElement("div");
      gameimgdiv.className = "gameimgdiv";
      var gamename = document.createElement("div");
      var gameplatforms = document.createElement("div");
      gameplatforms.className = "gameplatforms";
      for (var num in searchresults[game].platforms) {
        if (num !== "1"){
        var gameplatform = " / " + searchresults[game].platforms[num];
        }
        else { var gameplatform = searchresults[game].platforms[num]; }
        gameplatforms.innerHTML += gameplatform;
      }
      gamebox.className = "gamebox";
      gameimg.src = searchresults[game].img;
      gameimg.alt = searchresults[game].name;
      gameimg.className = "gameimg";
      gameimgdiv.appendChild(gameimg);
      gamename.innerHTML = searchresults[game].name;
      gamebox.appendChild(gameimgdiv);
      gamebox.appendChild(gamename);
      gamebox.appendChild(gameplatforms);
      $('#vidiv').append(gamebox);
    }
  }
  $(document).on("click", '.ratenow', function(){
    $(this).parent().hide();
    $(this).parent().parent().children('.ratingcase').show();

  });

  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;

  function onYoutubeIframeAPIReady(){
    player = new YT.Player("videoplayer", {
      events: {
        'onReady' : onPlayerReady,
        'onStateChange' : onPlayerStateChange
      }
    })
  }

  function onPlayerReady(e){e.target.playVideo();}

  function onPlayerStateChange(e){}

$(window).on("load", function(){
  $.ajax({
    url: "https://videogamesrating.p.mashape.com/get.php?count=20&game=" + gamesearchquery,
    headers: {
      'X-Mashape-Key': 'B7yQCdljWYmshGmHE31bczbw9O58p1qDbyXjsncphjvoxN87Pt',
      "Accept": "application/json"
   },
    success: function(resultdata){
      var searchresults = [];
      for (var game in resultdata){
        searchresults.push({
          name: resultdata[game].title,
          img: resultdata[game].thumb,
          platforms: resultdata[game].platforms
        });
      }
      loadGameResults(searchresults);
    }
  });
});

$('#navbutton').on("click", function(){
  $('#nav').hide();
  var newsearch = $('#navsearch').val();
  gamesearchquery = newsearch;
  $('#vidiv').empty();
  $.ajax({
    url: "https://videogamesrating.p.mashape.com/get.php?count=20&game=" + gamesearchquery,
    headers: {
      'X-Mashape-Key': 'B7yQCdljWYmshGmHE31bczbw9O58p1qDbyXjsncphjvoxN87Pt',
      "Accept": "application/json"
   },
    success: function(resultdata){
      var searchresults = [];
      for (var game in resultdata){
        searchresults.push({
          name: resultdata[game].title,
          img: resultdata[game].thumb,
          platforms: resultdata[game].platforms
        });
      }
      loadGameResults(searchresults);
    }
  });
});
var gamesearch;

  $(document).on("click", ".gameimg", function(){
    $('#nav').show();
    $('#vidiv').empty();
    gamesearch = $(this).attr("alt");
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&relevanceLanguage=en&order=viewCount&q=" + gamesearch + "%20gameplay&maxResults=9&key=" + key,
    success: function(data){
      var results = [];
      for (var result in data.items){
        results.push({
        //  id: data.items[result].id.videoId.replace('"',''),
          id: data.items[result].id.playlistId.replace('"',''),
          autor: data.items[result].snippet.channelTitle,
          title: data.items[result].snippet.title
        });
      };
      createVideoCase(results);
    }
  })
  });

  $(document).on("click", '.rating-input', function(e){
     e.preventDefault();
     var formData = {
              'channel' : $(this).parent().children('input[name=channel]').val(),
              'score': this.value
          };
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycby9Dgh3JyoCaWSZnqO1tSmqYjnSijF5j6D-xin0yvnA4OgZFyg/exec",
      data: formData,
      method: "POST",
      success: function(data){
        alert("sent");
        console.log(data)
      }
    })
    $(this).parent().parent().parent().children(".score").show();
    $(this).parent().parent().remove();
  });

function filterSelect(){
  var xquery = $(".commentary :selected").val();
  var lang = $(".language :selected").val();
  $('#vidiv').empty();
  var link = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&relevanceLanguage=en&order=viewCount&q=" + xquery + gamesearch + "%20gameplay"+ lang +"&maxResults=9&key=" + key;
$.ajax({
  method: "GET",
  url: link,
  success: function(data){

    var results = [];
    for (var result in data.items){
      results.push({
        //id: data.items[result].id.videoId.replace('"',''),
        id: data.items[result].id.playlistId.replace('"',''),
        autor: data.items[result].snippet.channelTitle,
        title: data.items[result].snippet.title
      });
    };
    createVideoCase(results);
  }
})
}

$( ".commentary" ).change(filterSelect);
$( ".language" ).change(filterSelect);

var scores = [{channel: "UberHaxorNova", score: 3.6},{channel: "SSoHPKC", score: 5},{channel: "RabidRetrospectGames", score: 4},{channel: "Cryaotic", score: 3}]
});
