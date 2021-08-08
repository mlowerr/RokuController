# RokuController

This project started out as a "quick and dirty" controller in an attempt to avoid purchasing a "smart remote" or otherwise solving for the challenge of being able to change the inputs, channel, volume, etc. for a collection of multiple television sets that all respond to the same remote.

The project is inspired by the [Roku Remote Tool](http://devtools.web.roku.com/RokuRemote/) application which supported most of the remote control functionality but required more back and fourth between modals than I wanted.

Everything is known to work in this project except for the following:

- For my setup, the 'power on' functionality only works if the TV's were last powered off in the last 30 to 60 minutes. I believe my TV's go into a deep sleep and stop responding to the API when this happens.
- Volume adjustment by increment is not exact. The TV's to not appear to store a queue of incoming requests and the lag time needed between commands appears to be variable. Currently set to include a delay between commands that seems to work best for my setup. Still helpful in more quickly increasing or decreasing volume.
