const express = require("express");
const fetch = require("node-fetch");
const helmet = require("helmet");
const app = express();
const path = require("path");

app.use(helmet.frameguard());

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get method for itunes-search
app.get("/music/:query/:type", async (req, res) => {
    const query = req.params.query;
    const media = req.params.type;

    const api_url = `https://itunes.apple.com/search?term=${query}&media=${media}`;

    console.log(api_url)
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
})

//Report errors
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Something broke!");
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,
            'frontend/build', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});