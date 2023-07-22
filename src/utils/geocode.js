const req = require("postman-request");

const geocode = (address, callback) => {
  req(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVoaXBpdGl5YSIsImEiOiJjanUyNWpvcDgwOHh6NDlsazQxaXFmbXFjIn0.yeT2XmeRKTTk0B6tnTzLQA&limit=1`,
      json: true,
    },
    (err, res, body) => {
      callback(err, body);
    }
  );
};

module.exports = geocode
