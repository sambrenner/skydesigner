var sky = sky || {};

sky.main = (function (window,document) {
  var self = {
    init: function() {
      sky.ui.init();
      sky.weather.init();
      sky.capture.init();
      sky.canvas.init();
    }
  };

  return self;
})(this, this.document);