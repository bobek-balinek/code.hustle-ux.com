title: Multiple Video.js clips
date: Jun 15 2013
---

Back 10 weeks ago when I started working on [Adobe Reel Cut](http://hustle-ux.com/project/5/adobe-reel-cut) - a phonegap video editor,
I faced a problem of having to play multiple clips one after another, I coudln't find any decent plugins/wrappers for the broweser to manage it, so I decided to write my own using Video.js for managing the html5 video playback and underscore to add list management.

Grab the source from [GitHub](https://github.com/bobek-balinek/videojs-clips)

Example usage:

```js
var VideoLib = new videoPlayer( _V_('video-container'), [
        {src: 'http://localhost:3501/videos/DSC_0151_1.mp4', length: 6},
        {src: 'http://localhost:3501/videos/DSC_0152_1.mp4', length: 5}
    ]);

VideoLib.play();
```

What the plugin simply does it keeps track of when to switch the 'src' attribute on the VideoJS instance and it gives methods to manage,add,remove clips form the array, which automatically refreshes the playback.