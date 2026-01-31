# AGENTS.md

## Project overview
- This repo is a simple, static HTML/JavaScript Roku wall controller that sends Roku External Control API requests to multiple TVs on the local network.
- The primary UI entry point is `src/RokuController.html`, which loads jQuery via CDN and the local scripts in `src/`.
- Core controller logic lives in `src/RokuController.js`, which sends `POST` requests to Roku devices using the `/keypress/` and `/launch/` endpoints.

## Key files and configuration
- `src/RokuController.html`: HTML UI and script includes.
- `src/RokuController.js`: Command handling, keyboard shortcuts, and request helpers.
- `src/config/TVListing.js`: `tvEnum` map of TV names to IP/port (Roku ECP default port is 8060); also builds the TV checkbox UI.
- `src/config/RokuChannelList.js`: `channelEnum` entries used to populate the channel selector.
- `Reference/KeyboardShortcuts.md`: Quick reference for keyboard mappings.

## How to run
- Open `src/RokuController.html` in a browser (file:// or served via any static file server).
- Ensure the Roku devices are reachable on the network and the IPs in `src/config/TVListing.js` are current.

## Tooling
- Linting is available via `npm run lint` (ESLint + Wes Bos config + Prettier).
- There are no automated tests configured (`npm test` exits with a message).

## Agent workflow requirements
- After completing each work request, update **this** `AGENTS.md` with any newly learned project context.
- Every time you run, review and update `README.md` as needed to keep project documentation current.
