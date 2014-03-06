var sky = sky || {};

sky.canvas = (function (window,document) {
  var _canvas, _ctx;

  var _cacheElements = function() {
    _canvas = document.querySelector('#skyCanvas');
    _ctx = _canvas.getContext('2d');
  }

  var self = {
    init: function() {
      _cacheElements();
    },

    drawImage: function(img, width, height) {
      _canvas.width = width;
      _canvas.height = height;

      _ctx.drawImage(img, 0, 0, width, height);
    },

    show: function() {
      _canvas.className = "";
    }
  };

  return self;
})(this, this.document);