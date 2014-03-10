SkyDesigner
=======

A mobile-webapp to replace the color of the sky (or anything, really) with a similarly-colored object from the [Cooper-Hewitt Museum's collection](https://collection.cooperhewitt.org/).

It is built with HTML, CSS, JavaScript and PHP (to handle API communication).

Tested on iOS 6+ (Safari and Chrome) and Android 4.2 (Firefox and Chrome). 

[Take it for a spin!](http://www.samjbrenner.com/projects/sky)

How it Works
-------

1. The user allows location access. The weather for the current location is retrieved using [OpenWeatherMap](http://openweathermap.org/) and stored in memory.
2. The user takes a picture -
    1. Android users will enable access to either their front or rear camera and take a picture by tapping the screen. 
    2. iOS users will press a button to be taken to their camera app, where they will take a photo, confirm it, and return to the web app ([because iOS doesn't support getUserMedia](http://caniuse.com/stream)).
3. The user taps on the sky.
4. The hex code of the sky is [searched](https://collection.cooperhewitt.org/api/methods/cooperhewitt.search.objects) on the Cooper-Hewitt API and a matching image is selected at random. 
5. Pixels within a color-range of the one originally selected are made transparent, revealing the image from the Cooper-Hewitt collection below.
6. The weather information is used to title the finished piece - eg. "45 and Cloudy in New York, by the Cooper-Hewitt Collection and you!"

Screenshots
-------
![Washington Square Arch](http://www.samjbrenner.com/projects/sky/lib/img/01.jpg) 
![Bobst Library](http://www.samjbrenner.com/projects/sky/lib/img/02.jpg)
![Bobst Library Inverse](http://www.samjbrenner.com/projects/sky/lib/img/03.jpg)
![World Trade Center](http://www.samjbrenner.com/projects/sky/lib/img/04.jpg)
![Taxis on Broadway](http://www.samjbrenner.com/projects/sky/lib/img/05.jpg)
![Bleecker St. Sidewalk](http://www.samjbrenner.com/projects/sky/lib/img/06.jpg)

Issues
-------

* getImageFromColor.php can be slow
* Location name is based on weather stations, which is an issue in places where location names are granular (see screenshots).
* I'd love to get rid of the browser's address bar. That will require more tweaking since window.scrollTo(0,1) didn't work out of the box (probably CSS issue?)
* Needs some sort of sharing/save image functionality besides screenshots