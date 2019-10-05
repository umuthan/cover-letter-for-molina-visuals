var playing = false;
var pressedKeys = new Array();
var audio = document.getElementById("lacrimosa");
var level = 'easy';
var isMobile = false;

function arrayRemoveElement(element) {
  for( var i = 0; i < pressedKeys.length; i++){
   if ( pressedKeys[i] === element) {
     pressedKeys.splice(i, 1);
   }
  }
}

// Function for StartOver
function startOver() {
  audio.pause();
  audio.currentTime = 0;
  $('#letter').hide();
  $('#start').show();
}

// Changing Pages on Score Table
function scorePages(time) {
  var roundNumber = Math.round(time);

  if(time>0) {
    $('#tutorial').fadeOut('fast');
  } else {
    $('#tutorial').fadeIn('fast');
  }

  $('ul#score li').hide();
  $('ul#score li').each(function(){
    if($(this).attr('data-start')<=roundNumber && $(this).attr('data-end')>roundNumber){
      $(this).show();
    }
  });

  if(time>168) {
    startOver();
  }
}

// Game Functions
function pressedKeysIsOk(time,keys) {
  var statement = false;
  var leftSide = 0;
  var rightSide = 0;
  var leftNumber = 0;
  var rightNumber = 0;

  // If it is mobile don't use notes on keyboard just play
  if(isMobile == true) statement = true;
  else {
    for( var i = 0; i < keys.length; i++){
      if ( keys[i] == '51' ||
           keys[i] == '52' ||
           keys[i] == '53' ||
           keys[i] == '81' ||
           keys[i] == '87' ||
           keys[i] == '69' ||
           keys[i] == '82' ||
           keys[i] == '84') {
        leftSide++;
      }
      if ( keys[i] == '55' ||
           keys[i] == '56' ||
           keys[i] == '57' ||
           keys[i] == '89' ||
           keys[i] == '85' ||
           keys[i] == '73' ||
           keys[i] == '79' ||
           keys[i] == '80') {
        rightSide++;
      }
    }

    // Notes which key should press in which time
    if(level=='hard'){
      if(time<1) {
        leftNumber = 2;
        rightNumber = 0;
        if(leftSide==2) statement = true;
      } else if(time<11) {
        leftNumber = 2;
        rightNumber = 1;
        if(leftSide==2 && rightSide ==1) statement = true;
      } else if(time<14) {
        leftNumber = 1;
        rightNumber = 2;
        if(leftSide==1 && rightSide ==2) statement = true;
      } else if(time<16) {
        leftNumber = 1;
        rightNumber = 3;
        if(leftSide==1 && rightSide ==3) statement = true;
      } else if(time<19) {
        leftNumber = 1;
        rightNumber = 2;
        if(leftSide==1 && rightSide ==2) statement = true;
      } else if(time<69) {
        leftNumber = 1;
        rightNumber = 3;
        if(leftSide==1 && rightSide ==3) statement = true;
      } else if(time<73) {
        leftNumber = 1;
        rightNumber = 2;
        if(leftSide==1 && rightSide ==2) statement = true;
      } else if(time<101) {
        leftNumber = 1;
        rightNumber = 3;
        if(leftSide==1 && rightSide ==3) statement = true;
      } else if(time<111) {
        leftNumber = 3;
        rightNumber = 1;
        if(leftSide==3 && rightSide ==1) statement = true;
      } else if(time<117) {
        leftNumber = 2;
        rightNumber = 2;
        if(leftSide==2 && rightSide ==2) statement = true;
      } else if(time<126) {
        leftNumber = 1;
        rightNumber = 2;
        if(leftSide==1 && rightSide ==2) statement = true;
      } else if(time<133) {
        leftNumber = 1;
        rightNumber = 3;
        if(leftSide==1 && rightSide ==3) statement = true;
      } else if(time<153) {
        leftNumber = 1;
        rightNumber = 4;
        if(leftSide==1 && rightSide ==4) statement = true;
      } else if(time<157) {
        leftNumber = 2;
        rightNumber = 2;
        if(leftSide==2 && rightSide ==2) statement = true;
      } else if(time<180) {
        leftNumber = 2;
        rightNumber = 3;
        if(leftSide==2 && rightSide ==3) statement = true;
      }
    } else {
      leftNumber = 1;
      rightNumber = 1;
      if(leftSide>0 || rightSide > 0) {
        statement = true;
      }
  }

  }

  $('#greenCircle').html(leftNumber);
  $('#blueCircle').html(rightNumber);

  return statement;
}

$(document).ready(function(){
  // vh and vw fix for mobile screens
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  $('#startOver').click(function(){
    startOver();
  });

  // Selecting Level
  $('.level').click(function(){
    if($(this).attr('id') == 'hard') level = 'hard';
    else level = 'easy';
  });

  // Start Button
  $('#start #content .button').click(function(){
    $('#start').fadeOut('slow',function(){
      $('#letter').fadeIn('slow');
    });
  });

  // Game Interval
  setInterval(function() {
    if($('#letter').is(":visible")) {
      scorePages(audio.currentTime);
      if(pressedKeysIsOk(audio.currentTime, pressedKeys)) {
        playing = true;
      } else {
        playing = false;
      }

      if(playing==true) {
        audio.play();
      } else {
        audio.pause();
      }

      $('#piano .key').hide();
      for( var i = 0; i < pressedKeys.length; i++){
        $('#piano #p_'+pressedKeys[i]).show();
      }
    } else {
      startOver();
    }
  }, 100);

  // Keyboard press events for piano playing
  $("body").keyup(function( event ) {
    arrayRemoveElement(event.which);
  }).keydown(function( event ) {
    if(pressedKeys.indexOf(event.which)==-1) {
      pressedKeys.push(event.which);
    }
  });

  // Mobile HTML5 audio fix
  $('#mobilePlay').click(function(){
    isMobile = true;
    var soundHandle = document.getElementById('lacrimosa');
    soundHandle.src = 'assets/lacrimosa.mp3';
    soundHandle.loop = false;
    soundHandle.play();
  });

});
