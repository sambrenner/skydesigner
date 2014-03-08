var sky = sky || {};

sky.utils = (function (window,document) {
  var self = {
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb  
    rgbToHex: function(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    // http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
    toTitleCase: function(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
  };

  return self;
})(this, this.document);