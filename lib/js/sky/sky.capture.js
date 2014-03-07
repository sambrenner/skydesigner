var sky = sky || {};

sky.capture = (function (window,document) {
  var _skyCapture, _stream;
  var _skyFileInput, _fileReader, _fileImage;
  
  var _cacheElements = function() {
    _skyCapture = document.querySelector('#skyCapture');
    _skyFileInput = document.querySelector('#skyFileInput');
  };

  var _initUserMedia = function() {
    var success = false;

    var userMediaOptions = {
      video: true,
      audio: false
    };

    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    
    if(navigator.getUserMedia) {
      navigator.getUserMedia(userMediaOptions, _onUserMediaSuccess, _onUserMediaError);
      success = true;
    }

    return success;
  };

  var _initFileUploadFallback = function() {
    _skyFileInput.className = '';
    
    _skyFileInput.addEventListener('change', function(e) {
      _skyFileInput.className = 'hidden';
      
      var file = e.target.files[0];
      
      _fileReader = new FileReader();
      _fileReader.addEventListener('load', _onFileLoad);
      _fileReader.readAsDataURL(file);
    });
  };

  var _onFileLoad = function() {
    _fileImage = new Image();
    _fileImage.addEventListener('load', _onImageLoad);
    _fileImage.src = _fileReader.result;
  };

  var _onImageLoad = function() {
    var width = _fileImage.width;
    var height = _fileImage.height;

    sky.canvas.setCanvasSize(width, height);
    sky.canvas.drawImage(_fileImage, width, height);
    sky.canvas.show();
  };

  var _onUserMediaSuccess = function(stream) {
    _stream = stream;

    skyCapture.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    skyCapture.play();
  };

  var _onUserMediaError = function(error) {
    console.log(error);
  };

  var self = {
    init: function() {
      _cacheElements();

      //if(!_initUserMedia()) {
        _initFileUploadFallback();
      //}
    },

    hide: function() {
      _skyCapture.className = 'hidden';
    },

    close: function() {
      _stream.stop();
    },

    get skyCapture() {
      return _skyCapture;
    },

    get width() {
      return _skyCapture.offsetWidth;
    },

    get height() {
      return _skyCapture.offsetHeight;
    }
  };

  return self;
})(this, this.document);