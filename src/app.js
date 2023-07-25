const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const currentWeather = require("./utils/getCurrentWeather");

const app = express();
const port = process.env.PORT || 8000;

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//hbs config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("weather", {
    title: "Weather",
    helpText: "Created by Sakindu"
  });
});

app.get("/about", (req, res) => {
  res.render("index", { title: "About us", helpText: "Created by Sakindu"});
});

app.get("/help", (req, res) => {
  res.render("index", { title: "Need help?", helpText: "Created by Sakindu"});
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }

  geocode(req.query.address, (err, { message, features }) => {
    if (err || message || features.length === 0) {
      res.send({ error: "Please provide a valid address" });
    } else {
      currentWeather(
        features[0].center[1] + "," + features[0].center[0],
        (error, { error: errorr, current }, unit) => {
          if (error || errorr) {
            res.send({ error: "Error in getting current weather" });
          } else {
            let units;
            switch (unit) {
              case "f":
                units = "Fahrenheit";
                break;
              case "s":
                units = "Kelvin";
                break;
              default:
                units = "Celsius";
            }
            res.send({
              place: features[0].place_name,
              current_temperature: current.temperature,
              feelslike: current.feelslike,
              weather: `${current.weather_descriptions} in ${features[0].place_name}. It is currently ${current.temperature} degrees ${units} out. It feels like ${current.feelslike} degrees ${units}.`,
            });
          }
        },
        req.query.unit
      );
    }
  });
});

app.get("*", (req, res) => {
  res.render("index", {
    title: "404 - Not Found!",
    helpText: "Try out the above links 👆🏻",
  });
});

app.listen(port, () => {
  console.log(`Server listening at port: %s`, port);
});
