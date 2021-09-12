/* eslint-disable no-unused-vars */

const channelEnum = {
  /* eslint-disable prettier/prettier */
   
    ABC:              { ChannelID: 73376,  DisplayName: 'ABC',                Selected: false },
    AmazonPrimeVideo: { ChannelID: 13,     DisplayName: 'Amazon Prime Video', Selected: false },
    CBS:              { ChannelID: 619667, DisplayName: 'CBS'                 Selected: false },
    CBSSports:        { ChannelID: 17112,  DisplayName: 'CBS Sports',         Selected: false },
    CNBC:             { ChannelID: 9160,   DisplayName: 'CNBC',               Selected: false },
    ESPN:             { ChannelID: 34376,  DisplayName: 'ESPN',               Selected: false },
    FOXBusiness:      { ChannelID: 18746,  DisplayName: 'FOX Business',       Selected: false },
    FOXNews:          { ChannelID: 2946,   DisplayName: 'FOX News',           Selected: false },
    FOXNow:           { ChannelID: 20454,  DisplayName: 'FOX Now',            Selected: false },
    FOXSports:        { ChannelID: 95307,  DisplayName: 'FOX Sports',         Selected: false },
    NBA:              { ChannelID: 73249,  DisplayName: 'NBA',                Selected: false },
    NBC:              { ChannelID: 68669,  DisplayName: 'NBC',                Selected: false },
    NBCPeacock:       { ChannelID: 593099, DisplayName: 'NBC Peacock',        Selected: false },
    NBCSports:        { ChannelID: 53725,  DisplayName: 'NBC Sports',         Selected: false },
    NFL:              { ChannelID: 44856,  DisplayName: 'NFL',                Selected: false },
    Netflix:          { ChannelID: 12,     DisplayName: 'NetFlix',            Selected: false },
    Newsmax:          { ChannelID: 24699,  DisplayName: 'Newsmax',            Selected: false },
    RSBN:             { ChannelID: 620928, DisplayName: 'RSBN',               Selected: false },
    Tasytrade:        { ChannelID: 11974,  DisplayName: 'Tastytrade',         Selected: false },
    YouTubeTV:        { ChannelID: 195316, DisplayName: 'YouTube TV',         Selected: true  },
   
    /* eslint-enable prettier/prettier */
};

// Dynamically build list of Roku chanels that can be launched
function insertListOfRokuChannels() {
  const channelSelectionElement = document.querySelector(
    'select[name="channel"]'
  );

  for (const [key, value] of Object.entries(channelEnum)) {
    // Create the option element
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', key);
    optionElement.setAttribute('selected', value.Selected);
    optionElement.innerText = value.DisplayName;

    // Add the option to the select element
    channelSelectionElement.insertAdjacentElement('beforeend', optionElement);
  }
}
