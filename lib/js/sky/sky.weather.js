var sky = sky || {};

sky.weather = (function (window,document) {
  var _lat, _lon;
  var _sky, _temp, _loc;

  var _getLocation = function(callback) {
    navigator.geolocation.getCurrentPosition(function(location) {
      _lat = location.coords.latitude;
      _lon = location.coords.longitude;

      callback();
    });
  };

  var _getWeather = function() {
    //http://api.openweathermap.org/data/2.5/weather?lat=40.729&lon=-73.99
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + _lat + '&lon=' + _lon,
      success: function(data) {
        _loc = data.name;
        _sky = sky.utils.toTitleCase(data.weather[0].description);
        _temp = Math.round((9/5) * (data.main.temp - 273) + 32);
      }
    })
  };

  var self = {
    init: function() {
      _getLocation(_getWeather);
    },

    get sky() {
      return _sky;
    },

    get temperature() {
      return _temp;
    },

    get location() {
      return _loc;
    }
  };

  return self;
})(this, this.document);