var sky = sky || {};

sky.main = (function (window,document) {
  var _bindEventListeners = function() {
    sky.capture.skyCapture.addEventListener('click', function() {
      sky.canvas.drawImage(this, sky.capture.width, sky.capture.height);
      sky.canvas.show();
      sky.capture.hide();
    });

    sky.canvas.canvas.addEventListener('click', function(e) {
      var rgba = sky.canvas.ctx.getImageData(e.clientX, e.clientY, 1, 1).data;
      console.log(sky.utils.rgbToHex(rgba[0], rgba[1], rgba[2]));
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