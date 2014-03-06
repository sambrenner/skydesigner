var sky = sky || {};

sky.main = (function (window,document) {
  var _bindEventListeners = function() {
    sky.capture.skyCapture.addEventListener('click', function() {
      var width = sky.capture.width;
      var height = sky.capture.height;

      sky.canvas.setCanvasSize(width, height);
      sky.canvas.drawImage(this, width, height);
      sky.canvas.show();

      sky.capture.hide();
      sky.capture.close();
    });

    sky.canvas.canvas.addEventListener('click', function(e) {
      var rgba = sky.canvas.getColorAt(e.clientX, e.clientY);

      $.ajax({
        url: 'getImageFromColor.php?color=' + sky.utils.rgbToHex(rgba[0], rgba[1], rgba[2]),
        success: function(data) {
          $('body').prepend('<img src="' + data.url + '" />');
          sky.canvas.keyOut(rgba[0], rgba[1], rgba[2], 100);
        }
      });
    });
  };

  var self = {
    init: function() {
      sky.capture.init();
      sky.canvas.init();

      _bindEventListeners();
    }
  };

  return self;
})(this, this.document);