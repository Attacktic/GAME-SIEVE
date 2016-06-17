var backgroundlist = ['https://c5.staticflickr.com/8/7562/16057973420_80ee953226_h.jpg',
'https://c7.staticflickr.com/3/2942/15191906630_de0fd9364e_h.jpg',
'https://c7.staticflickr.com/4/3873/14339072110_d8a2311bd3_h.jpg',
'https://c8.staticflickr.com/6/5334/14092240831_42dcf81053_h.jpg',
'https://c6.staticflickr.com/8/7204/14115497973_f50311de35_h.jpg',
'https://c3.staticflickr.com/6/5755/21185132866_725eeb34a1_h.jpg',
'https://c8.staticflickr.com/6/5711/21908602855_099ac8da56_h.jpg',
'https://c3.staticflickr.com/8/7025/27270273306_108f2bf48b_h.jpg']

$(document).ready(function(){
  var random = backgroundlist[Math.floor(Math.random()*backgroundlist.length)];
  console.log(random)
  $('#backgroundimg').attr( "src", random );
});
