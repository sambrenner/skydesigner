var sky = sky || {};

sky.capture = (function (window,document) {
  var _skyCapture, _stream;
  var _skyFileInput, _skyFileButton, _fileReader, _fileImage;
  
  var _cacheElements = function() {
    _skyCapture = document.querySelector('#skyCapture');
    _skyFileInput = document.querySelector('#skyFileInput');
    _skyFileButton = document.querySelector('#skyFileButton');
  };

  var _initUserMedia = function() {
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
    } else if(navigator.getUserMedia) {
      //ff android defaults to rear camera
      navigator.getUserMedia(userMediaOptions, _onUserMediaSuccess, _onUserMediaError);
    }
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

    sky.ui.showWebcamInstructions();

    _skyCapture.addEventListener('click', function() {
      var width = sky.capture.width;
      var height = sky.capture.height;

      sky.canvas.setCanvasSize(window.innerWidth, window.innerHeight);
      sky.canvas.drawImage(this, width, height);
      sky.canvas.show();

      self.hide();
      self.close();

      sky.ui.showColorSwapInstructions();
    });
  };

  var _onUserMediaError = function(error) {
    console.log(error);
  };

  var _initFileUploadFallback = function() {
    _skyFileInput.className = '';
    _skyCapture.className = 'hidden';

    _skyFileButton.addEventListener('click', function() {
      _skyFileInput.click();
    });
    
    _skyFileInput.addEventListener('change', function(e) {
      var width = window.innerWidth;
      var height = window.innerHeight;

      _skyFileButton.className = 'hidden';

      sky.canvas.setCanvasSize(width, height);
      sky.canvas.drawFile(e.target.files[0], width, height);
      sky.canvas.show();

      sky.ui.showColorSwapInstructions();
    });
  };

  var self = {
    init: function() {
      _cacheElements();

      if(/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        //ios
        sky.ui.setIntroCapabilities('upload');
        _initFileUploadFallback();
      } else {
        //not
        _initUserMedia();
        sky.ui.setIntroCapabilities('webcam');  
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