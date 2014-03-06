var sky = sky || {};

sky.main = (function (window,document) {
  var _bindEventListeners = function() {
    sky.capture.skyCapture.addEventListener('click', function() {
      sky.canvas.drawImage(this, sky.capture.width, sky.capture.height);
      sky.canvas.show();
      sky.capture.hide();
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