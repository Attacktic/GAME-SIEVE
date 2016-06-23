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
  });
}

function onPlayerReady(e){
  e.target.playVideo();
}

function onPlayerStateChange(e){}

function getCurrentTime() {
  player.getCurrentTime();
}

$(document).ready(function(){
  var key = "AIzaSyANqby7sShLVr5kPjqejVdaos9m-A00yzM";
  var scores = {"SSoHPKC": [5,1],"RabidRetrospectGames": [4,1], "UberHaxorNova": [3.5,1], "Cryaotic": [3,1]};

   var queryString = location.search;
   var gamesearchquery = queryString.substring(queryString.indexOf("=")+1, queryString.indexOf("&"));
   $('#nav').hide();
    var random = backgroundlistindex2[Math.floor(Math.random()*backgroundlistindex2.length)];
    $("main").css("background-image", "url(" + random + ")");

   var temparr = Object.keys(scores);
   for (var i = 0; i < 5; i++) {
     var play = document.createElement("div");
     play.className = "player";
     var number =  document.createElement("div");
     number.className = "num";
     number.innerHTML = i+1;
     play.appendChild(number);
     var channelnametop = document.createElement("p");
     channelnametop.innerHTML = temparr[i];
     if (channelnametop.innerHTML == "undefined"){
       channelnametop.innerHTML = "--";
     }
     channelnametop.className = "playerId";
     play.appendChild(channelnametop);
     $('#ranked').append(play);
   }

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
      var channelId = results[searchdata].channelId;
      var score = document.createElement("div");
      var rating = document.createElement("div");
      var rate = document.createElement("button");
      var expand = document.createElement("span");
      var next = document.createElement("span");
      var prev = document.createElement("span");
      var channelinfo = document.createElement("span");
      channelinfo.innerHTML = '<div id="___ytsubscribe_0" style="text-indent: 0px; margin: 0px; padding: 0px; border-style: none; float: none; line-height: normal; font-size: 1px; vertical-align: baseline; display: inline-block; width: 178px; height: 48px; background: transparent;"><iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="position: static; top: 0px; width: 174px; margin: 0px; border-style: none; left: 0px; visibility: visible; height: 48px;" tabindex="0" vspace="0" width="100%" id="I0_1466699223264" name="I0_1466699223264" src="https://www.youtube.com/subscribe_embed?usegapi=1&amp;channelid=' + channelId + '&amp;layout=full&amp;count=default&amp;origin=http%3A%2F%2Flocalhost%3A8000&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.Xu4oTdttB4E.O%2Fm%3D__features__%2Fam%3DAQ%2Frt%3Dj%2Fd%3D1%2Frs%3DAGLTcCPiC5JYpN0PmV_coVNlydRZvp8inQ#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh%2Conload&amp;id=I0_1466699223264&amp;parent=http%3A%2F%2Flocalhost%3A8000&amp;pfname=&amp;rpctoken=14813327" data-gapiattached="true"></iframe></div>'
      channelinfo.className = "channelinfo";
      prev.className = "prev";
      prev.title = "Previous video";
      prev.innerHTML ='<i class="fa fa-step-backward" aria-hidden="true"></i>';
      next.className = "next";
      next.title = "Next video";
      next.innerHTML ='<i class="fa fa-step-forward" aria-hidden="true"></i>';
      expand.className = "expand";
      expand.title = "Theater mode";
      expand.innerHTML ='<i class="fa fa-expand" aria-hidden="true"></i>';
      rating.className = "ratingcase";
      rate.className = "ratenow";
      rate.innerHTML = "RATE";
      score.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>' + " " + results[searchdata].score;
      score.className = "score";
      description.className = "description";
      videoautor.innerHTML =  '<i class="fa fa-youtube-play" aria-hidden="true"></i>' + ' ' + results[searchdata].autor;
      videoautor.className = "videoautor";
      mediacase.className = "videoplayer";
      mediacase.src = "https://www.youtube.com/embed/videoseries?" + "enablejsapi=1&version=3" + "&list=" + results[searchdata].id;
      mediacase.setAttribute('allowFullScreen', '');
      mediacase.setAttribute('allowscriptaccess', 'always');
      videocase.className = "videocase";
      videocase.appendChild(mediacase);
      description.appendChild(videoautor);
      score.appendChild(rate);
      description.appendChild(score);
      description.appendChild(rating);
      description.appendChild(expand);
      description.appendChild(next);
      description.appendChild(prev);
      description.appendChild(channelinfo);
      $(rating).hide();
      videocase.appendChild(description);
      $('.channelinfo').hide();
      $('#vidiv').append(videocase);
    }
  }
$(document).on("click", ".expand", function(e){
  e.preventDefault()
  this.parentNode.parentNode.firstChild.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  //var currenttime2 =  this.parentNode.parentNode.firstChild.getCurrentTime();
  //console.log(this.parentNode.parentNode.firstChild.contentWindow.getCurrentTime())
  var thisvideoId = this.parentNode.parentNode.firstChild.src;
  var popup = document.createElement("div");
  var close = document.createElement("div");
  var videoplayerpop = document.createElement("iframe");
  videoplayerpop.className = "theaterplayer";
  videoplayerpop.src = thisvideoId + "&start=1868&autoplay=1";
  videoplayerpop.setAttribute('allowFullScreen', '');
  close.className = "close";
  close.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>';
  popup.id = "popup";
  popup.appendChild(close);
  popup.appendChild(videoplayerpop);
  var body = document.getElementsByTagName('body')[0];
  body.insertBefore(popup, body.childNodes[0]);
});

$(document).on("mouseenter", ".videoautor", function(){
  $(this).parent().children(".channelinfo").show();
});

$(document).on("mouseleave", ".channelinfo", function(){
    $(this).hide()
  });

$("#vidiv").on("mouseenter", function(){
  $(".channelinfo").hide();
});

$(document).on("click", ".next", function(e){
  e.preventDefault();
  this.parentNode.parentNode.firstChild.contentWindow.postMessage('{"event":"command","func":"' + 'nextVideo' + '","args":""}', '*');
});

$(document).on("click", ".prev", function(e){
  e.preventDefault();
  this.parentNode.parentNode.firstChild.contentWindow.postMessage('{"event":"command","func":"' + 'previousVideo' + '","args":""}', '*');
});

$(document).on("click", ".close", function(e){
  e.preventDefault();
  $(this).parent().remove();
});

  $(document).on("click", ".ratenow", function(e){
    e.preventDefault()
    var channelnametag = $(this).parent().parent().children(".videoautor").html();
    var channelname =  channelnametag.substring(channelnametag.lastIndexOf(">")+1, channelnametag.length);
  $(this).parent().parent().children(".ratingcase").append(createStarRating(channelname));
  });

  function loadGameResults(searchresults){
    $('#loading').hide();
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
  $(document).on("click", '.ratenow', function(e){
    e.preventDefault()
    $(this).parent().hide();
    $(this).parent().parent().children('.ratingcase').show();
    $(this).remove();
  });

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

$('#navbutton').on("click", function(e){
  e.preventDefault()
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

  $(document).on("click", ".gameimg", function(e){
    e.preventDefault()
    $('#nav').show();
    $('#vidiv').empty();
    gamesearch = $(this).attr("alt");
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&relevanceLanguage=en&order=viewCount&q=" + gamesearch + "%20gameplay&maxResults=9&key=" + key,
    success: function(data){
      var results = [];
      for (var result in data.items){
        if(scores[data.items[result].snippet.channelTitle] !== undefined){
        var scoreValue = scores[data.items[result].snippet.channelTitle][0];}
        else{
          scoreValue = "not rated";
        }
        results.push({
        //  id: data.items[result].id.videoId.replace('"',''),
          id: data.items[result].id.playlistId.replace('"',''),
          autor: data.items[result].snippet.channelTitle,
          title: data.items[result].snippet.title,
          score: scoreValue,
          channelId: data.items[result].snippet.channelId
        });
      }
      createVideoCase(results);
    }
  });
  });

  $(document).on("click", '.rating-input', function(e){
     e.preventDefault();
     var channeltitle = $(this).parent().children('input[name=channel]').val();
     var formData = {
              'channel' : channeltitle.substring(1, channeltitle.length),
              'score': this.value
          };
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycby9Dgh3JyoCaWSZnqO1tSmqYjnSijF5j6D-xin0yvnA4OgZFyg/exec",
      data: formData,
      method: "POST",
      success: function(data){
        alert("sent");
      }
    });
    $(this).parent().parent().parent().children(".score").show();
    if ($(this).parent().parent().parent().children(".score").html() == '<i class="fa fa-star" aria-hidden="true"></i> not rated'){
      $(this).parent().parent().parent().children(".score").html('<i class="fa fa-star" aria-hidden="true"></i>' + " " + this.value);
    }
    else { $(this).parent().parent().parent().children(".score").html('<i class="fa fa-star" aria-hidden="true"></i>' + " " + Number(scores[formData.channel][0] + this.value)/Number(scores[formData.channel][1])+1);}
    $(this).parent().parent().remove();
  });

function filterSelect(){
  var xquery = $("#selectval").html();
  var lang = $("#selectval2").html();
  $('#vidiv').empty();
  var link = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&relevanceLanguage=en&order=viewCount&q=" + xquery + gamesearch + "%20gameplay" + lang +"&maxResults=9&key=" + key;
$.ajax({
  method: "GET",
  url: link,
  success: function(data){
    var results = [];
    for (var result in data.items){
      if(scores[data.items[result].snippet.channelTitle] !== undefined){
      var scoreValue = scores[data.items[result].snippet.channelTitle][0];}
      else{
        scoreValue = "not rated";
      }
      results.push({
        //id: data.items[result].id.videoId.replace('"',''),
        id: data.items[result].id.playlistId.replace('"',''),
        autor: data.items[result].snippet.channelTitle,
        title: data.items[result].snippet.title,
        score: scoreValue
      });
    }
    createVideoCase(results);
  }
});
}
$(".commentary dd ul li a").click(function() {
    var text = $(this).html();
    $(".commentary dt a span").html(text);
    $("#commentarylist").hide();
});

$(document).on("click", ".commentarya", filterSelect);

$(".commentary dt a").click(function() {
    $("#commentarylist").toggle();
});

$(".language dt a").click(function() {
    $("#languagelist").toggle();
});

$(".commentary dd ul li a").click(function() {
    $("#selectval").hide();
    var text = $(this).html();
    var classvalue = this.lastChild.innerHTML;
    $(".commentary dt a span").html(text);
    $("#selectval").html(classvalue);
    $("#commentarylist").hide();
});

$(".language dd ul li a").click(function() {
    $("#selectval2").hide();
    var text = $(this).html();
    var classvalue = this.lastChild.innerHTML;
    $(".language dt a span").html(text);
    $("#selectval2").html(classvalue);
    $("#languagelist").hide();
});


$(document).bind('click', function(e) {
    var clicked = $(e.target);
    if (! clicked.parents().hasClass("commentary"))
        $("#commentarylist").hide();
});

$(document).bind('click', function(e) {
    var clicked = $(e.target);
    if (! clicked.parents().hasClass("language"))
        $("#languagelist").hide();
});

var text = $(this).html();
$(".commentary dt a span").html(text);

});
