/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

// Roku remote reference: https://developer.roku.com/docs/developer-program/debugging/external-control-api.md
// Roku dev tool that inspired this: http://devtools.web.roku.com/RokuRemote/

const apiPathEnum = {
  KEYPRESS_API_PATH: '/keypress/',
  LAUCNH_API_PATH: '/launch/',
};

// Functions associated with determining which TV's are in scope for operations

// Helper functions to send the post request(s) for all operations

function postRequest(cb, apiPath, operation) {
  $.post(tvEnum[cb.id].concat(apiPath).concat(operation));
}

function keyAction(apiPath, reqAction) {
  tvCheckBoxes.forEach((cb) => {
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
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'PowerOn');
}

function powerOff() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'PowerOff');
}

function setHDMIInput(hdmiInputNumber) {
  let selectedHDMIInput;

  switch (hdmiInputNumber) {
    case 1: {
      selectedHDMIInput = 'InputHDMI1';
      break;
    }
    case 2: {
      selectedHDMIInput = 'InputHDMI2';
      break;
    }
    case 3: {
      selectedHDMIInput = 'InputHDMI3';
      break;
    }
    default: {
      break;
    }
  }

  keyAction(apiPathEnum.KEYPRESS_API_PATH, selectedHDMIInput);
}

function setHomeInput() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Home');
}

// This does not work with 100% accuracy.  There is a time between commands that the
// TVs apparently need (no queing?), but it does help in quickly incrasing or decreasing
// the volume.
function volLoop(apiPath, reqAction) {
  let volumeIncrement = document.querySelector(
    'input[name="volIncrement"]'
  ).value;

  // Guard against negative values and values greater than 20
  if (volumeIncrement < 0) {
    volumeIncrement = 1;
  } else if (volumeIncrement > 20) {
    volumeIncrement = 20;
  }

  for (let x = 0; x < volumeIncrement; x += 1) {
    setTimeout(() => {
      keyAction(apiPath, reqAction);
    }, 500);
  }
}

function volUp() {
  volLoop(apiPathEnum.KEYPRESS_API_PATH, 'VolumeUp');
}

function volDown() {
  volLoop(apiPathEnum.KEYPRESS_API_PATH, 'VolumeDown');
}

function volMute() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'VolumeMute');
}

function keyActionBack() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Back');
}

function keyActionUp() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Up');
}

function keyActionDown() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Down');
}

function keyActionLeft() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Left');
}

function keyActionRight() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Right');
}

function keyActionSelect() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Select');
}

function keyActionRepeat() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Repeat');
}

function keyActionInfo() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Info');
}

function keyActionReverse() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Rev');
}

function keyActionPlay() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Play');
}

function keyActionForward() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'Fwd');
}

function openChannel(channel) {
  keyAction(apiPathEnum.LAUCNH_API_PATH, channelEnum[channel].ChannelID);
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
    case 'KeyR': {
      setHDMI3Input();
      break;
    }
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5': {
      const idx = event.code.substr(5) - 1;
      tvCheckBoxes[idx].click();
      break;
    }
    case 'KeyY': {
      openChannel(channelEnum.YouTubeTV.ChannelID);
      break;
    }
    default: {
      break;
    }
  }
});
