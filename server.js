const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.post("/", (req, res) => {
    const apikey = "e09f99164e040f21c6e628fb85b0d7b3";
    const city = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const wheaterData = JSON.parse(data);
            const temp = wheaterData.main.temp;
            const icon = wheaterData.weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(`<h1>The Temprature of ${city} is : ${temp} Celcias </h1>`);
            res.write(`<img src="${imgurl}" />`);
            res.send();
        });
    });
})

app.listen(3000, function () {
    console.log("Server : Port 3000");
})