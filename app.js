countdown = {};

window.addEventListener('load', function() {

  document.getElementById('titlesession').style.display ='inline-block';

  document.getElementById('titlebreak').style.display ='none';

  // Change session length values
  let sessionUp = document.getElementById('sess-up').addEventListener('click', function() {

    clearInterval(countdown.ticker);

    let x = parseInt(document.getElementById('session').textContent);
    if(x < 60) {
      x++;
    };
    document.getElementById('session').textContent = x;
    document.getElementById('minutes').textContent = x;
    document.getElementById('seconds').textContent = 0;

    document.getElementById('start').style.display = 'inline-block';

    document.getElementById('stop').style.display = 'inline-block';

    document.getElementById('running').style.display = 'none';

    document.getElementById('stopped').style.display = 'none';
  });

  let sessionDown = document.getElementById('sess-dw').addEventListener('click', function() {

    clearInterval(countdown.ticker);

    let x = parseInt(document.getElementById('session').textContent);
    if (x > 1) {
      x--
    };
    document.getElementById('session').textContent = x;
    document.getElementById('minutes').textContent = x;
    document.getElementById('seconds').textContent = 0;

    document.getElementById('start').style.display = 'inline-block';

    document.getElementById('stop').style.display = 'inline-block';

    document.getElementById('running').style.display = 'none';

    document.getElementById('stopped').style.display = 'none';
  });

  // Change break length values
  let breakUp = document.getElementById('bre-up').addEventListener('click', function() {

    clearInterval(countdown.ticker);

    let x = parseInt(document.getElementById('break').textContent);
    if(x < 60) {
      x++;
    };
    document.getElementById('break').textContent = x;

    document.getElementById('start').style.display = 'inline-block';

    document.getElementById('stop').style.display = 'inline-block';

    document.getElementById('running').style.display = 'none';

    document.getElementById('stopped').style.display = 'none';
  });

  let breakDown = document.getElementById('bre-dw').addEventListener('click', function() {

    clearInterval(countdown.ticker);

    let x = parseInt(document.getElementById('break').textContent);
    if (x > 1) {
      x--;
    };
    document.getElementById('break').textContent = x;

    document.getElementById('start').style.display = 'inline-block';

    document.getElementById('stop').style.display = 'inline-block';

    document.getElementById('running').style.display = 'none';

    document.getElementById('stopped').style.display = 'none';
  });

  // Start button
  let start = document.getElementById('start').addEventListener('click', function () {
    let x = parseInt(document.getElementById('minutes').textContent);
    let y = parseInt(document.getElementById('seconds').textContent);
    let sessionNum = parseInt(document.getElementById('session').textContent);

    if(x === sessionNum && y === 0) {
      update();
    };

    clearInterval(countdown.ticker);

    document.getElementById('running').style.display = 'inline-block';

    document.getElementById('start').style.display = 'none';

    document.getElementById('stop').style.display = 'inline-block';

    document.getElementById('stopped').style.display = 'none';

    countdown.end;

    countdown.min = document.getElementById('minutes');
    countdown.sec = document.getElementById('seconds');

    if (countdown.end > 0) {
      countdown.ticker = setInterval(function() {
        countdown.end--;
        if (countdown.end <= 0) {
          clearInterval(countdown.ticker); 
        }

        let secs = countdown.end;
        let mins = Math.floor(secs / 60);
        secs -= mins * 60;

        countdown.min.innerHTML = mins;
        countdown.sec.innerHTML = secs;
      }, 1000);
    };
  });

  // Stop button
  let stop = document.getElementById('stop').addEventListener('click', function () {

    clearInterval(countdown.ticker);

    document.getElementById('stopped').style.display = 'inline-block';

    document.getElementById('start').style.display = 'inline-block';

    document.getElementById('stop').style.display = 'none';

    document.getElementById('running').style.display = 'none';
  });

  // Reset buttons
  let reset = document.getElementById('reset').addEventListener('click', function() {

    clearInterval(countdown.ticker);

    document.getElementById('stopped').style.display = 'none';

    document.getElementById('running').style.display = 'none';

    document.getElementById('stop').style.display = 'inline-block';

    document.getElementById('start').style.display = 'inline-block';

    // reset value will equal session time
    if(document.getElementById('titlesession').style.display === 'inline-block'){
      sessionTime();
    };

    // reset value will equal break time
    if(document.getElementById('titlesession').style.display === 'none'){
      breakTime();
    };
  });

  // gets the value for the sessiom
  function update() {
    clearInterval(countdown.ticker);

    let session = parseInt(document.getElementById('session').textContent);

    countdown.end = (session * 60) + 1;

    countdown.min = document.getElementById('minutes');
    countdown.sec = document.getElementById('seconds');

    if (countdown.end > 0) {
      countdown.ticker = setInterval(function() {
        countdown.end--;
        if (countdown.end <= 0) {
          clearInterval(countdown.ticker);
        }
    
        let secs = countdown.end;
        let mins = Math.floor(secs / 60);
        secs -= mins * 60;
    
        countdown.min.innerHTML = mins;
        countdown.sec.innerHTML = secs;
    
        clearInterval(countdown.ticker);
      }, 1000);
    };
  };

  // Detects if it is break or session time
  function detect() {
    let x = parseInt(document.getElementById('minutes').textContent);
    let y = parseInt(document.getElementById('seconds').textContent);

    if (x === 0 && y === 0 && document.getElementById('titlesession').style.display === 'inline-block') {
      clearInterval(intDetect);
      breakTime();
    } else if (x === 0 && y === 0 && document.getElementById('titlebreak').style.display === 'inline-block') {
      clearInterval(intDetect);
      sessionTime();
    };
  };

  let intDetect = setInterval(detect, 100);

  // Timer for Breaks
  function breakTime() {
    document.getElementById('titlesession').style.display = 'none';
    document.getElementById('titlebreak').style.display = 'inline-block';

    clearInterval(countdown.ticker);

    let breakNum = parseInt(document.getElementById('break').textContent);

    countdown.end = breakNum * 60;

    countdown.min = document.getElementById('minutes');
    countdown.sec = document.getElementById('seconds');

    if (countdown.end > 0) {
      countdown.ticker = setInterval(function() {
        countdown.end--;
        if (countdown.end <= 0) {
          clearInterval(countdown.ticker);
          sessionTime();
        }
    
        let secs = countdown.end;
        let mins = Math.floor(secs / 60);
        secs -= mins * 60;
    
        countdown.min.innerHTML = mins;
        countdown.sec.innerHTML = secs;
      }, 1000);
    };
  };

  // Timer for Sessions
  function sessionTime() {
    document.getElementById('titlesession').style.display = 'inline-block';
      document.getElementById('titlebreak').style.display = 'none';

    clearInterval(countdown.ticker);

    let sessionNum = parseInt(document.getElementById('session').textContent);

    countdown.end = sessionNum * 60;

    countdown.min = document.getElementById('minutes');
    countdown.sec = document.getElementById('seconds');

    if (countdown.end > 0) {
      countdown.ticker = setInterval(function() {
        countdown.end--;
        if (countdown.end <= 0) {
          clearInterval(countdown.ticker);
          breakTime();
        };
    
        let secs = countdown.end;
        let mins = Math.floor(secs / 60);
        secs -= mins * 60;
    
        countdown.min.innerHTML = mins;
        countdown.sec.innerHTML = secs;
      }, 1000);
    };
  };

  // Adds color to the final 30 seconds
  function color() {
    if(countdown.end <= 10) {
      document.getElementById('minutes').style.color = 'rgb(209, 2, 2)';
      document.getElementById('seconds').style.color = 'rgb(209, 2, 2)';
    } else if (countdown.end <= 30 && countdown.end >= 20) {
      document.getElementById('minutes').style.color = 'rgb(212, 209, 16)';
      document.getElementById('seconds').style.color = 'rgb(212, 209, 16)';
    } else if (countdown.end <= 20 && countdown.end >= 10) {
      document.getElementById('minutes').style.color = 'rgb(238, 155, 2)';
      document.getElementById('seconds').style.color = 'rgb(238, 155, 2)';
    } else if (countdown.end > 59) {
      document.getElementById('minutes').style.color = 'black';
      document.getElementById('seconds').style.color = 'black';
    };
  };

  setInterval(color, 100);
});