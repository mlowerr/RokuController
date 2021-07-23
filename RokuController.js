/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Roku remote reference: https://developer.roku.com/docs/developer-program/debugging/external-control-api.md
// Roku dev tool that inspired this: http://devtools.web.roku.com/RokuRemote/

const KEYPRESS_API_PATH = '/keypress/';
const LAUCNH_API_PATH = '/launch/';

const tvArray = {
  tv1: 'http://192.168.86.40:8060',
  tv2: 'http://192.168.86.43:8060',
  tv3: 'http://192.168.86.41:8060',
  tv4: 'http://192.168.86.29:8060',
  tv5: 'http://192.168.86.42:8060',
};

const channelArray = {
  YouTubeTV: 195316,
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

function postRequest(cb, apiPath, operation) {
  $.post(tvArray[cb.id].concat(apiPath).concat(operation));
}

function keyAction(apiPath, reqAction) {
  cbs.forEach((cb) => {
    if (cb.checked) {
      postRequest(cb, apiPath, reqAction);
    }
  });
}

// Remote actions

// PowerOn works, but it appears that if the TV's have been off for more than an hour they go into a deep sleep and will not
// respond to this command.  The physical remote is needed to first turn the tv on.  This does work to turn a TV on that you
// accidentilly turned them off.

function powerOn() {
  keyAction(KEYPRESS_API_PATH, 'PowerOn');
}

function powerOff() {
  keyAction(KEYPRESS_API_PATH, 'PowerOff');
}

function setHDMI1Input() {
  keyAction(KEYPRESS_API_PATH, 'InputHDMI1');
}

function setHomeInput() {
  keyAction(KEYPRESS_API_PATH, 'Home');
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
      keyAction(KEYPRESS_API_PATH, reqAction);
    }, 500);
  }
}

function volUp() {
  volLoop(KEYPRESS_API_PATH, 'VolumeUp');
}

function volDown() {
  volLoop(KEYPRESS_API_PATH, 'VolumeDown');
}

function volMute() {
  keyAction(KEYPRESS_API_PATH, 'VolumeMute');
}

function keyActionBack() {
  keyAction(KEYPRESS_API_PATH, 'Back');
}

function keyActionUp() {
  keyAction(KEYPRESS_API_PATH, 'Up');
}

function keyActionDown() {
  keyAction(KEYPRESS_API_PATH, 'Down');
}

function keyActionLeft() {
  keyAction(KEYPRESS_API_PATH, 'Left');
}

function keyActionRight() {
  keyAction(KEYPRESS_API_PATH, 'Right');
}

function keyActionSelect() {
  keyAction(KEYPRESS_API_PATH, 'Select');
}

function keyActionRepeat() {
  keyAction(KEYPRESS_API_PATH, 'Repeat');
}

function keyActionInfo() {
  keyAction(KEYPRESS_API_PATH, 'Info');
}

function keyActionReverse() {
  keyAction(KEYPRESS_API_PATH, 'Rev');
}

function keyActionPlay() {
  keyAction(KEYPRESS_API_PATH, 'Play');
}

function keyActionForward() {
  keyAction(KEYPRESS_API_PATH, 'Fwd');
}

function openChannel(channel) {
  // keyAction(LAUCNH_API_PATH, channelArray.YouTubeTV);
  keyAction(LAUCNH_API_PATH, channel);
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
    case 'KeyY': {
      openChannel(channelArray.YouTubeTV);
      break;
    }
    default: {
      break;
    }
  }
});
