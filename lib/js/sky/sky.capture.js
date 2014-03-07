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

    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    
    var userMediaOptions = {
      video: true,
      audio: false
    };

    if(MediaStreamTrack.getSources) {
      //the front camera is default on chrome android so we select the rear camera
      MediaStreamTrack.getSources(function(sources) {
        var id;

        for (var i = 0; i < sources.length; i++) {
          var source = sources[i];
          if(source.kind == 'video') id=source.id;
        };

        userMediaOptions.video = {
          optional: [{sourceId: id}]
        };

        navigator.getUserMedia(userMediaOptions, _onUserMediaSuccess, _onUserMediaError);
      });

      success = true;
    } else if(navigator.getUserMedia) {
      //ff android defaults to rear camera
      navigator.getUserMedia(userMediaOptions, _onUserMediaSuccess, _onUserMediaError);
      success = true;
    }

    return success;
  };

  var _onUserMediaSuccess = function(stream) {
    _stream = stream;

    _skyCapture.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    
    //ff likes this
    _skyCapture.play();

    //chrome likes this
    _skyCapture.addEventListener('loadedmetadata', function() {
     _skyCapture.play();
    });

    _skyCapture.addEventListener('click', function() {
      var width = sky.capture.width;
      var height = sky.capture.height;

      sky.canvas.setCanvasSize(width, height);
      sky.canvas.drawImage(this, width, height);
      sky.canvas.show();

      self.hide();
      self.close();
    });
  };

  var _onUserMediaError = function(error) {
    console.log(error);
  };

  var _initFileUploadFallback = function() {
    // based on https://stackoverflow.com/questions/13938686/can-i-load-a-local-file-into-an-html-canvas-element

    _skyFileInput.className = '';
    _skyCapture.className = 'hidden';
    
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

  var self = {
    init: function() {
      _cacheElements();

      if(!_initUserMedia()) {
        _initFileUploadFallback();
      }
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