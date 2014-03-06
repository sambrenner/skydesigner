var sky = sky || {};

sky.utils = (function (window,document) {
  var self = {
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb  
    rgbToHex: function(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
  };

  return self;
})(this, this.document);