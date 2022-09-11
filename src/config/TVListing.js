/* eslint-disable no-unused-vars */

const tvEnum = {
  tv1: 'http://192.168.86.40:8060',
  tv2: 'http://192.168.86.43:8060',
  tv3: 'http://192.168.86.41:8060',
  tv4: 'http://192.168.86.29:8060',
  tv5: 'http://192.168.86.42:8060',
  tv6: 'http://192.168.86.108:8060',
};

// List of TV's in scope for operation
let tvCheckBoxes = document.querySelectorAll('input[name="tv"]');

function updateTvCheckBoxes() {
  tvCheckBoxes = document.querySelectorAll('input[name="tv"]');
}

// Dynamically build checkboxes for TV's to be controlled.
function insertListOfTVs() {
  const tvListDiv = document.querySelector('div[id="tvSelectionDiv"]');

  let labelIncrement = 1;
  for (const [key, value] of Object.entries(tvEnum)) {
    // Create the label element
    const entryLabel = document.createElement('label');
    entryLabel.setAttribute('for', key);

    // crate the input entry element
    const entryInput = document.createElement('input');
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
