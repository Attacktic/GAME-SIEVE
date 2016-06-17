$(document).ready(function(){
  var key = "AIzaSyANqby7sShLVr5kPjqejVdaos9m-A00yzM";

   var queryString = location.search;
   var gamesearchquery = queryString.substring(queryString.indexOf("=")+1, queryString.indexOf("&"));

  function createVideoCase(results){
    for (var searchdata in results){
      var videocase = document.createElement("div");
      var mediacase =  document.createElement("iframe");
      var description = document.createElement("div");
      var videotitle = document.createElement("p");
      var videoautor = document.createElement("p");
      description.className = "description";
      videotitle.innerHTML = results[searchdata].title;
      videotitle.style.fontWeight = "bold";
      videoautor.innerHTML =  '<i class="fa fa-youtube-play" aria-hidden="true"></i>' + ' ' + results[searchdata].autor;
      mediacase.className = "videoplayer";
      mediacase.src = "https://www.youtube.com/embed/" + results[searchdata].id;
      videocase.className = "videocase";
      videocase.appendChild(mediacase);
      description.appendChild(videotitle);
      description.appendChild(videoautor);
      videocase.appendChild(description);
      $('#vidiv').append(videocase);
    }
  }

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

  $(document).on("click", ".gameimg", function(){
    $('#vidiv').empty();
    var gamesearch = $(this).attr("alt");
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=rating&q=" + gamesearch + "%20gameplay&maxResults=9&key=" + key,
    success: function(data){
      var results = [];
      for (var result in data.items){
        results.push({
          id: data.items[result].id.videoId.replace('"',''),
          autor: data.items[result].snippet.channelTitle,
          title: data.items[result].snippet.title
        });
      };
      createVideoCase(results);
    }
  })
  });

});
