const getHtml = require('./Getter');

const cheerio = require('cheerio');

const getPrice = (link) => {
    getHtml(link).then((html) => {
        console.log(cheerio.load(html)('.product-details__price--value', '.price-sale').text().slice(1))
    })
}

getPrice("https://www.mrporter.com/en-ru/mens/product/moncler/slim-fit-striped-quilted-glossed-nylon-hooded-down-jacket/1147557?ppv=2");

getPrice("https://www.mrporter.com/en-ru/mens/product/lanvin/cap-toe-suede-and-patent-leather-sneakers/679199")