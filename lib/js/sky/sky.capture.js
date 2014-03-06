var sky = sky || {};

sky.capture = (function (window,document) {
  var _skyCapture;
  
  var _cacheElements = function() {
    _skyCapture = document.querySelector('#skyCapture');
  };

  var _initUserMedia = function() {
    var userMediaOptions = {
      video: true,
      audio: false
    };

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getUserMedia(userMediaOptions, _onUserMediaSuccess, _onUserMediaError);
  }

  var _onUserMediaSuccess = function(stream) {
    skyCapture.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    skyCapture.play();
  };

  var _onUserMediaError = function(error) {
    console.log(error);
  };

  var self = {
    init: function() {
      _cacheElements();
      _initUserMedia();
    }
  };

  return self;
})(this, this.document);