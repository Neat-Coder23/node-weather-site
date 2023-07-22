const req = require("postman-request");

const currentWeather = (query, callback, units="m") => {
  req(
    {
      url: `http://api.weatherstack.com/current?access_key=e685ad53c57f86ee3e69796ebf80be3b&query=${query}&units=${units}`,
      json: true,
    },
    (err, res, body) => {
      callback(err,body,units)
    }
  );
};

module.exports = currentWeather