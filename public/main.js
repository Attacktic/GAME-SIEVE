var backgroundlist = ['https://c5.staticflickr.com/8/7562/16057973420_80ee953226_h.jpg',
'https://c7.staticflickr.com/3/2942/15191906630_de0fd9364e_h.jpg',
'https://c7.staticflickr.com/4/3873/14339072110_d8a2311bd3_h.jpg',
'https://c8.staticflickr.com/6/5334/14092240831_42dcf81053_h.jpg',
'https://c6.staticflickr.com/8/7204/14115497973_f50311de35_h.jpg',
'https://c3.staticflickr.com/6/5755/21185132866_725eeb34a1_h.jpg',
'https://c8.staticflickr.com/6/5711/21908602855_099ac8da56_h.jpg',
'https://c3.staticflickr.com/8/7025/27270273306_108f2bf48b_h.jpg'];

var backgroundlistindex2 = ["images/back1.png","images/back2.png","images/back3.png","images/back4.png"];
var trending = ["Mafia 3", "Deus Ex: Mankind Divided", "Gears of War 4", "Battlefield 1", "Titanfall 2", "Batman: Return to Arkham","Civilization VI", "Thumper", "XCOM 2", "Forza Horizon 3", "Super Mario Maker", "World of Final Fantasy", "The Elder Scrolls V"];

$(document).ready(function(){
  var random = backgroundlist[Math.floor(Math.random()*backgroundlist.length)];
  $('#backgroundimg').attr( "src", random );

  var trendingdiv = document.createElement("div");
  trendingdiv.id = "trendingdiv";
for (var i = 0; i < trending.length; i++) {
  if (i === 0){
    var trendingtext = document.createElement("div");
    trendingtext.id =  "trendingtext";
    trendingtext.innerHTML = "Trending:";
    trendingdiv.appendChild(trendingtext);
  }
  var trendinggamediv = document.createElement("div");
  trendinggamediv.innerHTML = trending[i];
  trendinggamediv.id = trending[i];
  trendinggamediv.className = "trendinggamediv";
  trendingdiv.appendChild(trendinggamediv);
  if (i < trending.length-1){
  var separator = document.createElement("div");
  separator.className = "separator";
  separator.innerHTML = "&#8259;";
  trendingdiv.appendChild(separator);
  }
}
  $('#trending').append(trendingdiv);

  var width = $('#trendingdiv').width();
  var containerwidth = $('#trending').width();
  var left = containerwidth;
  function ticker(){
    if (--left < -width){
      left = containerwidth;
    }
    $("#trendingdiv").css("margin-left", left + "px");
    setTimeout(ticker, 10);
  }
  ticker();

  $(document).on("click", ".trendinggamediv", function(){
    $('#game').val(this.id);
    $('#submit').click();
  });
});
