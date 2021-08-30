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

function generatePostRequests(apiPath, reqAction) {
  tvCheckBoxes.forEach((cb) => {
    if (cb.checked) {
      postRequest(cb, apiPath, reqAction);
    }
  });
}

function keypressAction(reqAction) {
  generatePostRequests(apiPathEnum.KEYPRESS_API_PATH, reqAction);
}

function launchAction(reqAction) {
  generatePostRequests(apiPathEnum.LAUCNH_API_PATH, reqAction);
}

// Remote actions

// PowerOn works, but it appears that if the TV's have been off for more than an hour they go into a deep sleep and will not
// respond to this command.  The physical remote is needed to first turn the tv on.  This does work to turn a TV on that you
// accidentilly turned them off.

function powerOn() {
  keypressAction('PowerOn');
}

function powerOff() {
  keypressAction('PowerOff');
}

function setHDMI1Input() {
  keypressAction('InputHDMI1');
}

function setHDMI2Input() {
  keypressAction('InputHDMI2');
}

function setHDMI3Input() {
  keypressAction('InputHDMI3');
}

function setHomeInput() {
  keypressAction('Home');
}

// This does not work with 100% accuracy.  There is a time between commands that the
// TVs apparently need (no queing?), but it does help in quickly incrasing or decreasing
// the volume.
function volLoop(reqAction) {
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
      keypressAction(reqAction);
    }, 400);
  }
}

function volUp() {
  volLoop('VolumeUp');
}

function volDown() {
  volLoop('VolumeDown');
}

function volMute() {
  keypressAction('VolumeMute');
}

function keyActionBack() {
  keypressAction('Back');
}

function keyActionUp() {
  keypressAction('Up');
}

function keyActionDown() {
  keypressAction('Down');
}

function keyActionLeft() {
  keypressAction('Left');
}

function keyActionRight() {
  keypressAction('Right');
}

function keyActionSelect() {
  keypressAction('Select');
}

function keyActionRepeat() {
  keypressAction('Repeat');
}

function keyActionInfo() {
  keypressAction('Info');
}

function keyActionReverse() {
  keypressAction('Rev');
}

function keyActionPlay() {
  keypressAction('Play');
}

function keyActionForward() {
  keypressAction('Fwd');
}

function openChannel(channel) {
  launchAction(channelEnum[channel].ChannelID);
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
      keyActionkSelect();
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
