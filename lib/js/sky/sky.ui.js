var sky = sky || {};

sky.ui = (function (window,document) {
  var $instructions;

  var _cacheElements = function() {
    $instructions = $('#instructions');
  };

  var self = {
    init: function() {
      _cacheElements();
    },

    setIntroCapabilities: function(capability) {
      switch(capability) {
        case 'webcam':
          $instructions.append(' Enable webcam access and we can begin.');
          break;
        case 'upload':
          $instructions.append(' Use your camera to take a picture of the sky.');
          break;
        case 'none':
        default:
          $instructions.append(" I'm sorry, you need a modern browser to enjoy SkyDesigner!");
      }
    },

    showWebcamInstructions: function() {
      $instructions.text('Point your phone at the sky and tap your screen to take a picture.');
    },

    showColorSwapInstructions: function() {
      $instructions.text("Now tap the sky and we'll design it for you!");
    },

    showLoadIcon: function() {
      // replace with icon
      $instructions.text('Loading...');
    },

    hideLoadIcon: function() {
      $instructions.text('');
    },

    titleArtwork: function(temp, skyCondition, artist) {
      $instructions.text(temp + ' and ' + skyCondition + ', by ' + artist + ' and you!');
    }
  };

  return self;
})(this, this.document);