const scraper = {
    url: "https://tinyurl.com/2p8uz7ky",
    async scraper(browser) {
        let page = await browser.newPage();

        await page.goto(this.url);

        await page.waitForSelector("#main");

        console.log("Page is loaded");

        let results = [];

        do {

            let newResults = await this.parseNewsHeadings(page);

            results = [...results, ...newResults];

            const nextPageBtn = await page.$("#pnnext");

            if(nextPageBtn) {
                await nextPageBtn.click();
                await page.waitForSelector("#search");   

            } else {

                break;
            }

        } while (await page.$("#pnnext") && results.length < 50 );

        console.log(results);
        
        return results;
    },
    async parseNewsHeadings(page) {

        const results = await page.$$("#search");
        const newsHeadings = [];

        for(let i = 0; i < results.length; i++) {
            const heading = await results[i].$eval(
                "div[role='heading']",
                (el) => el.innerText
            );

            newsHeadings.push(heading);
        }

        return newsHeadings;
    } 
}

module.exports = scraper;