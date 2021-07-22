// Roku remote reference: https://developer.roku.com/docs/developer-program/debugging/external-control-api.md
// Roku dev tool that inspired this: http://devtools.web.roku.com/RokuRemote/

const tvArray = {
  tv1: 'http://192.168.86.40:8060',
  tv2: 'http://192.168.86.43:8060',
  tv3: 'http://192.168.86.41:8060',
  tv4: 'http://192.168.86.29:8060',
  tv5: 'http://192.168.86.42:8060',
};

// List of TV's in scope for operation

const cbs = document.querySelectorAll('input[name="tv"]');

// Functions associated with determining which TV's are in scope for operations

// This is needed in the javascript file to allow checkAll() and uncheckAll()'s this.onclick to work.
tvToggleBtn.onclick = checkAll;

function check(checked = true) {
  cbs.forEach((cb) => {
    cb.checked = checked;
  });
}

function checkAll() {
  check();
  this.onclick = uncheckAll;
}

function uncheckAll() {
  check(false);
  this.onclick = checkAll;
}

function invertAll() {
  cbs.forEach((cb) => {
    cb.checked = !cb.checked;
  });
}

// Helper functions to send the post request(s) for all operations

function postRequest(cb, operation) {
  $.post(tvArray[cb.id].concat('/keypress/').concat(operation));
}

function keyAction(reqAction) {
  cbs.forEach((cb) => {
    if (cb.checked) {
      postRequest(cb, reqAction);
    }
  });
}

// Remote actions

// PowerOn works, but it appears that if the TV's have been off for more than an hour they go into a deep sleep and will not
// respond to this command.  The physical remote is needed to first turn the tv on.  This does work to turn a TV on that you
// accidentilly turned them off.

function powerOn() {
  keyAction('PowerOn');
}

function powerOff() {
  keyAction('PowerOff');
}

function setHDMI1Input() {
  keyAction('InputHDMI1');
}

function setHomeInput() {
  keyAction('Home');
}

// This does not work with 100% accuracy.  There is a time between commands that the
// TVs apparently need (no queing?), but it does help in quickly incrasing or decreasing
// the volume.
function volLoop(reqAction) {
  let increment = document.querySelector('input[name="volIncrement"]').value;

  // Guard against negative values and values greater than 20
  if (increment < 0) {
    increment = 1;
  } else if (increment > 20) {
    increment = 20;
  }

  for (let x = 0; x < increment; x += 1) {
    setTimeout(() => {
      keyAction(reqAction);
    }, 500);
  }
}

function volUp() {
  volLoop('VolumeUp');
}

function volDown() {
  volLoop('VolumeDown');
}

function volMute() {
  keyAction('VolumeMute');
}

function keyActionBack() {
  keyAction('Back');
}

function keyActionUp() {
  keyAction('Up');
}

function keyActionDown() {
  keyAction('Down');
}

function keyActionLeft() {
  keyAction('Left');
}

function keyActionRight() {
  keyAction('Right');
}

function keyActionSelect() {
  keyAction('Select');
}

function keyActionRepeat() {
  keyAction('Repeat');
}

function keyActionInfo() {
  keyAction('Info');
}

function keyActionReverse() {
  keyAction('Rev');
}

function keyActionPlay() {
  keyAction('Play');
}

function keyActionForward() {
  keyAction('Fwd');
}

// Keyboard shortcuts
addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowDown': {
      keyActionDown();
      break;
    }
    case 'ArrowUp': {
      keyActionUp();
      break;
    }
    case 'ArrowLeft': {
      keyActionLeft();
      break;
    }
    case 'ArrowRight': {
      keyActionRight();
      break;
    }
    case 'Enter': {
      keyActionSelect();
      break;
    }
    case 'KeyM': {
      volMute();
      break;
    }
    case 'KeyJ': {
      volUp();
      break;
    }
    case 'KeyK': {
      volDown();
      break;
    }
    case 'KeyH': {
      setHomeInput();
      break;
    }
    case 'KeyC': {
      setHDMI1Input();
      break;
    }
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5': {
      const idx = event.code.substr(5) - 1;
      cbs[idx].click();
      break;
    }
    default: {
      break;
    }
  }
});
