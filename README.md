# RokuController
Quick and dirty controller for multiple Roku TV based TV's.  Inspired by the Roku developer reference app which didn't quite do what I wanted it to do.  Hacked up in an afternoon and known to be working for my use cases.  

Everything is working except for 'power on' which has issues if the TV's have been off for some time (1 hr or so?).  I believe this is due to the TV's going into a deep sleep and no longer listening over HTTP?  In this case, the physical remote is needed to initially power on the TV's.  

Future potential improvements:
- Add support for the /launch (/Launch on my systems) API to direclty load channels.  Need to determine how to get each apps APP_ID.


- ~~Add support to change volume by an arbitrary # of levels~~ (Done)

Keyboard shortcuts supported:
============================================
Up/Down/Left/Right arrows for navigation

Enter for select

M to mute

J to incrase volume

K to decrease volume

H to switch input to home

C to switch input to HDMI 1 (Chromecast in my case)

1-5 to toggle TV as in scope for next operation
