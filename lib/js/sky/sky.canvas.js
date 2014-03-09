var sky = sky || {};

sky.canvas = (function (window,document) {
  var _canvas, _ctx, _width, _height;

  var _cacheElements = function() {
    _canvas = document.querySelector('#skyCanvas');
    _ctx = _canvas.getContext('2d');
  };

  var _keyOut = function(r, g, b, tolerance) {
    var imageData = _ctx.getImageData(0, 0, _canvas.width, _canvas.height);
    var pixels = imageData.data;

    // based on http://www.hmp.is.it/creating-chroma-key-effect-html5-canvas/
    for(var i = 0, n = pixels.length; i < n; i += 4) {
      var diff = Math.abs(pixels[i] - r) + Math.abs(pixels[i+1] - g) + Math.abs(pixels[i+2] - b);
      if(diff < tolerance) {
        pixels[i + 3] = 0;
      }
    }

    _ctx.putImageData(imageData, 0, 0);

    sky.ui.hideLoadIcon();
  };

  var self = {
    init: function() {
      _cacheElements();

      _canvas.addEventListener('click', function(e) {
        var rgba = sky.canvas.getColorAt(e.clientX, e.clientY);

        sky.ui.showLoadIcon();

        $.ajax({
          url: 'getImageFromColor.php?color=' + sky.utils.rgbToHex(rgba[0], rgba[1], rgba[2]),
          success: function(data) {
            $('body').prepend('<img src="' + data.url + '" />');
            _keyOut(rgba[0], rgba[1], rgba[2], 100);

            sky.ui.titleArtwork(sky.weather.temperature, sky.weather.sky, sky.weather.location, data.credits);
          }
        });
      });
    },

    setCanvasSize: function(width, height) {
      _canvas.width = width;
      _canvas.height = height;
    },

    drawImage: function(img, width, height) {
      _ctx.drawImage(img, 0, 0, width, height);
    },

    drawFile: function(file, maxWidth) {
      EXIF.getData(file, function() {
        var mpImg = new MegaPixImage(file);
        mpImg.render(_canvas, { maxWidth: maxWidth, orientation: EXIF.getTag(this, "Orientation") });
      });
    },

    show: function() {
      _canvas.className = "";
    },

    getColorAt: function(x, y) {
      return _ctx.getImageData(x, y, 1, 1).data;
    },

    get canvas() {
      return _canvas;
    }
  };

  return self;
})(this, this.document);