var sky = sky || {};

sky.main = (function (window,document) {
  var self = {
    init: function() {
      sky.capture.init();
    }
  };

  return self;
})(this, this.document);