# RokuController

RokuController is a lightweight, static HTML/JavaScript controller intended to manage multiple Roku TVs on the same network. It was built as a “quick and dirty” alternative to a smart remote for changing inputs, channels, volume, and navigation across a wall of TVs.

The project is inspired by the [Roku Remote Tool](http://devtools.web.roku.com/RokuRemote/) application, but is optimized to reduce modal navigation and make multi-TV control easier.

## How it works
- The UI is served from `src/RokuController.html`, which loads jQuery and the local controller/config scripts.
- Roku commands are sent via the Roku External Control API (`/keypress/` and `/launch/` endpoints) using `POST` requests from `src/RokuController.js`.
- TV discovery is manual: you configure device IPs in `src/config/TVListing.js`, and channels in `src/config/RokuChannelList.js`.

## Getting started
1. Update `src/config/TVListing.js` with the correct IP addresses for each Roku device (default Roku ECP port is `8060`).
2. Update `src/config/RokuChannelList.js` if you want to add/remove channels shown in the dropdown.
3. Open `src/RokuController.html` in a browser (file:// or any static file server).

## Project layout
- `src/RokuController.html`: main UI.
- `src/RokuController.js`: request helpers, command handlers, keyboard shortcuts.
- `src/config/TVListing.js`: Roku device list + checkbox rendering.
- `src/config/RokuChannelList.js`: channel metadata for launch actions.
- `Reference/KeyboardShortcuts.md`: keyboard shortcuts reference.

## Tooling
- Lint: `npm run lint` (ESLint + Wes Bos config + Prettier).
- Tests: none configured (`npm test` exits with a message).

## Known limitations
- Power on works only if TVs were powered off recently; some devices appear to enter deep sleep and stop responding to the API.
- Volume increments are not exact due to device latency and lack of request queueing; a small delay is used between commands to mitigate this.
