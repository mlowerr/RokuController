/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Roku remote reference: https://developer.roku.com/docs/developer-program/debugging/external-control-api.md
// Roku dev tool that inspired this: http://devtools.web.roku.com/RokuRemote/

const tvEnum = {
  tv1: 'http://192.168.86.40:8060',
  tv2: 'http://192.168.86.43:8060',
  tv3: 'http://192.168.86.41:8060',
  tv4: 'http://192.168.86.29:8060',
  tv5: 'http://192.168.86.42:8060',
};

const apiPathEnum = {
  KEYPRESS_API_PATH: '/keypress/',
  LAUCNH_API_PATH: '/launch/',
};

const channelEnum = {
  YouTubeTV: 195316,
};

// Dynamically build checkboxes for TV's to be controlled.
function insertListOfTVs() {
  const tvListDiv = document.querySelector('div[id="tvSelectionDiv"]');

  labelIncrement = 1;
  for (const [key, value] of Object.entries(tvEnum)) {
    // Create the label element
    entryLabel = document.createElement('label');
    entryLabel.setAttribute('for', key);

    // crate the input entry element
    entryInput = document.createElement('input');
    entryInput.type = 'checkbox';
    entryInput.name = 'tv';
    entryInput.value = key;
    entryInput.id = key;

    // Add the input entry element to the label element
    entryLabel.append(entryInput);
    // Append label text
    entryLabel.innerHTML = entryLabel.innerHTML.concat(`TV ${labelIncrement} `);

    // Add the label to the div
    tvListDiv.insertAdjacentElement('beforeend', entryLabel);
    labelIncrement += 1;
  }
  updateTvCheckBoxes();
}

// List of TV's in scope for operation

let tvCheckBoxes = document.querySelectorAll('input[name="tv"]');
function updateTvCheckBoxes() {
  tvCheckBoxes = document.querySelectorAll('input[name="tv"]');
}

// Functions associated with determining which TV's are in scope for operations

// This is needed in the javascript file to allow checkAll() and uncheckAll()'s this.onclick to work.
tvToggleBtn.onclick = checkAll;

function check(checked = true) {
  tvCheckBoxes.forEach((cb) => {
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
  tvCheckBoxes.forEach((cb) => {
    cb.checked = !cb.checked;
  });
}

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

function setHDMI1Input() {
  keyAction(apiPathEnum.KEYPRESS_API_PATH, 'InputHDMI1');
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
  // keyAction(LAUCNH_API_PATH, channelEnum.YouTubeTV);
  keyAction(apiPathEnum.LAUCNH_API_PATH, channel);
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
      tvCheckBoxes[idx].click();
      break;
    }
    case 'KeyY': {
      openChannel(channelEnum.YouTubeTV);
      break;
    }
    default: {
      break;
    }
  }
});
