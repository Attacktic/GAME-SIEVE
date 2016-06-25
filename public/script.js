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

$(document).ready(function(){
  $('#tags').hide();
  var key = "AIzaSyANqby7sShLVr5kPjqejVdaos9m-A00yzM";
  var scores = {"SSoHPKC": [5,1,"UCVdtW2E4vwvf8yh4FY5us9A"],"RabidRetrospectGames": [4,1,"UCm4WlDrdOOSbht-NKQ0uTeg"], "UberHaxorNova": [3.5,1,"UC22TOQWJue006Lp6DB5QhDA"], "Cryaotic": [3,1,"UCu2yrDg7wROzElRGoLQH82A"], "theRadBrad": [3,1,"UCpqXJOEqGS-TCnazcHCo0rA"]};

   var queryString = location.search;
   var gamesearchquery = queryString.substring(queryString.indexOf("=")+1, queryString.indexOf("&"));
   $('#nav').hide();
    var random = backgroundlistindex2[Math.floor(Math.random()*backgroundlistindex2.length)];
    $("main").css("background-image", "url(" + random + ")");

   var temparr = Object.keys(scores);
   for (var i = 0; i < 5; i++){
     var play = document.createElement("div");
     play.className = "player";
     var number = document.createElement("div");
     number.className = "num";
     number.innerHTML = i+1;
     play.appendChild(number);
     var channelnametop = document.createElement("div");
     var named =  document.createElement("p");
     named.innerHTML = temparr[i];
     channelnametop.appendChild(named);
     if (named.innerHTML !== "undefined"){
       var subsupbox =  document.createElement("span");
       subsupbox.className = "subsupbox";
       var channelIdTop = scores[temparr[i]][2];
       var subsup = document.createElement("div");
       var arrow = document.createElement("div");
       arrow.className = "arrow-right";
       subsup.className = "subsup";
       subsup.innerHTML = '<div id="___ytsubscribe_0" style="text-indent: 0px; margin: 0px; padding: 0px; border-style: none; float: none; line-height: normal; font-size: 1px; vertical-align: baseline; display: inline-block; width: 178px; height: 48px; background: transparent;"><iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="position: static; top: 0px; width: 174px; margin: 0px; border-style: none; left: 0px; visibility: visible; height: 48px;" tabindex="0" vspace="0" width="100%" id="I0_1466699223264" name="I0_1466699223264" src="https://www.youtube.com/subscribe_embed?usegapi=1&amp;channelid=' + channelIdTop + '&amp;layout=full&amp;count=default&amp;origin=http%3A%2F%2Flocalhost%3A8000&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.Xu4oTdttB4E.O%2Fm%3D__features__%2Fam%3DAQ%2Frt%3Dj%2Fd%3D1%2Frs%3DAGLTcCPiC5JYpN0PmV_coVNlydRZvp8inQ#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh%2Conload&amp;id=I0_1466699223264&amp;parent=http%3A%2F%2Flocalhost%3A8000&amp;pfname=&amp;rpctoken=14813327" data-gapiattached="true"></iframe></div>';
       subsupbox.appendChild(arrow);
       subsupbox.appendChild(subsup);
       play.appendChild(subsupbox);
     }
     if (named.innerHTML == "undefined"){
       named.innerHTML = "--";
       var channelIdTop = "";
     }
     channelnametop.className = "playerId";
     play.appendChild(channelnametop);
     $('#ranked').append(play);
   }
     $('.subsupbox').hide();

   $('#showtags').on("click", function(){
     $('#showtags').hide();
     $('#tags').show();
   });

   $('#closetags').on("click", function(){
     $('#tags').hide();
     $('#showtags').show();
   });

   $('#goback').on("click", function(){
     $('#nav').hide();
     $('#vidiv').empty();
     $('#vidiv').css("margin-top", "8vh");
     var link;
     if ($('#navsearch').val().length === 0){
       link = "https://videogamesrating.p.mashape.com/get.php?count=20&game=" + gamesearchquery;
     }
     else {
       var newsearch = $('#navsearch').val();
       link = "https://videogamesrating.p.mashape.com/get.php?count=20&game=" + newsearch;
     }
     $.ajax({
       url: link,
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

   function translator(lang, checkedlist){
     var langs = { "%20co-op":["%20campaña|co-op", "%20campanha|co-op"],"%20funny": ["%20gracioso","%20engraçado|funny"], "%20secrets": ["%20secretos", "%20segredos"], "%20fails": ["%20fails", "%20fails"],  "%20cheats": ["%20trampas|cheats","%20fraudes|cheats"], "%20online": ["%20online","%20online"]};
     if (lang === "%20español"){
       checkedlist.forEach(function(ch,i){
          console.log(ch)
           checkedlist[i] = langs[ch][0];
       });
     }
     else if(lang === "%20portugues"){
       checkedlist.forEach(function(ch, i){
           checkedlist[i] = langs[ch][1];
       });
     }
     return checkedlist;
   }

   function getSelectedChbox(lang){
     var checkedlist = [];
     var allinputs = document.getElementsByTagName('input');
     for(var i=0; i<allinputs.length; i++) {
       if(allinputs[i].type == 'checkbox' && allinputs[i].checked == true) {
         checkedlist.push(allinputs[i].value);
       }
     }
     return translator(lang, checkedlist).join('');
     //return checkedlist.join('');
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
    $('#vidiv').css("height", "95%");
    $('main').css("height", "160vh");
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
      var channelinfoyt =  document.createElement("span");
      var arrowl = document.createElement("span");
      arrowl.className = "arrow-left";
      channelinfoyt.innerHTML = '<div id="___ytsubscribe_0" style="text-indent: 0px; margin: 0px; padding: 0px; border-style: none; float: none; line-height: normal; font-size: 1px; vertical-align: baseline; display: inline-block; width: 178px; height: 48px; background: transparent;"><iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="position: static; top: 0px; width: 174px; margin: 0px; border-style: none; left: 0px; visibility: visible; height: 48px;" tabindex="0" vspace="0" width="100%" id="I0_1466699223264" name="I0_1466699223264" src="https://www.youtube.com/subscribe_embed?usegapi=1&amp;channelid=' + channelId + '&amp;layout=full&amp;count=default&amp;origin=http%3A%2F%2Flocalhost%3A8000&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.Xu4oTdttB4E.O%2Fm%3D__features__%2Fam%3DAQ%2Frt%3Dj%2Fd%3D1%2Frs%3DAGLTcCPiC5JYpN0PmV_coVNlydRZvp8inQ#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh%2Conload&amp;id=I0_1466699223264&amp;parent=http%3A%2F%2Flocalhost%3A8000&amp;pfname=&amp;rpctoken=14813327" data-gapiattached="true"></iframe></div>';
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
      channelinfo.appendChild(arrowl);
      channelinfo.appendChild(channelinfoyt);
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
    var thisvideoId = this.parentNode.parentNode.firstChild.src;
    var popup = document.createElement("div");
    var close = document.createElement("div");
    var videoplayerpop = document.createElement("iframe");
    videoplayerpop.className = "theaterplayer";
    videoplayerpop.src = thisvideoId + "&start=0&autoplay=1";
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

$(document).on("mouseenter", ".player", function(){
  $(this).children(".subsupbox").show();
  ($('.subsupbox').not($(this).children(".subsupbox"))).hide();
});

$(document).on("mouseleave", ".subsupbox", function(){
    $(this).hide();
  });

  $(document).on("mouseenter", "#vidiv", function(){
      $('.subsupbox').hide();
    });

  $(document).on("mouseenter", ".videoplayer", function(){
      $('.channelinfo').hide();
    });

$(document).on("mouseleave", ".channelinfo", function(){
    $(this).hide();
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
    e.preventDefault();
    var channelnametag = $(this).parent().parent().children(".videoautor").html();
    var channelname = channelnametag.substring(channelnametag.lastIndexOf(">")+1, channelnametag.length);
  $(this).parent().parent().children(".ratingcase").append(createStarRating(channelname));
  });

  function loadGameResults(searchresults){
    $('#loading').show();
    var count = 0;
    for (var game in searchresults){
      count += 1;
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
      if (searchresults[game].img === ""){
        gameimg.src = "/images/notfound.png";
      }
      else {gameimg.src = searchresults[game].img;}
      gameimg.alt = searchresults[game].name;
      gameimg.className = "gameimg";
      gameimgdiv.appendChild(gameimg);
      gamename.innerHTML = searchresults[game].name;
      gamebox.appendChild(gameimgdiv);
      gamebox.appendChild(gamename);
      gamebox.appendChild(gameplatforms);
      $('#vidiv').append(gamebox);
    }
    $('#loading').hide();
    if (Math.ceil(count/5) === 1){
      $('#vidiv').css("height", "50vh");
      $('main').css("height","90vh");
    }
    else{
      var vidivh = 50 + Math.ceil(count/5)*30;
      $('#vidiv').css("height", vidivh  + "vh");
      var vidiv30 = vidivh + 30 + "vh";
      console.log(vidiv30)
      $('main').css("height",vidiv30);
    }
  }
  $(document).on("click", '.ratenow', function(e){
    e.preventDefault();
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

function ifNotFound(){
  var notfound = document.createElement("span");
  notfound.innerHTML = "No Results Found";
  notfound.id = "nfound";
  $('#vidiv').append(notfound);
}

$('#navbutton').on("click", function(e){
  e.preventDefault();
  $('#nav').hide();
  $('input[type=checkbox]').attr('checked',false);
  var newsearch = $('#navsearch').val();
  gamesearchquery = newsearch;
  $('#vidiv').empty();
  $('#vidiv').css("margin-top", "8vh");
  $.ajax({
    url: "https://videogamesrating.p.mashape.com/get.php?count=20&game=" + gamesearchquery,
    headers: {
      'X-Mashape-Key': 'B7yQCdljWYmshGmHE31bczbw9O58p1qDbyXjsncphjvoxN87Pt',
      "Accept": "application/json"
   },
    success: function(resultdata){
      if(resultdata.length !== 0){
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
    else {
      ifNotFound();
    }
    }
  });
});
var gamesearch;

  $(document).on("click", ".gameimg", function(e){
    e.preventDefault();
    $('#nav').show();
    $('#vidiv').empty();
    $('#vidiv').css("margin-top","-2vh");
    gamesearch = $(this).attr("alt");
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&order=viewCount&q=" + gamesearch + "%20gameplay%20-unboxing&maxResults=9&key=" + key,
    success: function(data){
      var results = [];
      if (data.items.length === 0){
        ifNotFound();
      }
      for (var result in data.items){
        if(scores[data.items[result].snippet.channelTitle] !== undefined){
          results.unshift({
            id: data.items[result].id.playlistId.replace('"',''),
            autor: data.items[result].snippet.channelTitle,
            title: data.items[result].snippet.title,
            score: scores[data.items[result].snippet.channelTitle][0],
            channelId: data.items[result].snippet.channelId
          });
        }
        else{
          results.push({
            id: data.items[result].id.playlistId.replace('"',''),
            autor: data.items[result].snippet.channelTitle,
            title: data.items[result].snippet.title,
            score: "not rated",
            channelId: data.items[result].snippet.channelId
          });
        }
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
        //alert("sent");
      }
    });
    $(this).parent().parent().parent().children(".score").show();
    if ($(this).parent().parent().parent().children(".score").html() == '<i class="fa fa-star" aria-hidden="true"></i> not rated'){
      $(this).parent().parent().parent().children(".score").html('<i class="fa fa-star" aria-hidden="true"></i>' + " " + this.value);
    }
    else {
      $(this).parent().parent().parent().children(".score").html('<i class="fa fa-star" aria-hidden="true"></i>' + " " + ((scores[formData.channel][0] +  Number(this.value)) / (scores[formData.channel][1]+1)));}
    $(this).parent().parent().remove();
  });

function filterSelect(){
  var xquery = $("#selectval").html();
  var lang = $("#selectval2").html();
  var gameplay = "%20gameplay";
  $('#vidiv').empty();
  var link;
  if (getSelectedChbox(lang).length === 0){
    link = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&order=viewCount&q=" + xquery + gamesearch + gameplay + lang + getSelectedChbox(lang) + "&maxResults=9&key=" + key;
  }
  else { link = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&order=viewCount&q=" + xquery + gamesearch + lang + getSelectedChbox(lang) + "&maxResults=9&key=" + key;}
$.ajax({
  method: "GET",
  url: link,
  success: function(data){
    console.log(link)
    var results = [];
    if (data.items.length === 0){
      ifNotFound();
    }
    for (var result in data.items){
      if(scores[data.items[result].snippet.channelTitle] !== undefined){
        results.unshift({
          id: data.items[result].id.playlistId.replace('"',''),
          autor: data.items[result].snippet.channelTitle,
          title: data.items[result].snippet.title,
          score: scores[data.items[result].snippet.channelTitle][0],
          channelId: data.items[result].snippet.channelId
        });
      }
      else{
        results.push({
          id: data.items[result].id.playlistId.replace('"',''),
          autor: data.items[result].snippet.channelTitle,
          title: data.items[result].snippet.title,
          score: "not rated",
          channelId: data.items[result].snippet.channelId
        });
      }
    }
    createVideoCase(results);
  }
});
}

$(document).on("click", ".tag", function(){
  var checkedlist = [];
  if($(this).children(".check").prop('checked') === true){
    $(this).children(".check").prop('checked', false);
  }
  else {$(this).children(".check").prop('checked', true);}
  filterSelect();
});

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
