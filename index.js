const browserObject = require("./browser");
const scraperController = require("./pageController");

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller


const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORTv || 5500;

app.use(cors());

app.get("/api/text", async (req, res) => {
    try {
        const results = scraperController(browserInstance);

        results.then((data) => {
            return res.status(200).json({
                stringsArray: data
            })
        })

    } catch(err) {
        return res.status(500).json({
            err: err.toString(),
        })
    }
})

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})