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

tvToggleBtn = document.querySelector('#tvToggleBtn');
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

powerOnBtn.onclick = powerOn;

function powerOn() {
  keyAction('PowerOn');
}

powerOffBtn.onclick = powerOff;

function powerOff() {
  keyAction('PowerOff');
}

hdmi1Btn.onclick = setHDMI1Input;

function setHDMI1Input() {
  keyAction('InputHDMI1');
}

homeBtn.onclick = setHomeInput;

function setHomeInput() {
  keyAction('Home');
}
volumeUpBtn.onclick = volUp;

function volUp() {
  volLoop('VolumeUp');
}

volumeDownBtn.onclick = volDown;

function volDown() {
  volLoop('VolumeDown');
}

// This does not work with 100% accuracy.  There is a time between commands that the
// TVs apparently need (no queing?), but it does help in quickly incrasing or decreasing
// the volume.
function volLoop(reqAction) {
  increment = document.querySelector('input[name="volIncrement"]').value;
  for (x = 0; x < increment; x++) {
    setTimeout(() => {
      keyAction(reqAction);
    }, 500);
  }
}

volumeMuteBtn.onclick = volMute;

function volMute() {
  keyAction('VolumeMute');
}

backBtn.onclick = keyActionBack;

function keyActionBack() {
  keyAction('Back');
}

upBtn.onclick = keyActionUp;

function keyActionUp() {
  keyAction('Up');
}

downBtn.onclick = keyActionDown;

function keyActionDown() {
  keyAction('Down');
}

leftBtn.onclick = keyActionLeft;

function keyActionLeft() {
  keyAction('Left');
}

rightBtn.onclick = keyActionRight;

function keyActionRight() {
  keyAction('Right');
}

selectBtn.onclick = keyActionSelect;

function keyActionSelect() {
  keyAction('Select');
}

repeatBtn.onclick = keyActionRepeat;

function keyActionRepeat() {
  keyAction('Repeat');
}

infoBtn.onclick = keyActionInfo;

function keyActionInfo() {
  keyAction('Info');
}

revBtn.onclick = keyActionReverse;

function keyActionReverse() {
  keyAction('Rev');
}

playBtn.onclick = keyActionPlay;

function keyActionPlay() {
  keyAction('Play');
}

fwdBtn.onclick = keyActionForward;

function keyActionForward() {
  keyAction('Fwd');
}

// Keyboard shortcuts
addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowDown':
      keyActionDown();
      break;
    case 'ArrowUp':
      keyActionUp();
      break;
    case 'ArrowLeft':
      keyActionLeft();
      break;
    case 'ArrowRight':
      keyActionRight();
      break;
    case 'Enter':
      keyActionSelect();
      break;
    case 'KeyM':
      volMute();
      break;
    case 'KeyJ':
      volUp();
      break;
    case 'KeyK':
      volDown();
      break;
    case 'KeyH':
      setHomeInput();
      break;
    case 'KeyC':
      setHDMI1Input();
      break;
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
      const idx = event.code.substr(5) - 1;
      cbs[idx].click();
      break;
    default:
      break;
  }
});
