var sky = sky || {};

sky.main = (function (window,document) {
  var self = {
    init: function() {
      sky.capture.init();
      sky.canvas.init();
    }
  };

  return self;
})(this, this.document);