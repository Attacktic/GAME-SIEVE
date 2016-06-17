$(document).ready(function(){
  var key = "AIzaSyANqby7sShLVr5kPjqejVdaos9m-A00yzM";

   var queryString = location.search;
   if (queryString.indexOf("+") === -1){
   var gamesearchquery = queryString.substring(queryString.indexOf("=")+1, queryString.indexOf("&"));
   }
   else{ var gamesearchquery = queryString.substring(queryString.indexOf("=")+1, queryString.indexOf("+"));}

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
      var gamename = document.createElement("div");
      gamebox.className = "gamebox";
      gameimg.src = searchresults[game].img;
      gamename.innerHTML = searchresults[game].name;
      gamebox.appendChild(gameimg);
      gamebox.appendChild(gamename);
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
    url: "http://api.giantbomb.com/search?query=" + gamesearchquery + "&resources=game&api_key=75845dec33173c0ee810df3d3984e10cd4596231&format=jsonp&json_callback=myCallback",
    dataType: "jsonp",
    jsonpCallback: 'myCallback',
    success: function myCallback (resultdata){
      console.log(resultdata)
      var searchresults = [];
      for (var game in resultdata.results){
        if (resultdata.results[game].aliases !== null){
        searchresults.push({
          name: resultdata.results[game].aliases,
          img: resultdata.results[game].image.small_url
        });
        }
      }
      loadGameResults(searchresults);
    }
  });
});


  $('#navbutton').on("click", function(){
    $('#vidiv').empty();
    var gamename = $('#navsearch').val();
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=rating&q=" + gamename + "%20playthrough&maxResults=9&key=" + key,
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
